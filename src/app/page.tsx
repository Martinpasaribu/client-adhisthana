"use client"


// console.log('ENV:', process.env.INSTAGRAM_ACCESS_TOKEN);

import Link from "next/link";
import Script from 'next/script';
import Closure from "./clouser/clouser";
import InstagramProfile from "./instagram/C_Instagram";
import Image from "next/image";
import ImageGallery from "./ImageGalerry/ImageGallery";
import Vila from "./vila/room/Vila";
import GoogleRecaptcha from "@/utils/GoogleRecaptcha";
import EnableCookies from "@/utils/CookiesSet";
import { useState } from "react";
import MainLoading from "@/component/mainLoading/loading";

export default function Home() {

  // <GoogleRecaptcha />

//   <Script 
//   src="https://www.google.com/recaptcha/api.js?render=6LcEgaYqAAAAAJYATqo66A4IbJlgh6JyGwK2q2Vn" 
//   strategy="lazyOnload" 
// />

<Script src="https://www.google.com/recaptcha/api.js?render=6LcEgaYqAAAAAJYATqo66A4IbJlgh6JyGwK2q2Vn" />



  const videoUrl = "https://drive.google.com/uc?id=1UKD6FirpeHvgQc4gih94m-bTP1Y0TCYt&export=download";

  const [cookie, setCookie] = useState(true);

  const handleOffModalCookie = () => {
    setCookie(false)
  }
  
  const images = [
    "/assets/ImageNav/image1.png",
    "/assets/ImageNav/image2.png",
    "/assets/ImageNav/image3.png",
  ]; // Masukkan URL gambar Anda di sini

  // const imagesClosure = [
  //   "/assets/Image/borobudur.png",
  //   "/assets/Image/food.png",
  //   "/assets/Image/bike.png",
  // ]; // Masukkan URL gambar Anda di sini



  return (
    
    <main className='flex flex-col font-sans bg-white  dark:bg-black'>
        
        <EnableCookies active={cookie} closeModal={handleOffModalCookie}/>

        {/* <MainLoading /> */}

        <section className="relative w-full h-screen sm:h-full ">

          <div className="absolute w-full h-full flex-center flex-col gap-5 text-white">
              <h1 className="text-5xl"> A Harmonious Sanctuary in Nature </h1>
              <h3 className="text-2xl"> Experience tranquil charm of Adhisthana Villas</h3>
          </div>

          <video 
            autoPlay 
            muted 
            loop 
            preload="none" 
            className="w-full h-screen md2:h-full">
            <source src="/video/AdhisthanaHD.mp4" type="video/mp4" />
            <track
              src="/Adhisthana.mp4"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>

          {/* <video 
            autoPlay 
            muted 
            loop 
            controls 
            preload="metadata" 
            className="w-full h-screen object-cover">
            <source 
              src="https://darkslateblue-quetzal-444131.hostingersite.com/videos/Borobudur" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video> */}


        </section>

          
          
          <div className="max-width md:h-screen flex-center flex-col gap-8 px-4 text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]">
            
              <h1 className=" text-slate-600 w-full max-w-[60rem]">
                <span className="text-color2 font-semibold">Welcome to Adhisthana Villas</span> —where nature and tranquility converge in perfect harmony. Located near the iconic Borobudur temple, our retreat embodies a seamless blend of Javanese heritage and modern elegance, offering a sanctuary for those seeking solace and renewal. Set amidst lush rice fields and framed by mist-shrouded peaks, every corner of our villas invites you to unwind and reconnect with what truly matters. Whether it&apos;s the gentle rustle of leaves, the serene ambiance of your private pool, or the timeless beauty of traditional architecture, Adhisthana Villas promises a journey of balance, serenity, and timeless charm.
              </h1>

              <Link href="/about" className="">

                <button className="underline decoration-[#C0562F] text-color1 ">
                    Discover more
                </button>

              </Link>

          </div>



          {/* View Product */}

          <Vila InitialsVila={[]}/>



          <div className="md:h-screen flex-center flex-row gap-8 px-4 text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]">
                 
              
                <div className=" h-full p-8 w-1/2 max-w-[50rem] flex flex-col justify-center ">
                  
                  <ImageGallery images={images} />
                </div>
           

              <div className=" text-slate-600 w-1/2 max-w-[30rem] flex flex-col justify-center items-center  gap-10 text-right">
                
                <div className="flex flex-col gap-8 w-full max-w-[30rem] ">

                  <h1 className="text-color2 ">Moments of Serenity: A Visual Journey</h1>
                  <h2 className="text-slate-500 "> Explore the beauty of Central Java through our curated photo gallery, showcasing the tranquil rice paddies, winding rivers, and serene countryside paths that surround Adhisthana Villas. Capture the charm of local life as you immerse yourself in nature’s embrace. </h2>
                  
                </div>


              </div>
          </div>


          <div className=" md:h-screen flex-center flex-row gap-8 px-4 bg-color3 text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]">
                 
              <div className="grid grid-cols-3 gap-8 w-full max-w-[60rem]">

                  <Closure images={images[0]} title={'Cultural Excursions & Borobudur Visits'} describe={'Located near the iconic Borobudur temple, our villas provide easy access for those looking to explore this UNESCO World Heritage site. Dive deeper into the local culture with guided tours of nearby temples, villages, and traditional markets.'}/>
                  <Closure images={images[1]} title={'Local Flavors at Sukkha Café'} describe={'Indulge in a culinary experience at Sukkha Café, where you can enjoy thoughtfully crafted dishes in a serene setting. Our cafe offers a peaceful retreat to savor delicious local flavors while soaking in the tranquil atmosphere of Adhisthana Villas.'}/>
                  <Closure images={images[2]} title={'Peaceful Retreats in Nature'} describe={'With our proximity to local trails and rice paddies, explore the beauty of Central Java by foot or bike. Wander through paths bordered by verdant fields and rivers, or take a leisurely ride through the serene countryside, capturing the charm of local life.'}/>


              </div>

       


          </div>


          {/* Instagram */}
          <div className="mt-[8rem] mb-[8rem]  max-width flex flex-col justify-center items-center gap-8 font-[family-name:var(--font-geist-sans)] p-2">
        
            <InstagramProfile act={process.env.INSTAGRAM_ACCESS_TOKEN || ''} id={ Number(process.env.INSTAGRAM_USER_ID) || 0}/>

          </div>

      </main>

  );
}
