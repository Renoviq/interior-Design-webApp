import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isVerified: boolean("is_verified").default(false),
  verificationCode: text("verification_code"),
  verificationExpiry: timestamp("verification_expiry"),
});

export const renovations = pgTable("renovations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  originalImage: text("original_image").notNull(),
  generatedImage: text("generated_image").notNull(),
  roomType: text("room_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const baseUserSchema = createInsertSchema(users)
  .pick({
    firstName: true,
    lastName: true,
    email: true,
    username: true,
    password: true,
});

export const insertUserSchema = baseUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const insertRenovationSchema = createInsertSchema(renovations).pick({
  userId: true,
  originalImage: true,
  generatedImage: true,
  roomType: true,
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Renovation = typeof renovations.$inferSelect;
export type InsertRenovation = z.infer<typeof insertRenovationSchema>;
export type VerifyOtp = z.infer<typeof verifyOtpSchema>;