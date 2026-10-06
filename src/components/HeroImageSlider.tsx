import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown, Pause, Play, MoveVertical } from 'lucide-react';

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    src: '/src/assets/images/hero_atelier_interior_1791272310771.jpg',
    alt: 'Architectural Scandinavian interior with travertine and oak'
  },
  {
    id: 'slide-2',
    src: '/src/assets/images/hero_sculptural_living_1791273177337.jpg',
    alt: 'Minimalist penthouse lounge with floor to ceiling glass'
  },
  {
    id: 'slide-3',
    src: '/src/assets/images/hero_acoustic_studio_1791273197441.jpg',
    alt: 'Acoustic studio with walnut slat walls and turntable'
  },
  {
    id: 'slide-4',
    src: '/src/assets/images/hero_horology_bench_1791273214168.jpg',
    alt: 'Master horology bench with titanium movement and brass tools'
  },
  {
    id: 'slide-5',
    src: '/src/assets/images/hero_courtyard_gallery_1791273228173.jpg',
    alt: 'Minimalist gallery courtyard with bronze monolith'
  }
];

export const HeroImageSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Touch / Drag swipe detection
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  // Slide down (moves to next slide with top-to-bottom effect)
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIdx(prev => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, totalSlides]);

  // Slide up (moves to previous slide)
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIdx(prev => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, totalSlides]);

  const goToSlide = (idx: number) => {
    if (isAnimating || idx === currentIdx) return;
    setIsAnimating(true);
    setCurrentIdx(idx);
    setTimeout(() => setIsAnimating(false), 700);
  };

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Touch Swipe Handlers for mobile & desktop drag
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartY.current = clientY;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchEndY.current = clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || touchEndY.current === null) return;
    const deltaY = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (deltaY > minSwipeDistance) {
      // Swiped UP -> show next slide below
      nextSlide();
    } else if (deltaY < -minSwipeDistance) {
      // Swiped DOWN -> show prev slide above
      prevSlide();
    }

    touchStartY.current = null;
    touchEndY.current = null;
  };

  return (
    <section
      className="relative w-full h-[72vh] sm:h-[82vh] lg:h-[88vh] max-h-[920px] min-h-[520px] bg-stone-950 overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={e => {
        if (touchStartY.current !== null) handleTouchMove(e);
      }}
      onMouseUp={handleTouchEnd}
      aria-label="Full size architectural hero slider"
    >
      {/* Vertical Sliding Reel (Top to Bottom transition) */}
      <div
        className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: `translateY(-${currentIdx * 100}%)`
        }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full h-full relative shrink-0"
            style={{ height: '100%' }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center pointer-events-none"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Subtle ultra-fine optical edge vignette (preserves clean image without visible text) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Swipe Effect Controller in Bottom Right */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex flex-col items-center">
        <div className="bg-stone-950/80 backdrop-blur-md border border-white/15 text-stone-100 rounded-xl p-3 sm:p-3.5 shadow-2xl flex flex-col items-center gap-3">
          
          {/* Slide counter */}
          <div className="font-mono text-[11px] sm:text-xs text-stone-300 tracking-wider flex items-center gap-1">
            <span className="font-semibold text-white">0{currentIdx + 1}</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-400">0{totalSlides}</span>
          </div>

          {/* Vertical progress segments */}
          <div className="flex flex-col gap-1.5 py-1">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIdx === idx
                    ? 'w-1.5 h-6 bg-white shadow-sm'
                    : 'w-1.5 h-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Vertical Swipe Navigation Arrows */}
          <div className="flex flex-col gap-1 pt-1 border-t border-white/10 w-full items-center">
            <button
              onClick={prevSlide}
              aria-label="Previous slide (up)"
              className="p-1.5 hover:bg-white/15 rounded-md text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Previous slide"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide (down)"
              className="p-1.5 hover:bg-white/15 rounded-md text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Next slide"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Autoplay play/pause toggle & swipe indicator */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[10px] text-stone-400 font-mono">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-stone-400 hidden sm:inline-flex">
              <MoveVertical className="w-2.5 h-2.5" />
              Swipe
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};
