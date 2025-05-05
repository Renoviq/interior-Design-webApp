import passport from "passport";
import { storage } from "./storage"; // Adjust path if needed

// 🔐 How to store user in session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// 🔐 How to retrieve user from session
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUserById(id) as any;
    if (user == null) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});
