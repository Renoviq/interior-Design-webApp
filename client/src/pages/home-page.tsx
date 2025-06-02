import { useAuth } from "@/hooks/use-auth";
import { InfiniteGallery } from "@/components/infinite-gallery";
import { useQuery } from "@tanstack/react-query";
import type { Renovation } from "@shared/schema";
import { useLocation } from "wouter";
import Header from "./_homepageComponents/Header";

export default function HomePage() {
  const { user } = useAuth();
  const { data: renovations } = useQuery<Renovation[]>({
    queryKey: ["/api/renovations"],
  });

  const [location, setLocation] = useLocation();

  const handleViewGallery = () => {
    const renovationSection = document.getElementById('renovation-content');
    if (renovationSection) {
      renovationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-green-700 rounded-full text-sm font-medium border border-blue-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Home Design
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-green-600 via-green-400 to-green-100 bg-clip-text text-transparent">
                {user?.firstName} {user?.lastName} !
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your living space with cutting-edge AI technology.
              Upload a photo of your room and discover endless design
              possibilities.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={() => setLocation("/create-newDesign")} className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl font-semibold hover:from-green-400 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Create New Design
            </button>
            <button onClick={handleViewGallery} className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold border border-slate-200 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md">
              View Gallery
            </button>
          </div>
        </section>
        {/* Renovations Content */}
        <section id="renovation-content" className="space-y-6">
          {/* Section Title */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">
              Your Renovations
            </h2>
            <p className="text-slate-600">
              Your AI-generated design transformations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-8">
              {renovations && renovations.length > 0 ? (
                <InfiniteGallery renovations={renovations} />
              ) : (
                <div className="text-center py-8 space-y-6">
                  {/* Placeholder Image - Hidden on mobile */}
                  <div className="hidden md:block">
                    <div className="w-80 h-50 mx-auto">
                      <img
                        src="./images/PlaceholderImage.png"
                        alt="No Renovations"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Text Message */}
                  <div className="space-y-4">
                    <p className="text-slate-600 max-w-md mx-auto">
                      No renovations yet.
                    </p>
                    <p className="text-xl md:text-2xl text-slate-500 font-medium">
                      Your Interior Design Creations Will Show Up Here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Instant Results
            </h3>
            <p className="text-slate-600 text-sm">
              Get AI-powered design suggestions in seconds
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mx-auto flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Multiple Styles
            </h3>
            <p className="text-slate-600 text-sm">
              Explore various design themes and aesthetics
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg mx-auto flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Save Favorites
            </h3>
            <p className="text-slate-600 text-sm">
              Keep track of your preferred design concepts
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
