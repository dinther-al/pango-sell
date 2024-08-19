import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useStore } from "zmp-framework/react";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/banner2.jpg?alt=media&token=8c385836-16ad-47bb-9380-5375143bc9db",
  "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/banner3.jpg?alt=media&token=39a73298-4fe2-437d-9b2d-419581fe63f0",
  "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/banner4.jpg?alt=media&token=1318c04a-d7c4-41b2-a79f-79e8fff4d310",
  "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/3.png?alt=media&token=97b064b1-d5da-4e3b-b79d-646883eb234c",
  "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/banner5.jpg?alt=media&token=24229db2-4b74-4f1e-9f35-32854aa7484f",
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;
  const slideInterval = 3000;
  const loading = useStore("loading");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, slideInterval);

    return () => clearInterval(intervalId);
  }, [totalSlides, slideInterval]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  return (
    <div className="mb-1 z-10">
      {loading ? (
        <Skeleton
          height={160}
          width={370}
          className="flex items-center justify-center ml-[1.2rem] bg-gray-300 rounded-lg"
        />
      ) : (
        <div
          id="default-carousel"
          className="mx-0 relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-44 overflow-hidden md:h-96">
            {[...Array(totalSlides)].map((_, index) => (
              <div
                key={index}
                className={`${
                  currentSlide === index ? "" : "hidden"
                } duration-700 ease-in-out`}
                data-carousel-item
              >
                <img
                  src={images[index]}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-40 px-2 cursor-pointer group focus:outline-none"
              onClick={goToPreviousSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-40 px-2 cursor-pointer group focus:outline-none"
              onClick={goToNextSlide}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 focus:ring-4 focus:ring-white dark:focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-2 h-2 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
