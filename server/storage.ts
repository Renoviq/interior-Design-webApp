import { User, InsertUserSchema, Renovation, InsertRenovation } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { connectToDatabase, getDb } from "./db";
import { ObjectId } from "mongodb";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUserSchema & { 
    isVerified: boolean;
    verificationCode: string | null;
    verificationExpiry: Date | null;
  }): Promise<User>;
  verifyUser(id: string): Promise<void>;
  getRenovationsByUserId(userId: number): Promise<Renovation[]>;
  createRenovation(renovation: InsertRenovation): Promise<Renovation>;
  deleteRenovation(id: number): Promise<void>;
  createContactFormEntry(data: { fullName: string; email: string; company: string; message: string; }): Promise<void>;
  sessionStore: session.Store;
}

export class MongoStorage implements IStorage {
  sessionStore: session.Store;
  private dbReady: Promise<void>;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.dbReady = connectToDatabase().then(() => {});
  }

  private async getUsersCollection() {
    await this.dbReady;
    return getDb().collection("users");
  }

  private async getRenovationsCollection() {
    await this.dbReady;
    return getDb().collection("renovations");
  }

  private async getContactFormCollection() {
    await this.dbReady;
    return getDb().collection("contactForm");
  }

  private mapUser(doc: any): User {
    return {
      id: doc._id.toHexString(),
      username: doc.username,
      password: doc.password,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      isVerified: doc.isVerified,
      verificationCode: doc.verificationCode,
      verificationExpiry: doc.verificationExpiry ? new Date(doc.verificationExpiry) : null,
    };
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.getUser(id);
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = await this.getUsersCollection();
    const doc = await users.findOne({ _id: new ObjectId(id) });
    if (!doc) return undefined;
    return this.mapUser(doc);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getUsersCollection();
    const doc = await users.findOne({ username });
    if (!doc) return undefined;
    return this.mapUser(doc);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.getUsersCollection();
    const doc = await users.findOne({ email });
    if (!doc) return undefined;
    return this.mapUser(doc);
  }

  async createUser(user: InsertUserSchema & {
    isVerified: boolean;
    verificationCode: string | null;
    verificationExpiry: Date | null;
  }): Promise<User> {
    const users = await this.getUsersCollection();
    const result = await users.insertOne(user);
    const insertedUser = await users.findOne({ _id: result.insertedId });
    if (!insertedUser) throw new Error("Failed to create user");
    return this.mapUser(insertedUser);
  }

  async verifyUser(id: string): Promise<void> {
    try {
      const users = await this.getUsersCollection();
      await users.updateOne(
        { _id: new ObjectId(id) },
        { $set: { isVerified: true, verificationCode: null, verificationExpiry: null } }
    );
    }
    catch (error) {
      console.error("Error verifying user:", error);
      console.log("Error Verifying");
      throw error;
    }
  }

  async getRenovationsByUserId(userId: number): Promise<Renovation[]> {
    const renovations = await this.getRenovationsCollection();
    const docs = await renovations.find({ userId }).toArray();
    return docs.map(doc => ({
      id: parseInt(doc._id.toHexString(), 10),
      userId: Number(doc.userId),
      originalImage: String(doc.originalImage || ""),
      generatedImage: String(doc.generatedImage || ""),
      roomType: String(doc.roomType || ""),
      description: doc.description || null,
      createdAt: doc.createdAt ? new Date(doc.createdAt) : null,
    }));
  }

  async createRenovation(renovation: InsertRenovation): Promise<Renovation> {
    const renovations = await this.getRenovationsCollection();
    const result = await renovations.insertOne({
      ...renovation,
      createdAt: new Date(),
    });
    const insertedRenovation = await renovations.findOne({ _id: result.insertedId });
    if (!insertedRenovation) throw new Error("Failed to create renovation");
    return {
      id: parseInt(insertedRenovation._id.toHexString(), 10),
      userId: insertedRenovation.userId,
      originalImage: String(insertedRenovation.originalImage || ""),
      generatedImage: String(insertedRenovation.generatedImage || ""),
      roomType: String(insertedRenovation.roomType || ""),
      description: insertedRenovation.description || null,
      createdAt: insertedRenovation.createdAt ? new Date(insertedRenovation.createdAt) : null,
    };
  }

  async deleteRenovation(id: number): Promise<void> {
    const renovations = await this.getRenovationsCollection();
    await renovations.deleteOne({ _id: new ObjectId(id) });
  }

  async createContactFormEntry(data: { fullName: string; email: string; company: string; message: string; }): Promise<void> {
    try {
      const contactForm = await this.getContactFormCollection();
      await contactForm.insertOne({
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        message: data.message,
        createdAt: new Date(),
      });
      console.log("Contact form entry saved to MongoDB");
    } catch (error) {
      console.error("Error saving contact form entry:", error);
      throw error;
    }
  }
}

export const storage = new MongoStorage();
