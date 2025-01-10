'use client'

import Link from "next/link"
import Image from "next/image"
import CustomButton from "@/component/buttons/CustomButton"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { MdDarkMode, MdLightMode } from "@/style/icons";
import Hamburger from "@/component/modal/Hamburger";
import { DeletedCart } from "@/app/booking/utils/deletedCart";
import { useRouter, useSearchParams, usePathname } from "next/navigation";


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const router = useRouter(); 
  const pathname = usePathname();


  const openModal = () => {
    setHamburger((prev) => !prev); // Gunakan callback untuk memastikan nilai sebelumnya digunakan
    console.log("button active:", !hamburger); // Cetak nilai baru (hasil toggle)
  };

  const handleAnimationEnd = () => {
    // Fungsi ini akan dipanggil setelah animasi selesai
    console.log("Hamburger animation finished!");
  };

  const handleCloseHam = () => {
    setHamburger(false)
  }

  const handleBooking = () => {

    DeletedCart().catch((error) => console.error('Error during unload:', error));
    localStorage.removeItem('cart_vila');
    localStorage.removeItem('Params');

  }
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const getBackgroundColor = () => {
    if (pathname === "/contact") return "bg-gray-400"; // Contact
    if (pathname === "/faq") return "bg-gray-400"; // Contact
    return "backdrop-blur-sm";
  };

  const getBackgroundColorUl = () => {
    if (pathname === "/ourVila") return "text-color2"; 
    return "text-white";
  };
  

  return (
      <header
        className={`w-full fixed z-40 backdrop-blur-sm transition-colors duration-500 ${
            scrolled ? "bg-white/100" : getBackgroundColor()
          }`}
        >

        <nav className="max-w-[1740px] mx-auto flex justify-between items-center px-3 sm:px-3 md:px-5 py-1 md:py-4">
            
        <label className="hamburger w-full max-w-[28rem] h-[1.5rem] z-50 ">
          <input
            className="switcher w-[2rem]"
            type="checkbox"
            checked={hamburger}
            onChange={openModal} 
          />
          <span className={`hamburger__line w-[1.8rem] md:w-[2.2rem] xl:w-[2.8rem] ${scrolled ? 'bg-color2':'bg-slate-800'}  `}></span>
          <span className={`hamburger__line w-[1.8rem] md:w-[2.2rem] xl:w-[2.8rem] ${scrolled ? 'bg-color2':'bg-slate-800'}  `}></span>
          <span className={`hamburger__line w-[1.8rem] md:w-[2.2rem] xl:w-[2.8rem] ${scrolled ? 'bg-color2':'bg-slate-800'}  `}></span>
          <span className={`hamburger__line w-[1.8rem] md:w-[2.2rem] xl:w-[2.8rem] ${scrolled ? 'bg-color2':'bg-slate-800'}  `}></span>
        </label>

            
          <div className="">
            <Link href="/" className="flex justify-center items-center w-[4rem]  h-[4rem] sm:h-[5rem] sm:w-[8rem]">
                <Image src="/assets/Logo/adhisthana.png" alt="logo mari belajar" width={400} height={100} className="object-contain  rounded-md"/>
            </Link>
          </div>
    

          <div className="flex justify-end md2:justify-center items-center w-full max-w-[30rem]">

            <ul className={`hidden  md2:flex justify-center items-center gap-2 md:gap-4 lg:gap-6  w-full max-w-[20rem] ${scrolled ? 'text-color2':getBackgroundColorUl()} `}>

              <Link href="/">
                <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':'hover:text-white'} `}>
                  <h1 className="">Home</h1>
                </li>
              </Link>

              <Link href="/about">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':'hover:text-white'} `}>
                <h1>About Us</h1>
              </li>
              </Link>

              <Link href="/ourVila">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':'hover:text-white'} `}/>
                <h1>villas</h1>
              </Link>
              

              <Link href="/contact">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':'hover:text-white'} `}/>
                  <h1>Contacts</h1>
                
              </Link>

            </ul>


            <Link onClick={handleBooking} href="/booking" className="flex justify-end sm:justify-center items-center w-full max-w-[10rem] ">
              <CustomButton 
                  title="Book Now"
                  btnType="button"
                  containerStyles="text-white bg-color1 px-1 sm:px-2 md:px-4 lg:px-8 py-1 lg:py-3 "
              />
            </Link>
          </div>


        </nav>

        <Hamburger isOpen={hamburger} onAnimationEnd={handleAnimationEnd} closeHamburger={handleCloseHam}/>

    </header>
  )
}

export default Navbar