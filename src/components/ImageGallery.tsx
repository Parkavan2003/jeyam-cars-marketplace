
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Use a placeholder if no images are provided
  const displayImages = images.length > 0 
    ? images 
    : ['/placeholder.svg'];
  
  return (
    <div className="w-full">
      {/* Main large image */}
      <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
        <img
          src={displayImages[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 rounded-md overflow-hidden cursor-pointer border-2",
                activeIndex === index
                  ? "border-jeyam-amber"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
