"use client"

import { useState } from "react";

interface ImageGalleryProps {
    images : any
}


const ImageGallery = ({ images } : ImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (index : any) => {
    if (activeImage === index) {
      setActiveImage(null); // Kembalikan ke ukuran kecil
    } else {
      setActiveImage(index); // Perbesar gambar
    }
  };

  return (
    <div className="flex gap-4 ">
      {images.map((image : any, index : any) => (
        <div
          key={index}
          className={`relative cursor-pointer transition-all duration-500 ${
            activeImage === index
              ? "w-[80rem] h-[30rem]"
              : "w-full h-[30rem]"
          }`}
          onClick={() => handleImageClick(index)}
        >
          <img
            src={image}
            alt={`Image ${index}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
