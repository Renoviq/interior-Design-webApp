import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import multer from "multer";
import { insertRenovationSchema, insertUserSchema, verifyOtpSchema } from "@shared/schema";
import { z } from "zod";
// import bcrypt from "bcrypt"; // Commented out due to missing module, will handle password hashing differently
import { sendEmail } from "./email";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/renovations", async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      const renovations = await storage.getRenovationsByUserId(req.user.id);
      res.json(renovations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch renovations" });
    }
  });


  app.post("/api/renovations", upload.single("image"), async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        return res.status(400).send("Invalid file type. Only images are allowed.");
      }

      const mockGeneratedImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

      const validationResult = insertRenovationSchema.safeParse({
        userId: req.user.id,
        originalImage: mockGeneratedImage,
        generatedImage: mockGeneratedImage,
        roomType: req.body.roomType,
      });

      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.errors });
      }

      const renovation = await storage.createRenovation(validationResult.data);
      res.status(201).json(renovation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create renovation" });
    }
  });

  // Helper function to generate 6-digit OTP
  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  app.post("/api/register", async (req, res) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
      }
      const { firstName, lastName, email, username, password } = parseResult.data;

      // Check if user already exists by email or username
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP and expiry (10 minutes)
      const otp = generateOtp();
      const expiry = new Date(Date.now() + 10 * 60 * 1000);

      // Create unverified user with OTP
      const newUser = await storage.createUser({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        isVerified: false,
        verificationCode: otp,
        verificationExpiry: expiry,
      });

      // Send OTP email
      const subject = "Your OTP Verification Code";
      const text = `Your OTP code is ${otp}. It will expire in 10 minutes.`;
      await sendEmail(email, subject, text);

      res.status(201).json({ message: "Verification code sent to your email" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/verify-otp", async (req, res) => {
    try {
      const parseResult = verifyOtpSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
      }
      const { email, otp } = parseResult.data;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (user.isVerified) {
        return res.status(400).json({ error: "User already verified" });
      }
      if (user.verificationCode !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (!user.verificationExpiry || user.verificationExpiry < new Date()) {
        return res.status(400).json({ error: "OTP expired" });
      }

      await storage.verifyUser(user.id);

      // Return user info for login
      res.json(user);
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      // TODO: Implement session or token login here
      res.json(user);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.delete("/api/renovations/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);

      const renovationId = parseInt(req.params.id, 10);
      if (isNaN(renovationId)) {
        return res.status(400).send("Invalid renovation ID");
      }

      await storage.deleteRenovation(renovationId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete renovation" });
    }
  });

  // Helper function to generate 6-digit OTP
  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  app.post("/api/register", async (req, res) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
      }
      const { firstName, lastName, email, username, password } = parseResult.data;

      // Check if user already exists by email or username
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already registered" });
      }
      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP and expiry (10 minutes)
      const otp = generateOtp();
      const expiry = new Date(Date.now() + 10 * 60 * 1000);

      // Create unverified user with OTP
      const newUser = await storage.createUser({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        isVerified: false,
        verificationCode: otp,
        verificationExpiry: expiry,
      });

      // Send OTP email
      const subject = "Your OTP Verification Code";
      const text = `Your OTP code is ${otp}. It will expire in 10 minutes.`;
      await sendEmail(email, subject, text);

      res.status(201).json({ message: "Verification code sent to your email" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/verify-otp", async (req, res) => {
    try {
      const parseResult = verifyOtpSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors });
      }
      const { email, otp } = parseResult.data;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (user.isVerified) {
        return res.status(400).json({ error: "User already verified" });
      }
      if (user.verificationCode !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (!user.verificationExpiry || user.verificationExpiry < new Date()) {
        return res.status(400).json({ error: "OTP expired" });
      }

      await storage.verifyUser(user.id);

      // Return user info for login
      res.json(user);
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      // TODO: Implement session or token login here
      res.json(user);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
