import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Form, FormField, FormItem, FormControl } from "../components/ui/form";
import { MapPin, Phone, Mail } from "lucide-react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { motion } from "framer-motion";

export default function Contact() {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const onSubmit = async (data: any) => {
    setSubmitStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit contact form");
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col pt-24 justify-center items-center text-center text-white"
        style={{ backgroundImage: "url('/images/background3.jpg')" }}
      >
        <h1 className="text-6xl font-bold z-10">Contact</h1>
        <p className="mt-2 text-sm z-10">
          <span className="text-primary">Home</span> / Contact
        </p>
        <div className="absolute inset-0 bg-black opacity-40 z-0" />
      </div>

      {/* Content Section */}
      <div className="bg-gray-100 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Contact Info */}
            <div className="space-y-10">
              <h2 className="text-4xl font-bold">Get in Touch</h2>
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-primary rounded-full text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p>International Islamic University Islamabad</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-primary rounded-full text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p>+92 344 1886535</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-primary rounded-full text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p>contact@renoviqai.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Contact Form */}
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Your Full Name"
                            {...field}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:border-green-300 focus:ring-green-300 focus:ring-1 focus:outline-none transition"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            {...field}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:border-green-300 focus:ring-green-300 focus:ring-1 focus:outline-none transition"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Company */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Company"
                            {...field}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:border-green-300 focus:ring-green-300 focus:ring-1 focus:outline-none transition"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Message"
                            {...field}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white min-h-[180px] focus:border-green-300 focus:ring-green-300 focus:ring-1 focus:outline-none transition"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition"
                      disabled={submitStatus === "submitting"}
                    >
                      {submitStatus === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                  {submitStatus === "success" && (
                    <p className="text-green-600 text-center">Message sent successfully!</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-600 text-center">Error: {errorMessage}</p>
                  )}
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
