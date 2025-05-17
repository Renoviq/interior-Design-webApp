import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navbar() {
  const [location, setLocation] = useLocation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-20 right-20 rounded-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/15">
      <div className="container mx-auto px-1">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            <span className="text-primary">Renoviq</span>
            <span className="text-white">AI</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => location !== "/" && setLocation("/")}
              className="text-sm text-white/90 hover:text-primary transition"
            >
              Home
            </button>
            <button 
              onClick={() => location !== "/about" && setLocation("/about")}
              className="text-sm text-white/90 hover:text-primary transition"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm text-white/90 hover:text-primary transition"
            >
              Features
            </button>
            <button 
              onClick={() => location !== "/contact" && setLocation("/contact")}
              className="text-sm text-white/90 hover:text-primary transition"
            >
              Contact
            </button>
          </div>

          {/* Auth Button */}
          <Button 
            variant="outline" 
            className="bg-white hover:bg-primary border-white/20 text-black/90 hover:text-black transition w-28 rounded-full px-4 py-2"
            onClick={() => location !== "/auth" && window.location.assign("/auth")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
}
