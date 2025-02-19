import { motion } from "framer-motion";
import { InfiniteCarousel } from "@/components/infinite-carousel";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Brain, Cpu, Lock, Zap, CloudLightning, LineChart } from "lucide-react";

const sampleImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  "https://images.unsplash.com/photo-1617806118233-18e1de247200"
];

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Advanced AI Models",
    description: "Powered by state-of-the-art machine learning models trained on millions of interior designs."
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "Real-time Processing",
    description: "Get instant design variations with our optimized processing pipeline."
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Secure & Private",
    description: "Your designs and data are encrypted and protected with enterprise-grade security."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Smart Suggestions",
    description: "AI-powered recommendations for furniture, colors, and layouts that match your style."
  },
  {
    icon: <CloudLightning className="h-8 w-8" />,
    title: "Style Transfer",
    description: "Transform your room's style while maintaining its structural integrity."
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    title: "Design Analytics",
    description: "Get insights into popular styles and trends to inform your renovation decisions."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Transforming Spaces with AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Our advanced AI technology combines deep learning, computer vision, and design principles
            to revolutionize how you renovate your living spaces.
          </motion.p>
        </section>

        {/* Image Carousel */}
        <section className="py-12">
          <InfiniteCarousel images={sampleImages} />
        </section>

        {/* Technology Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Technology</h2>
            <p className="text-muted-foreground mt-2">
              Powered by cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 space-y-4 h-full">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              A simple three-step process to transform your space
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your Room",
                description: "Take a photo of your room from any angle and upload it to our platform."
              },
              {
                step: "02",
                title: "Choose Your Style",
                description: "Select from various design styles or let our AI suggest the best matches."
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive multiple AI-generated design variations in seconds."
              }
            ].map((step, i) => (
              <div key={i} className="relative p-6 space-y-4">
                <span className="text-6xl font-bold text-primary/10">{step.step}</span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
