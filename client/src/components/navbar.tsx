import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleNav = (path: string) => {
    if (location !== path) {
      setLocation(path);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const menuItems = [
    { label: "Home", action: () => handleNav("/") },
    { label: "About", action: () => handleNav("/about") },
    { label: "Features", action: () => scrollToSection("features") },
    { label: "Contact", action: () => handleNav("/contact") },
    { label: "Join", action: () => handleNav("/auth"), type: "button" },
    { label: "Sign In", action: () => handleNav("/auth") },
  ];

  return (
    <nav className="fixed top-2 left-2 right-2 z-50 rounded-xl border border-gray-200 bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-md">
      <div className="mx-auto px-4">
        <div className="flex h-12 items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <a href="/" className="text-lg font-bold flex items-center">
              <span className="text-primary">Renoviq</span>
              <span className="text-gray-800 dark:text-white">AI</span>
            </a>
          </div>

          {/* Desktop Nav - Center */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            {menuItems.slice(0, 4).map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-sm font-medium text-gray-800 dark:text-white hover:text-primary transition"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-primary hover:text-white border border-gray-300 dark:border-white/30 transition rounded-full px-4 py-1 text-sm"
              onClick={handleNav.bind(null, "/auth")}
            >
              Join
            </Button>
            <button
              onClick={() => handleNav("/auth")}
              className="text-sm font-medium text-gray-800 dark:text-white hover:text-primary transition"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 dark:text-white"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden justify-center items-center overflow-hidden mt-1 pb-3 flex flex-col space-y-3"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  className={`text-xl font-medium text-center ${
                    item.type === "button"
                      ? "px-4 py-1 rounded-full border w-full bg-primary text-white hover:bg-white hover:text-primary"
                      : "text-gray-800 dark:text-white hover:text-primary transition"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
