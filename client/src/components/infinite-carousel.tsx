import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface InfiniteCarouselProps {
  images: string[];
}

export function InfiniteCarousel({ images }: InfiniteCarouselProps) {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      if (!containerRef.current) return;
      
      await controls.start({
        x: [0, -containerRef.current.scrollWidth / 2],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    animate();
  }, []);

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div 
        ref={containerRef}
        className="flex gap-4"
        animate={controls}
      >
        {/* Double the images to create seamless loop */}
        {[...images, ...images].map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 relative aspect-video w-[300px]"
          >
            <img
              src={image}
              alt={`Room design ${index + 1}`}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
