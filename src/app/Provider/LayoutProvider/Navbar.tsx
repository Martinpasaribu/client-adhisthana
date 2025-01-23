'use client'

import Link from "next/link"
import Image from "next/image"
import CustomButton from "@/component/buttons/CustomButton"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { MdDarkMode, MdLightMode } from "@/style/icons";
import Hamburger from "@/component/modal/Hamburger";
import { DeletedCart, DeletedCartInSession } from "@/app/booking/utils/deletedCart";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { http } from "@/utils/http";
import toast from "react-hot-toast";
import { UserModels } from "@/models/userModels";


const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [dataMe, setDataMe] = useState<UserModels>();
  const router = useRouter(); 
  const pathname = usePathname();



  const openModal = () => {
    setHamburger((prev) => !prev); // Gunakan callback untuk memastikan nilai sebelumnya digunakan
    setUpdateIndex(0)
    console.log("button in active:", !hamburger); // Cetak nilai baru (hasil toggle)
    console.log("index in active:", updateIndex); // Cetak nilai baru (hasil toggle)
  };

  useEffect(() => {
    console.log("Updated index in navbar:", updateIndex);
}, [updateIndex]);



  const handleAnimationEnd = () => {
    // Fungsi ini akan dipanggil setelah animasi selesai
    console.log("Hamburger animation finished!");
  };

  const handleCloseHam = () => {
    setHamburger(false)
    setUpdateIndex(1)
  }

  const handleBooking = () => {

    DeletedCart().catch((error) => console.error('Error during unload:', error));
    localStorage.removeItem('cart_vila');
    localStorage.removeItem('Params');
    localStorage.removeItem('Night');

  }

  const handleBookingNonDeletedSession = () => {

    localStorage.removeItem('cart_vila');
    localStorage.removeItem('Params');
    localStorage.removeItem('Night');

  }

  const handleBookingDeletedChartInSession = () => {

    DeletedCartInSession().catch((error) => console.error('Error during unload:', error));
    localStorage.removeItem('cart_vila');
    localStorage.removeItem('Params');
    localStorage.removeItem('Night');

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
    if (pathname === "/faq") return "bg"; // Contact
    return "backdrop-blur-sm";
  };

  const getHoverColor = () => {
    if (pathname === "/contact") return "hover:text-color2"; // Contact
    if (pathname === "/terms-conditions") return "hover:text-color2"; // Contact
    if (pathname === "/privacy-policy") return "hover:text-color2"; // Contact
    if (pathname === "/faq") return "hover:text-color2"; // Contact
    return "backdrop-blur-sm";
  };

  const getBackgroundColorUl = () => {
    if (pathname === "/our-vila") return "text-color2"; 
    if (pathname === "/privacy-policy") return "text-color2"; 
    if (pathname === "/terms-conditions") return "text-color2"; 
    if (pathname === "/faq") return "text-color2"; 
    if (pathname === "/booking/offers") return "text-color2"; 
    if (pathname === "/auth/member") return "text-color2"; 
    if (pathname === "/booking") return "text-color2"; 
    if (pathname === "/contact") return "text-color2"; 
    if (pathname === "/auth/login") return "text-color2"; 
    if (pathname === "/auth/register") return "text-color2"; 
    return "text-white";
  };
  
  // Memeriksa Me

  useEffect (() => {
    
      const handleMe = async () => {
        try {
          const response = await http.get('/auth/me');
          setDataMe(response.data.data)

          // toast.success(response.data.message || 'Success login', {
          //   position: "bottom-right",
          //   duration: 1000,
          //   iconTheme: { primary: "#C0562F", secondary: "#fff" },
          //   icon: "🛒",
          //   style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
          // });

        } catch (error : any) {
          // toast.error(error.response.data.message || error.message || 'server error', {
          //   position: "bottom-right",
          //   duration: 5000,
          //   iconTheme: { primary: "#ff0000", secondary: "#fff" },
          //   icon: "⚠️",
          //   style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
          // });
        }
      } 

      handleMe();
  },[])



  return (
      <header
        className={`w-full fixed z-40 backdrop-blur-sm transition-colors duration-500 h-[30rem] max-h-[4rem] h-hp4:max-h-[5rem] md1:max-h-[5rem]  ${
            scrolled ? "bg-white/100" : getBackgroundColor()
          }`}
        >

        <nav className="max-w-[1740px] mx-auto flex justify-between items-center px-3 sm:px-3 md:px-5 py-1 md1:py-4 h-hp4:py-4">
            
        <label className=" hamburger w-full max-w-[28rem] h-[1.5rem] z-50 ">
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
            <Link href="/" className="flex justify-center items-center w-[4.8rem] h-[3.5rem]  md:w-[6rem] md1:w-[8rem] md1:h-[5rem] h-hp4:w-[4rem] h-sm:w-[5.5rem] h-md:w-[6rem] h-md2:w-[8rem] ">
                <Image src="/assets/Logo/adhisthana.png" alt="logo adhisthana" width={400} height={100} className="object-contain  rounded-md"/>
            </Link>
          </div>
    

          <div className="flex justify-end md2:justify-center items-center w-full max-w-[30rem]">

            <ul className={`hidden  md2:flex justify-center items-center gap-2 md:gap-4 lg:gap-6  w-full max-w-[20rem] ${scrolled ? 'text-color2':getBackgroundColorUl()} `}>

              <Link href="/">
                <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':`${getHoverColor()} `}`}>
                  <h1 className="">Home</h1>
                </li>
              </Link>

              <Link href="/about">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':`${getHoverColor()} `} `}>
                <h1>About Us</h1>
              </li>
              </Link>

              <Link href="/our-vila">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':`${getHoverColor()} `} `}>
                <h1>villas</h1>
                </li>
              </Link>
              

              <Link href="/contact">
               <li className={`cursor-pointer transform transition-transform hover:scale-110 ${scrolled ? 'hover:text-black':`${getHoverColor()} `} `}>
                  <h1>Contacts</h1>
                </li>
              </Link>

            </ul>




            {/* Me Auth */}
            { !dataMe ? (

                <>

                  {/* Tombol  { Booking dan Login } */}

                    { pathname === "/booking/offers"  || pathname === "/auth/register" ? (

                      <Link onClick={handleBooking} href="/auth/login" className={` flex justify-end sm:justify-center items-center w-full max-w-[10rem]`}>
                        <CustomButton 
                            title="Login"
                            btnType="button"
                            containerStyles="text-white bg-color1 px-4 sm:px-3 md:px-4 lg:px-8 py-1.5 lg:py-3 rounded-md"
                        />
                      </Link>

                      ): (

                      <>
                      { pathname === "/booking" ? (

                        <Link onClick={handleBooking} href="/auth/login" className={` flex justify-end sm:justify-center items-center w-full max-w-[10rem]`}>
                          <CustomButton 
                              title="Login"
                              btnType="button"
                              containerStyles="text-white bg-color1 px-4 sm:px-3 md:px-4 lg:px-8 py-1.5 lg:py-3 rounded-md"
                          />
                        </Link>

                        ) : (

                            <Link onClick={handleBooking} href="/booking" className={` flex justify-end sm:justify-center  items-center w-full max-w-[10rem]`}>
                              <CustomButton 
                                  title="Book Now"
                                  btnType="button"
                                  containerStyles="text-white bg-color1 px-2 sm:px-2 md:px-4 lg:px-8 py-1.5 lg:py-3 "
                              />
                            </Link>
                        )
                      }
                </>

              )}
                </>

              ) : (

                <>
                  { pathname === "/booking" || pathname === "/booking/offers" || pathname === "/checkout"  || pathname === "/order-status"  ? (

                    <Link onClick={handleBookingNonDeletedSession} href="/auth/member" className={` flex justify-end sm:justify-center  items-center w-full max-w-[10rem]`}>
                    <CustomButton 
                      title={`${dataMe.name.length > 8 ? dataMe.name.slice(0, 8) + '...' : dataMe.name}`}
                      btnType="button"
                      containerStyles="text-white bg-color1 px-4 sm:px-4 md:px-5 lg:px-8 py-2 lg:py-3 rounded-md"
                    />

                    </Link>

                    ) : (

                      <Link onClick={handleBookingDeletedChartInSession} href="/booking" className={` flex justify-end sm:justify-center  items-center w-full max-w-[10rem]`}>
                        <CustomButton 
                            title="Book Now"
                            btnType="button"
                            containerStyles="text-white bg-color1 px-1 sm:px-2 md:px-4 lg:px-8 py-1 lg:py-3 "
                        />
                      </Link>
                    )
                  }
                </>
      
              )
            }


          </div>


        </nav>

        <Hamburger isOpen={hamburger} onAnimationEnd={handleAnimationEnd} closeHamburger={handleCloseHam} updateIndexs={updateIndex}  onIndexChange={() => setUpdateIndex(0)} />

    </header>
  )
}

export default Navbar