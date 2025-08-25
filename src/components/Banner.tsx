import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
}

interface BannerProps {
  items: BannerItem[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  items,
  autoPlay = true,
  interval = 3000,
  showDots = true,
  showArrows = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const handleItemClick = (item: BannerItem) => {
    if (item.link) {
      if (item.link.startsWith('http')) {
        window.open(item.link, '_blank');
      } else {
        window.location.href = item.link;
      }
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm">
      {/* 轮播内容 */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="w-full h-full flex-shrink-0 relative cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <img 
              src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=three%20people%20holding%20red%20banner%20with%20Chinese%20text%20in%20outdoor%20construction%20site%20with%20green%20mountains%20background&image_size=landscape_16_9" 
              alt="团队合作" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-xs opacity-90 line-clamp-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 左右箭头 */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* 指示点 */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;