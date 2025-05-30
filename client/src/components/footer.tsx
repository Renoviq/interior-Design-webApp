import { FaTwitter, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Logo and Newsletter Section */}
          <div className="space-y-8">
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold">
                <span className="text-primary">Renoviq</span>
                <span className="text-white">AI</span>
              </span>
            </a>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Join the newsletter</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Subscribe for weekly updates. No spams ever!
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-64 sm:w-full lg:w-64 px-4 py-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors md:w-auto"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Links Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solutions Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Solutions</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/interior-redesign" className="text-gray-400 hover:text-white transition-colors">
                    Interior Redesign
                  </a>
                </li>
                <li>
                  <a href="/virtual-staging" className="text-gray-400 hover:text-white transition-colors">
                    Virtual Staging
                  </a>
                </li>
                <li>
                  <a href="/exterior-design" className="text-gray-400 hover:text-white transition-colors">
                    Exterior Design
                  </a>
                </li>
                <li>
                  <a href="/paintify" className="text-gray-400 hover:text-white transition-colors">
                    Paintify
                  </a>
                </li>
                <li>
                  <a href="/landscaping" className="text-gray-400 hover:text-white transition-colors">
                    Landscaping
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/blogs" className="text-gray-400 hover:text-white transition-colors">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="/studio" className="text-gray-400 hover:text-white transition-colors">
                    Studio
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">
                    Terms of use
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
            
            <p className="text-sm text-gray-400">
              Copyright © RenoviqAI 2025
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}