import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Image, Wand2, Brain, Cpu, Lock, Zap, CloudLightning, LineChart } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { InfiniteCarousel } from "@/components/infinite-carousel";

const backgroundImages = [
  "/images/background1.jpg",
  "/images/background2.jpg",
  "/images/background3.jpg",
  "/images/background4.jpg",
  "/images/background5.jpg",
  "/images/background6.jpg",
  "/images/background7.jpg"
];

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

export default function LandingPage() {
  const [currentBg, setCurrentBg] = useState(0);
  const form = useForm();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className="fixed inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentBg === index ? 1 : 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        />
      ))}

      <div className="fixed inset-0 bg-black/50" style={{ zIndex: -1 }} />

      <Navbar />

      <main className="flex-grow">
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Room Renovator AI
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Transform your living spaces with the power of AI. Upload a photo and get instant renovation ideas that match your style.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.assign("/auth")}
                  className="group bg-primary hover:bg-primary/90 text-white"
                >
                  Try the AI
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black hover:bg-white/90"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-4 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">About Our Technology</h2>
              <p className="mt-4 text-muted-foreground">
                Our advanced AI technology combines deep learning, computer vision, and design principles
                to revolutionize how you renovate your living spaces.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary group"
                  whileHover={{ y: -5 }}
                >
                  <div className="space-y-4">
                    <div className="text-primary group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <InfiniteCarousel images={sampleImages} />
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Our Features</h2>
              <p className="text-muted-foreground mt-4">
                Discover what makes our AI renovation platform unique
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary group"
                  whileHover={{ y: -5 }}
                >
                  <div className="space-y-4">
                    <div className="text-primary group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Adding more space between sections */}
        <div className="h-40" />


        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold mb-6">Contact us</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We are always looking for ways to improve our products and
                  services. Contact us and let us know how we can help you.
                </p>
                <div className="space-y-4">
                  <p className="flex items-center text-muted-foreground">
                    contact@renoviqai.com
                  </p>
                  <p className="flex items-center text-muted-foreground">
                    +92 344 1886535
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-48 mx-auto block">
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}