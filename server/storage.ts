import { User, InsertUser, Renovation, InsertRenovation } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getRenovationsByUserId(userId: number): Promise<Renovation[]>;
  createRenovation(renovation: InsertRenovation): Promise<Renovation>;
  deleteRenovation(id: number): Promise<void>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private renovations: Map<number, Renovation>;
  private currentUserId: number;
  private currentRenovationId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.renovations = new Map();
    this.currentUserId = 1;
    this.currentRenovationId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRenovationsByUserId(userId: number): Promise<Renovation[]> {
    return Array.from(this.renovations.values()).filter(
      (renovation) => renovation.userId === userId
    );
  }

  async createRenovation(renovation: InsertRenovation): Promise<Renovation> {
    const id = this.currentRenovationId++;
    const newRenovation: Renovation = {
      ...renovation,
      id,
      createdAt: new Date(),
    };
    this.renovations.set(id, newRenovation);
    return newRenovation;
  }

  async deleteRenovation(id: number): Promise<void> {
    this.renovations.delete(id);
  }
}

export const storage = new MemStorage();
