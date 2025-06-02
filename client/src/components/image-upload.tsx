import React, { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        onFileSelect(null);
        setPreviewUrl(null);
        return;
      }
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      onFileSelect(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {previewUrl ? (
        <div className="relative w-full h-64 border border-gray-300 rounded-md overflow-hidden bg-gray-50">
          <img
            src={previewUrl}
            alt="Preview"
            className="object-contain w-full h-full"
          />
          <button
            type="button"
            onClick={() => {
              onFileSelect(null);
              setPreviewUrl(null);
              setError(null);
            }}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
            aria-label="Remove selected image"
          >
            &times;
          </button>
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:border-green-600 hover:bg-green-50 transition text-gray-500"
        >
          <svg
            className="w-12 h-12 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 4v8m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span>Click to select an image or drag and drop</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};
