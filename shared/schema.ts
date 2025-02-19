import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const renovations = pgTable("renovations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  originalImage: text("original_image").notNull(),
  generatedImage: text("generated_image").notNull(),
  roomType: text("room_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRenovationSchema = createInsertSchema(renovations).pick({
  userId: true,
  originalImage: true,
  generatedImage: true,
  roomType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Renovation = typeof renovations.$inferSelect;
export type InsertRenovation = z.infer<typeof insertRenovationSchema>;
