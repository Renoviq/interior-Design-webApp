import React from "react";
import { Navbar } from "../components/navbar";
import TeamSection from "../components/ui/TeamSection";
import { Footer } from "../components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 flex flex-col justify-center items-center text-center text-white"
        style={{ backgroundImage: "url('/images/background2.jpg')" }}
      >
        <h1 className="text-6xl font-bold text-white z-10">About</h1>
        <p className="mt-2 text-sm z-10">
          <span className="text-primary">Home</span> / About
        </p>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Image */}
        <div className="rounded-lg shadow-lg overflow-hidden">
          <img
            src="/images/sample1.jpg"
            alt="Design"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Our Design Philosophy
          </h2>
          <p className="mb-6 text-gray-700">
            We believe in creating spaces that inspire and transform. Our
            approach combines innovative technology with timeless design
            principles to deliver exceptional results.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-800 font-medium">
                Innovative and user-centric designs
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-800 font-medium">
                Sustainable and eco-friendly materials
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-primary flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-gray-800 font-medium">
                Attention to detail and craftsmanship
              </span>
            </li>
          </ul>
        </div>
      </div>
      <TeamSection />
      <Footer />

    </div>
  );
}
