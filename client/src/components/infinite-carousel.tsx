import { useEffect, useRef, useMemo } from "react";

interface InfiniteCarouselProps {
  images: string[];
  speed?: number; // pixels per second
}

export function InfiniteCarousel({ images, speed = 50 }: InfiniteCarouselProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ id1?: number; id2?: number }>({});

  // Memoize doubled images array to prevent recreation on every render
  const doubledImages = useMemo(() => [...images, ...images], [images]);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    
    // Calculate the width of one set of images
    const singleSetWidth = (300 + 16) * images.length; // 300px width + 16px gap
    
    let position1 = 0;
    let position2 = -singleSetWidth;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      // Update positions
      position1 -= speed * deltaTime;
      position2 += speed * deltaTime;

      // Reset position when one full set has passed
      if (position1 <= -singleSetWidth) {
        position1 = 0;
      }
      if (position2 >= 0) {
        position2 = -singleSetWidth;
      }

      // Apply transforms using transform3d for better performance
      row1.style.transform = `translate3d(${position1}px, 0, 0)`;
      row2.style.transform = `translate3d(${position2}px, 0, 0)`;

      animationRef.current.id1 = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current.id1 = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationRef.current.id1) {
        cancelAnimationFrame(animationRef.current.id1);
      }
    };
  }, [images, speed]);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.src = '';
      });
    };
  }, [images]);

  return (
    <div className="relative space-y-8 py-4 overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* First row - moving left */}
      <div className="overflow-hidden relative w-full">
        <div 
          ref={row1Ref}
          className="flex gap-4 will-change-transform"
          style={{ width: `${(300 + 16) * doubledImages.length}px` }}
        >
          {doubledImages.map((image, index) => (
            <div 
              key={`row1-${index}`}
              className="flex-shrink-0 relative w-[300px] h-[200px] transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Room design ${(index % images.length) + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - moving right */}
      <div className="overflow-hidden relative w-full">
        <div 
          ref={row2Ref}
          className="flex gap-4 will-change-transform"
          style={{ width: `${(300 + 16) * doubledImages.length}px` }}
        >
          {doubledImages.map((image, index) => (
            <div 
              key={`row2-${index}`}
              className="flex-shrink-0 relative w-[300px] h-[200px] transform rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Room design ${(index % images.length) + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}