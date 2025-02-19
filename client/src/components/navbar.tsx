import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navbar() {
  const [location, navigate] = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-white">
            RenovAI
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm text-white/90 hover:text-white transition">
              Home
            </a>
            <a href="#about" className="text-sm text-white/90 hover:text-white transition">
              About
            </a>
            <a href="#features" className="text-sm text-white/90 hover:text-white transition">
              Features
            </a>
            <a href="#contact" className="text-sm text-white/90 hover:text-white transition">
              Contact
            </a>
          </div>

          {/* Auth Button */}
          <Button 
            variant="outline" 
            className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
            onClick={() => navigate("/auth")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
}
