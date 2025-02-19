import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import multer from "multer";
import { insertRenovationSchema } from "@shared/schema";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/renovations", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const renovations = await storage.getRenovationsByUserId(req.user.id);
    res.json(renovations);
  });

  app.post("/api/renovations", upload.single("image"), async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!req.file) return res.status(400).send("No image uploaded");

    // Mock AI processing - just return the same image
    const mockGeneratedImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    const renovation = await storage.createRenovation({
      userId: req.user.id,
      originalImage: mockGeneratedImage,
      generatedImage: mockGeneratedImage,
      roomType: req.body.roomType
    });

    res.status(201).json(renovation);
  });

  app.delete("/api/renovations/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    await storage.deleteRenovation(parseInt(req.params.id));
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
