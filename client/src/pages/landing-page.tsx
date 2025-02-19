import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Image, Wand2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";
import {Footer} from "@/components/footer"; // Import the Footer component

const backgroundImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
];

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Carousel */}
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentBg === index ? 1 : 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="relative pt-16">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-16"
          >
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Room Renovator AI
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Transform your living spaces with the power of AI. Upload a photo and get instant renovation ideas that match your style.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="group bg-white text-black hover:bg-white/90"
                >
                  Try the AI
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              id="features"
              variants={itemVariants} 
              className="grid md:grid-cols-3 gap-8 py-16"
            >
              {[
                {
                  icon: <Home className="h-8 w-8" />,
                  title: "Any Room Type",
                  description: "Transform bedrooms, living rooms, kitchens, and more with our AI technology."
                },
                {
                  icon: <Image className="h-8 w-8" />,
                  title: "Simple Upload",
                  description: "Just upload a photo of your room and let our AI do the magic."
                },
                {
                  icon: <Wand2 className="h-8 w-8" />,
                  title: "Instant Results",
                  description: "Get multiple design variations in seconds, not days."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="relative group p-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="space-y-4">
                    <div className="text-white">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
      {/* Add Footer */}
      <Footer /> {/* Added Footer component */}
    </div>
  );
}