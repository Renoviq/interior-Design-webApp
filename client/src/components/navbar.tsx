import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navbar() {
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            <span className="text-primary">Renoviq</span>
            <span className="text-white">AI</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-white/90 hover:text-white transition"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm text-white/90 hover:text-white transition"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm text-white/90 hover:text-white transition"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-white/90 hover:text-white transition"
            >
              Contact
            </button>
          </div>

          {/* Auth Button */}
          <Button 
            variant="outline" 
            className="bg-white hover:bg-white/20 border-white/20 text-black/90 hover:text-white transition w-28 rounded-full px-4 py-2"
            onClick={() => location !== "/auth" && window.location.assign("/auth")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
}