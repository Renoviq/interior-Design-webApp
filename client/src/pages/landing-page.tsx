import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Home, Image, Wand2 } from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();

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
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Cursor light effect */}
      <div className="pointer-events-none fixed inset-0 z-30 transition duration-300" 
        style={{ background: "radial-gradient(600px at var(--x, 0px) var(--y, 0px), rgba(29, 78, 216, 0.15), transparent 80%)" }}
      />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
              Room Renovator AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your living spaces with the power of AI. Upload a photo and get instant renovation ideas that match your style.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="group"
              >
                Try the AI
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
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
                className="relative group p-8 rounded-lg bg-card hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-foreground rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}