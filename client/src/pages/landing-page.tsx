import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Image, Wand2, Brain, Cpu, Lock, Zap, CloudLightning, LineChart, Paintbrush, Building } from "lucide-react";
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
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
  "/images/sample4.jpg",
  "/images/sample5.jpg",
  "/images/sample6.jpg",
  "/images/sample7.jpg",
  "/images/sample8.jpg",
  "/images/sample9.jpg"
];

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered Design",
    description: "We develop the full cycle of AI-powered design solutions. Our advanced machine learning models create stunning interior transformations."
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Interior Transformation",
    description: "We will take care of the interior designs, build & management of all kind of living projects with cutting-edge technology."
  },
  {
    icon: <Paintbrush className="h-8 w-8" />,
    title: "Style Customization",
    description: "We can help you with the best interior design and style customization to create the perfect living space for you."
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "3D Visualization",
    description: "We offer professional online 2D and 3D interior designing which will help you visualize your dream home before implementation."
  }
];

export default function LandingPage() {
  const [currentBg, setCurrentBg] = useState(0);
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: ""
    }
  });
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/contactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus("Your message has been sent successfully.");
        form.reset();
        window.history.pushState(null, "", "/");
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        const errorData = await response.json();
        setSubmitStatus(errorData.error || "Failed to send message.");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setSubmitStatus("An error occurred while sending your message.");
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

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
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                Transform your Space with AI
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Transform your living spaces with the power of AI. Upload a photo and get instant renovation ideas that match your style.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="sm"
                  onClick={() => window.location.assign("/auth")}
                  className="group bg-primary hover:bg-primary/90 text-white"
                >
                  Try the AI
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="sm"
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
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative">
                  {/* Third smallest image - behind main image on upper left */}
                  <div className="absolute -top-6 -left-6 z-20 w-54 h-40 rounded-lg overflow-hidden shadow-xl border-4 border-white"
                  style={{ boxShadow: '-8px -8px 25px rgba(0, 0, 0, 0.15)' }}>
                    <img
                      src="/images/background4.jpg"
                      alt="Bedroom Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Main large image */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/background3.jpg"
                      alt="Modern Living Room"
                      className="w-full h-[500px] object-cover shadow-2xl"
                    />
                  </div>
                  
                  {/* Smaller overlapping image - bottom right */}
                  <div className="absolute -bottom-8 -right-8 z-20 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/images/background6.jpg"
                      alt="Living Room Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right side - Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                    ABOUT US
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Tech Solutions for Professional Designers
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    RenoviqAI is an expression of cutting-edge technology and design innovation. 
                    Whether you have traditional tastes or desire a modern feel, we can design your dream spaces to 
                    suit any purpose using the power of artificial intelligence.
                  </p>
                </div>

                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-medium group"
                  onClick={() => window.location.assign("/about")}
                >
                  More about Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            {/* Three feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mt-16"
            >
              {[
                {
                  icon: <Home className="h-6 w-6" />,
                  title: "Interior Design",
                  description: "Transform your indoor spaces with AI-powered furniture placement and color schemes."
                },
                {
                  icon: <Building className="h-6 w-6" />,
                  title: "Exterior Design",
                  description: "Revolutionize your home's curb appeal with intelligent landscaping and facade improvements."
                },
                {
                  icon: <Paintbrush className="h-6 w-6" />,
                  title: "Paintify",
                  description: "Instantly visualize different paint colors and flooring options using advanced AI."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-xl bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="inline-flex p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors">
                      <div className="text-gray-600 group-hover:text-primary transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="carousel" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <InfiniteCarousel images={sampleImages} />
          </div>
        </section>

        {/* Redesigned Features Section */}
        <section id="features" className="relative min-h-screen flex">
          {/* Left Side - Dark Section with Text and Cards */}
          <div className="w-full lg:w-3/5 bg-white relative flex flex-col justify-center px-8 lg:px-16 py-8 lg:py-16">
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-lg"
            >
              <p className="text-sm font-medium text-green-500 uppercase tracking-widest mb-4">
                SERVICES WE DO
              </p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-tight">
                Our Featured Services
              </h2>
              <h3 className="text-xl lg:text-xl font-light text-black leading-tight">
                Your Living space Transformations
              </h3>
            </motion.div>

            {/* Service Cards Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex p-2 rounded-lg bg-amber-50 group-hover:bg-primary/10 transition-colors">
                      <div className="text-amber-600 group-hover:text-primary transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description.slice(0, 100)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.assign("/features")}
                      className="border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs px-4 py-1"
                    >
                      Read More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Room Image */}
          <div className="hidden lg:block w-2/5 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/images/featureBack.jpg)`
              }}
            />
            {/* Optional overlay for better contrast */}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Mobile: Full width background image with overlay */}
          <div className="lg:hidden absolute inset-0 opacity-20">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(/images/featureBack.jpg)`
              }}
            />
          </div>
        </section>

        <section className="py-20 bg-transparent flex flex-col items-center justify-center space-y-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-white">Let's try the AI</h2>
          <p className="text-white max-w-xl text-center">
            Experience the power of AI-driven room renovation ideas tailored just for you.
          </p>
          <button
            onClick={() => window.location.assign("/auth")}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition"
          >
            Give a try
          </button>
        </section>

        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 px-[23px]">
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

              <div className="bg-gray-50 rounded-lg p-8 shadow-2xl border border-black/20">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                    <Button type="submit" className="w-48 mx-auto block" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Submit"}
                    </Button>
                    {submitStatus && (
                      <p className="mt-4 text-center text-sm text-green-600">
                        {submitStatus}
                      </p>
                    )}
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