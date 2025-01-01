import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomButton from '../buttons/CustomButton'
import ButtonNav from '../buttons/ButtonNav';
import Image from 'next/image';


interface HamburgerProps {
    isOpen: boolean;
    onAnimationEnd?: () => void;
  }
  
  const Hamburger = ({ isOpen, onAnimationEnd }: HamburgerProps) => {
    const [animationClass, setAnimationClass] = useState<string>("");
    const [animationClassImage, setAnimationClassImage] = useState("animate-sidebar_in");
    const [visible, setVisible] = useState<boolean>(false);
    const [activeButton, setActiveButton] = useState<string | null>(null); // State untuk tombol aktif
    const [currentIndexImage, setCurrentIndexImage] = useState<any>(0); // State untuk tombol aktif

    const [isImageChanging, setIsImageChanging] = useState(false);

    const images = [
        "/assets/ImageNav/image1.png",
        "/assets/ImageNav/image2.png",
        "/assets/ImageNav/image3.png",
        "/assets/ImageNav/image4.png",
        "/assets/ImageNav/image5.png",
        "/assets/ImageNav/image6.png",
        "/assets/ImageNav/image7.png",
      ];


      
    const handleClick = (title: string) => {
        setActiveButton(title); // Tetapkan tombol yang diklik sebagai aktif
    };

 
    const setIndexImage = (index : any) => setCurrentIndexImage(index);


    useEffect(() => {
        if (isImageChanging) {
            setAnimationClassImage("animate-sidebar_in"); // Fade out
          const timeout = setTimeout(() => {
            setAnimationClassImage("animate-sidebar_in"); // Fade in after a short delay
            setIsImageChanging(false); // Stop the changing state after animation
          }, 500); // Duration of the fade out
    
          return () => clearTimeout(timeout); // Cleanup timeout
        }
      }, [currentIndexImage, isImageChanging]);



    // Mengatur animasi dan visibilitas
    useEffect(() => {
      if (isOpen) {
        setVisible(true); // Tampilkan elemen
        setAnimationClass("animate-sidebar_in"); // Jalankan animasi masuk
      } else if (visible) {
        setAnimationClass("animate-sidebar_out"); // Jalankan animasi keluar
      }
    }, [isOpen]);
  
    useEffect(() => {
        if(currentIndexImage){
            console.log('nilai index yang terbuka :', currentIndexImage)
        }
    }, [currentIndexImage])

    // Menangani akhir animasi
    const handleAnimationEnd = () => {
      if (!isOpen) {
          
        
              setVisible(false); // Hapus elemen dari DOM setelah animasi selesai
         
      }
    };
  
    if (!visible) return ( <div className='hidden'></div>); // Hapus elemen dari DOM jika tidak terlihat
  
    return (
      <div
        className={`z-30 fixed inset-0 bg-white h-screen ${animationClass}  transition-transform `}
        onAnimationEnd={handleAnimationEnd} // Callback setelah animasi selesai
      >
         <div className='flex  h-full justify-center items-start'>

            <ul className='flex w-full flex-col h-full justify-center items-start p-20 gap-4'>

            {[
                "Home",
                "Explore Our Villas",
                "Book Your Stay",
                "Contact & Location",
                "Frequently Asked Questions",
                "Privacy Policy",
                "Terms & Conditions",

            ].map((title, index) => (
                <ButtonNav
                key={title}
                title={title}
                handleClick={() => {handleClick(title), setIndexImage(index+1)}}
                setIndexImage={index}
                isActive={activeButton === title} 
                
                />
            ))}

            </ul>

            <div className='w-full h-full flex flex-col justify-center items-center'>

                <div className='flex justify-end items-center p-8 w-full'>
                    <Link href="/auth" className="flex-center w-full max-w-[10rem]">
                        <CustomButton 
                            title="Book Now"
                            btnType="button"
                            containerStyles="text-white bg-color1 px-1 sm:px-2 md:px-4 lg:px-8 py-1 lg:py-3 rounded-md "
                        />
                    </Link>
                </div>

                <div className='w-full h-full flex justify-center items-center  '>
                    
                        <Image
                            src={images[currentIndexImage]}
                            alt={`Image ${currentIndexImage + 1}`}
                            width={500} // Sesuaikan ukuran gambar
                            height={300}
                            key={currentIndexImage}
                            className={`${animationClassImage} rounded-lg`}
                        />


                   
                </div>
            </div>


         </div>

        
        
        
        
        
       



    </div>
  )
}

export default Hamburger