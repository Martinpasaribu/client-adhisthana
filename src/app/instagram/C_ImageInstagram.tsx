import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ContentModel } from "@/models/instagramModels";
import { FaInstagram, GrFormNextLink, GrFormPreviousLink } from "@/style/icons";

interface ImageCarouselProps {
  content: ContentModel[];
}

const ImageCarousel = ({ content }: ImageCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default to 4
  const [windowWidth, setWindowWidth] = useState(0);

  // Fungsi untuk menyesuaikan itemsPerPage berdasarkan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth >= 640) {
        setItemsPerPage(4); // Untuk layar ukuran 'md' dan lebih besar
      } else {
        setItemsPerPage(2); // Untuk layar lebih kecil dari 'md'
      }
    };

    // Menambahkan event listener untuk resize
    window.addEventListener("resize", handleResize);

    // Panggil sekali pada pertama kali render
    handleResize();

    // Membersihkan event listener saat komponen unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (startIndex + itemsPerPage < content.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center overflow-hidden gap-2">
      {/* Tombol Previous */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-color1 text-white absolute left-3 z-10"
      >
        <GrFormPreviousLink size={20} />
      </button>

      {/* Kontainer Carousel yang Digeser */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(startIndex * 100) / itemsPerPage}%)`,
        }}
      >
        {content.map((item, index) => (
          <div
            key={index}
            className="w-1/2 sm:w-1/4 flex-shrink-0 p-2" // 1/4 berarti 4 gambar per baris untuk layar 'md' ke atas
          >
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-full rounded-md overflow-hidden"
            >
              <Image
                src={item.media_url || "/placeholder-image.png"}
                alt={`Image number ${index + 1}`}
                width={800}
                height={800}
                className="w-full h-full object-cover rounded-md"
              />

              <FaInstagram size={25} className="absolute right-2 bottom-2 text-white"/>
            </a>
          </div>
        ))}
      </div>

      {/* Tombol Next */}
      <button
        onClick={handleNext}
        disabled={startIndex + itemsPerPage >= content.length}
        className="p-2  rounded-full absolute right-3 backdrop-blur-sm bg-black/20 hover:bg-color1 text-white z-10"
      >
        <GrFormNextLink size={20} />
        
      </button>
    </div>
  );
};

export default ImageCarousel;
