import React, { useState } from 'react';

interface DesignStyle {
  id: string;
  name: string;
  imageUrl: string;
}

const designStyles: DesignStyle[] = [
  {
    id: 'modern',
    name: 'Modern',
    imageUrl: '/images/design-styles/modern.jpg',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    imageUrl: '/images/design-styles/industrial.jpg',
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    imageUrl: '/images/design-styles/bohemian.jpg',
  },
  {
    id: 'traditional',
    name: 'Traditional',
    imageUrl: '/images/design-styles/traditional.jpg',
  },
  {
    id: 'rustic',
    name: 'Rustic',
    imageUrl: '/images/design-styles/rustic.jpg',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    imageUrl: '/images/design-styles/minimalist.jpg',
  },
];

interface DesignTypeProps {
  selectedDesign: string;
  onSelect: (designId: string) => void;
}

export const DesignType: React.FC<DesignTypeProps> = ({ selectedDesign, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-gray-700">Select Interior Design Type</label>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {designStyles.map((style) => (
          <div
            key={style.id}
            className={`cursor-pointer border rounded-md overflow-hidden ${
              selectedDesign === style.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'
            }`}
            onClick={() => onSelect(style.id)}
            title={style.name}
          >
            <img src={style.imageUrl} alt={style.name} className="w-full h-20 object-cover" />
            <p className="text-center text-sm mt-1">{style.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
