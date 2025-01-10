
import { footerLinks } from "@/constants"
import {  useAppSelector } from "@/lib/hooks/hooks";
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";


const Footer = () => {


  
    // const darkMode = useAppSelector((state) => state.movie.stateTogle);

    
    // useEffect(() => {
    //     if (darkMode) {
    //       document.documentElement.classList.add('dark');
    //       localStorage.setItem('darkMode', 'true');
    //     } else {
    //       document.documentElement.classList.remove('dark');
    //       localStorage.setItem('darkMode', 'false');
    //     }
    //   }, [darkMode]);


  return (
    <footer className="flex flex-col text-black-100  border-gray-100 bg-color2 dark:bg-slate-900 pt-10">

        <div  className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
            <div className="flex flex-col justify-center items-center  sm:items-start gap-6">
                <Image src="/assets/Logo/adhisthanaFooter.png" alt="logo" width={908} height={800} className="object-contain  h-[10rem] w-[10rem] sm:h-[6rem] sm:w-[15rem]" />

            </div>

            <div className="footer__links dark:text-white">
                {footerLinks.map((item) => (
                <div key={item.title} className="footer__link">
                    <h3 className="font-bold text-color1">{item.title}</h3>
                    <div className="flex flex-col gap-5">
                    {item.links.map((link) => (
                        <Link
                        key={link.title}
                        href={link.url}
                        className="text-white"
                        >
                        {link.title}
                        </Link>
                    ))}
                    </div>
                </div>
                ))}
            </div>
        </div>

        <div className='flex justify-between items-center flex-wrap mt-10 gap-5 border-t border-gray-100 sm:px-16 px-6 py-10 text-white'>
            <p>@2025 Adhisthana. All rights reserved</p>

            <div className="flex sm:justify-end justify-center max-sm:mt-4 gap-10 text-white flex-col hp2:flex-row w-full">
                <Link href="/faq" className="">
                FAQ
                </Link>
                <Link href="/" className="w-full max-w-[10rem]">
                Privacy & Policy
                </Link>
                <Link href="/" className="w-full max-w-[10rem]">
                Terms & Condition
                </Link>
            </div>
        </div>

        
    </footer>
  )
}

export default Footer