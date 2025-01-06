"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { GrNext, GrPrevious } from '@/style/icons';
import { ImageModels } from '../models';

// const images = [
//   "/assets/ImageNav/image1.png",
//   "/assets/ImageNav/image2.png",
//   "/assets/ImageNav/image3.png",
//   "/assets/ImageNav/image4.png",
// ];

interface ImageClosureProps {

    images : ImageModels[]
}


const ClouserImage = ( {images}: ImageClosureProps ) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Image container */}
      <div className="relative w-full overflow-hidden rounded-lg  flex justify-center hp4:justify-start">
      
        <div className='max-w-[22rem] max-h-[15rem]'>
          <Image
            src={images[currentIndex].image}
            alt={`Image ${currentIndex + 1}`}
            width={400} height={400} 
          className='w-full h-full  object-cover rounded-md'
          />
        </div>


        <div className='absolute inset-0 opacity-0 hover:transition ease-in-out delay-150  hover:opacity-100  hover:scale-20  duration-500'>

            {/* Navigation buttons */}
            <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 hover:bg-color1 hover:text-white"
                >
                <GrPrevious size={15} />
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 hover:bg-color1 hover:text-white"
                >
                <GrNext size={15} />
            </button>

            {/* Image indicator */}
            <div className="w-full flex-center absolute bottom-4 flex space-x-2">
                {images.map((_, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-color1' : 'bg-gray-300'}`}
                ></div>
                ))}
            </div>

        </div>

      </div>

    </div>
  );
};

export default ClouserImage;
