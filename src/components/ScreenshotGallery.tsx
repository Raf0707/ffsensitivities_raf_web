import React, { useState, useCallback } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination, Zoom } from 'swiper/modules';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface Screenshot {
  url: string;
  alt: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  title?: string;
  className?: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({
  screenshots, 
  title = "", 
  className = "",
}) => {
  const [fullscreenSwiper, setFullscreenSwiper] = useState<SwiperClass | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handlePrev = useCallback(() => {
    fullscreenSwiper?.slidePrev();
  }, [fullscreenSwiper]);

  const handleNext = useCallback(() => {
    fullscreenSwiper?.slideNext();
  }, [fullscreenSwiper]);

  return (
    <>
      <section className={`py-16 px-4 bg-dark-200 border-y border-dark-300 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-light-100">{title}</h2>
          <Swiper
            modules={[Pagination, Zoom]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            zoom
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="screenshots-swiper"
          >
            {screenshots.map((screenshot, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  className="rounded-lg overflow-hidden border border-dark-300 swiper-zoom-container cursor-pointer"
                  onClick={() => openFullscreen()}
                >
                  <img
                    src={screenshot.url}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            onClick={closeFullscreen} 
            className="absolute top-4 right-4 z-60 text-white"
          >
            <X size={32} />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-4 z-60 text-white bg-black/50 rounded-full p-2"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 z-60 text-white bg-black/50 rounded-full p-2"
          >
            <ChevronRight size={32} />
          </button>

          <Swiper
            modules={[Pagination, Zoom]}
            pagination={{ clickable: true }}
            zoom
            onSwiper={setFullscreenSwiper}
            className="w-full max-w-6xl h-[90vh]"
          >
            {screenshots.map((screenshot, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="swiper-zoom-container">
                  <img
                    src={screenshot.url}
                    alt={screenshot.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ScreenshotGallery;