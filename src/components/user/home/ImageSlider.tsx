
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SliderContent } from '../../../types/index';

const ImageSlider = () => {
  const slides: SliderContent[] = [
    {
      url: 'src/images/front-view-woman-posing-with-monochrome-outfit.jpg',
      alt: 'Summer Collection',
      title: 'Popular Collection',
      description: 'Be the first to get your hands on our newest fashion pieces.',
    },
    {
      url: 'https://via.placeholder.com/1200x400/33FF57/FFFFFF?text=New+Arrivals',
      alt: 'New Arrivals',
      title: 'New Arrivals',
      description: 'Be the first to get your hands on our newest fashion pieces.',
    },
    {
      url: 'https://via.placeholder.com/1200x400/3357FF/FFFFFF?text=Special+Offers',
      alt: 'Special Offers',
      title: 'Special Offers',
      description: 'Be the first to get your hands on our newest fashion pieces.',
    }
  ];

  const customPrevArrow = (onClickHandler: () => void, hasPrev: boolean, label: string) => {
    return (
      <button
        onClick={onClickHandler}
        className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 transition-all duration-300 ease-in-out ${
          hasPrev ? 'opacity-100 hover:bg-black/70' : 'opacity-50 cursor-not-allowed'
        }`}
        aria-label={label}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    );
  };

  const customNextArrow = (onClickHandler: () => void, hasNext: boolean, label: string) => {
    return (
      <button
        onClick={onClickHandler}
        className={`absolute right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 transition-all duration-300 ease-in-out ${
          hasNext ? 'opacity-100 hover:bg-black/70' : 'opacity-50 cursor-not-allowed'
        }`}
        aria-label={label}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full bg-gray-100">
      <div className="mx-auto">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          className="mx-auto"
          renderArrowPrev={customPrevArrow}
          renderArrowNext={customNextArrow}
        >
         
          {slides.map((slide, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-8 h-[calc(100vh-4rem)]">
              <div className="w-full md:w-1/2 h-full">
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>

      </div>
    </div>
  );
};

export default ImageSlider; 