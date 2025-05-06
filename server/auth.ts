import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { z } from "zod";



declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else if (!user.isVerified) {
        return done(null, false, { message: "Please verify your email first" });
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).send("Email already registered");
      }

      const otp = generateOTP();
      const verificationExpiry = new Date();
      verificationExpiry.setMinutes(verificationExpiry.getMinutes() + 10); // OTP valid for 10 minutes

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
        isVerified: false,
        verificationCode: otp,
        verificationExpiry,
      });

      // Send the OTP via email
      try {
        const { sendEmail } = await import("./email");
        
        // Email subject
        const subject = "Your RenoviqAI Verification Code";
        
        // Plain text version
        const textContent = `
      Hello from RenoviqAI!
      
      Thank you for choosing RenoviqAI for your home renovation journey.
      
      Your verification code is: ${otp}
      
      This code will expire in 10 minutes.
      
      If you did not request this code, please ignore this email or contact our support team at support@renoviqai.com.
      
      Best regards,
      The RenoviqAI Team
      `;
      
        // HTML version with styling
        const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RenoviqAI Verification Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #4A90E2;
            padding: 20px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: white;
          }
          .content {
            padding: 30px 20px;
            background-color: #ffffff;
          }
          .code-box {
            background-color: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            letter-spacing: 2px;
          }
          .code {
            font-weight: bold;
            color: #4A90E2;
            font-size: 32px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
            background-color: #f9f9f9;
          }
          .button {
            background-color: #4A90E2;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            display: inline-block;
            margin-top: 15px;
            font-weight: bold;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">RenoviqAI</div>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Hello,</p>
            <p>Thank you for choosing RenoviqAI for your home renovation journey. To complete your account setup, please use the verification code below:</p>
            
            <div class="code-box">
              <span class="code">${otp}</span>
            </div>
            
            <p>This code will expire in <strong>10 minutes</strong>.</p>
            <p>If you did not request this code, please ignore this email or contact our support team.</p>
            <p>With RenoviqAI, transform your home renovation ideas into reality using the power of AI.</p>
            
            <p>Best regards,<br>The RenoviqAI Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} RenoviqAI. All rights reserved.</p>
            <p>If you have any questions, please contact us at support@renoviqai.com</p>
            <p>123 Innovation Street, Tech City, TC 12345</p>
          </div>
        </div>
      </body>
      </html>
      `;
      
        await sendEmail(
          user.email,
          subject,
          textContent,
          htmlContent
        );
      } catch (error) {
        console.error("Failed to send verification email:", error);
        return res.status(500).send("Failed to send verification email");
      }
      
      res.status(201).json({ message: "Verification code sent to your email" });
      } catch (error) {
        next(error);
      }
  });

  app.post("/api/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
  
    const user = await storage.getUserByEmail(email);
    if (!user) return res.status(400).send("User not found");
  
    if (user.isVerified) return res.status(400).send("User already verified");
  
    if (!user.verificationCode || !user.verificationExpiry) {
      return res.status(400).send("No verification code found");
    }
  
    if (new Date() > user.verificationExpiry) {
      return res.status(400).send("Verification code expired");
    }
  
    if (user.verificationCode !== otp) {
      return res.status(400).send("Invalid verification code");
    }
  
    await storage.verifyUser(user.id);
  
    req.login(user, (err) => {
      if (err) return res.status(500).send(err.message);
      res.status(200).json(user);
    });
  });
  

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

dotenv.config();

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  confirmPassword: z.string(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});