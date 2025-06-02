import React, { useState } from 'react';
import Header from './_homepageComponents/Header';
import { ImageUpload } from '@/components/image-upload';
import { RoomType } from '@/components/RoomType';
import { DesignType } from '@/components/DesignType';
import { AdditionalReq } from '@/components/AdditionalReq';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function CreateNewDesignPage() {
  const [selectedRoom, setSelectedRoom] = useState('Kitchen');
  const [selectedDesign, setSelectedDesign] = useState('modern');
  const [additionalReq, setAdditionalReq] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedFile) {
      alert('Please select an image before generating.');
      return;
    }
    setUploading(true);
    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `uploads/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Send data to backend API
      const response = await fetch('/api/renovations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          originalImage: imageUrl,
          generatedImage: '', // Will be updated after AI generation
          roomType: selectedRoom,
          description: additionalReq,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save renovation');
      }

      alert('Image uploaded and renovation saved successfully!');
      setSelectedFile(null);
      setAdditionalReq('');
    } catch (error: any) {
      alert(error.message || 'An error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          Experience the Magic of AI Remodeling
        </h1>
        <p className="text-center mb-12 text-gray-700">
          Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image Upload */}
          <div className="md:w-1/2">
            <label className="block mb-2 font-semibold text-gray-700">
              Select Image of your room
            </label>
            <div className="border border-gray-300 rounded-md p-4 min-h-[300px] flex items-center justify-center bg-gray-50">
              <ImageUpload onFileSelect={setSelectedFile} />
            </div>
          </div>

          {/* Right: Form Controls */}
          <div className="md:w-1/2 space-y-6">
            <RoomType selectedRoom={selectedRoom} onChange={setSelectedRoom} />
            <DesignType selectedDesign={selectedDesign} onSelect={setSelectedDesign} />
            <AdditionalReq value={additionalReq} onChange={setAdditionalReq} />
            <button
              onClick={handleGenerate}
              disabled={uploading}
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition disabled:opacity-50"
            >
              {uploading ? 'Generating...' : 'Generate'}
            </button>
            <p className="text-center text-sm text-gray-500">
              NOTE: 1 Credit will use to redesign your room
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateNewDesignPage;
