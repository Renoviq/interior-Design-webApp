import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from 'react-day-picker';

const CreateNewDesignPage: React.FC = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/studio')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Create New Design</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Design Your Space
            </h2>
            
            {/* Placeholder content - replace with your actual design interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Living Room</h3>
                <p className="text-gray-600 text-sm">Design your living space</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Kitchen</h3>
                <p className="text-gray-600 text-sm">Create your dream kitchen</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Bedroom</h3>
                <p className="text-gray-600 text-sm">Design your bedroom</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Bathroom</h3>
                <p className="text-gray-600 text-sm">Renovate your bathroom</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Office</h3>
                <p className="text-gray-600 text-sm">Design your workspace</p>
              </div>
              
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900 mb-2">Outdoor</h3>
                <p className="text-gray-600 text-sm">Design outdoor spaces</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Start New Project
              </button>
              <Link 
                to="/studio" 
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center no-underline"
              >
                Go to Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewDesignPage;
