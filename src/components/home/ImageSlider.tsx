
import React, { useState, useEffect } from 'react';

interface SliderProps {
  images: string[];
  autoplaySpeed?: number;
}

const ImageSlider: React.FC<SliderProps> = ({ images, autoplaySpeed = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [images.length, autoplaySpeed]);

  if (!images.length) return null;

  return (
    <div className="slider">
      {images.map((src, index) => (
        <div 
          key={index} 
          className={`slider-item ${index === currentSlide ? 'active' : ''}`}
        >
          <img 
            src={src} 
            alt={`Slide ${index + 1}`} 
            className="slider-img"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.svg';
              console.error(`Failed to load slide image ${index + 1}`);
            }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-white text-center max-w-3xl px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Engineering Tomorrow's Leaders
              </h1>
              <p className="text-lg md:text-xl mb-8">
                NRI Institute of Technology - Shaping futures through quality education and innovation
              </p>
              <button className="btn-accent font-semibold px-6 py-3">
                Explore Programs
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicators */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
