import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-white/80">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-8 border-b border-white/10 pb-8">
          <a href="/" className="text-2xl font-bold">
            <span className="text-primary">Renoviq</span>
            <span className="text-white">AI</span>
          </a>
          <nav className="flex flex-wrap justify-center gap-8">
            <a href="/products" className="text-sm hover:text-primary transition">Products</a>
            <a href="/studio" className="text-sm hover:text-primary transition">Studio</a>
            <a href="/clients" className="text-sm hover:text-primary transition">Clients</a>
            <a href="/pricing" className="text-sm hover:text-primary transition">Pricing</a>
            <a href="/blog" className="text-sm hover:text-primary transition">Blog</a>
            <a href="/privacy" className="text-sm hover:text-primary transition">Privacy</a>
            <a href="/terms" className="text-sm hover:text-primary transition">Terms</a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8">
          <p className="text-sm text-white/60 mb-4 md:mb-0">© RenoviqAI Studios</p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-primary transition">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}