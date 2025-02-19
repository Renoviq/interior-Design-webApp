import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface InfiniteCarouselProps {
  images: string[];
}

export function InfiniteCarousel({ images }: InfiniteCarouselProps) {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = async () => {
      if (!container1Ref.current || !container2Ref.current) return;

      // Animate first row left to right
      await controls1.start({
        x: [0, -container1Ref.current.scrollWidth / 2],
        transition: {
          duration: 30, // Increased duration for slower movement
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    const animateReverse = async () => {
      if (!container2Ref.current) return;

      // Animate second row right to left
      await controls2.start({
        x: [-container2Ref.current.scrollWidth / 2, 0],
        transition: {
          duration: 30, // Increased duration for slower movement
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    animate();
    animateReverse();
  }, []);

  return (
    <div className="relative space-y-8 py-4">
      {/* White gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

      {/* First row - moving left */}
      <div className="overflow-hidden relative w-full">
        <motion.div 
          ref={container1Ref}
          className="flex gap-4"
          animate={controls1}
        >
          {/* Double the images to create seamless loop */}
          {[...images, ...images].map((image, index) => (
            <div 
              key={`row1-${index}`}
              className="flex-shrink-0 relative w-[300px] h-[200px] transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Room design ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row - moving right */}
      <div className="overflow-hidden relative w-full">
        <motion.div 
          ref={container2Ref}
          className="flex gap-4"
          animate={controls2}
        >
          {/* Double the images to create seamless loop */}
          {[...images, ...images].map((image, index) => (
            <div 
              key={`row2-${index}`}
              className="flex-shrink-0 relative w-[300px] h-[200px] transform rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              <img
                src={image}
                alt={`Room design ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}