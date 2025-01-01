import React from 'react'
import Closure from '../clouser/clouser'
import Image from 'next/image'
import { AirIcons, TreeIcons, WayangIcons } from '@/style/icons'



const Layout = () => {
  return (
    <div className='flex flex-col overflow-hidden font-sans bg-white  dark:bg-black'>
        

        <div className="relative w-full h-screen bg-about_bg  bg-no-repeat bg-cover   ">
             
             <div className="absolute w-full h-full p-10 z-30 text-slate-600 flex justify-end  items-end   text-right">
                
                <div className="flex flex-col gap-8 w-full max-w-[60rem] p-10 ">
    
                  <h1 className="text-white text-md md:text-2xl tracking-wide">A Serene Escape in the Heart of Nature</h1>
                  <h2 className="text-slate-200 text-md">Where Javanese heritage meets modern tranquility, offering an unparalleled retreat near Borobudur.</h2>
                  
                </div>
    
    
              </div>
    
          </div>
 

      
      
        <div className=" md:h-screen flex-center flex-row gap-8  text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]">
             
   
             <div className=" text-slate-600 w-1/2 flex flex-col justify-center items-center  gap-10 text-left">
               
               <div className="flex flex-col gap-8 w-full max-w-[30rem] ">
   
                 <h1 className="text-color2 ">Experience Adhisthana Villas</h1>
                 <h2 className="text-slate-500 ">Adhisthana Villas offers a harmonious blend of nature, heritage, and luxury. Set amidst lush rice paddies and mountains, our villas provide the perfect escape for travelers seeking serenity and sophistication. Rooted in Javanese tradition, yet enhanced with modern comforts, every villa is designed to connect you with the surrounding landscape. </h2>
                 
               </div>
   
   
             </div>

             <div className="underline decoration-[#C0562F] text-color1 h-full w-1/2">
               
                 <Image
                   src='/assets/Image/someone.png'
                   alt='image sementara'
                   width={800}
                   height={800}
                   className="w-full h-full object-cover "
                 />
               
             </div>
   
   
         </div>
   


         <div className="relative w-full h-screen bg-sepeda_bg  bg-no-repeat bg-cover bg-center  ">
             
   

            <div className='absolute z-20 w-full h-full backdrop-blur-xs bg-gradient-to-r from-gray-800 '>

            </div>


            <div className="absolute w-1/2 z-30 text-slate-600  h-full flex justify-center  items-center   text-left">
               
               <div className="flex flex-col gap-8 w-full max-w-[30rem] mt-10 ">
   
                 <h1 className="text-white text-xl font-normal tracking-wide">Rooted in Harmony with Nature</h1>
                 <h2 className="text-slate-200 text-md tracking-wide font-normal">At Adhisthana Villas, we believe in creating spaces that resonate with nature. Every element of our design honors the rich cultural heritage of Java while embracing the beauty of our surroundings. Our commitment is to provide a tranquil and luxurious retreat for our guests, where relaxation and nature blend seamlessly.</h2>
                 
               </div>
   
   
             </div>
   
         </div>



      <div className="max-width md:h-screen flex-center flex-col gap-8 px-4 text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]">
        
        <div className='w-full max-w-[90rem] grid grid-cols-3 gap-10'>

          <div className='flex flex-col justify-center items-center gap-10 p-4'>

            <h1>Sustainability</h1>

            <div className="underline decoration-[#C0562F] text-color1 h-22 w-22">
               
               <Image
                 src={TreeIcons}
                 alt='image sementara'
                 width={800}
                 height={800}
                 className="w-full h-full object-cover "
               />
             
            </div>

            <h3 className='text-sm'>
              We prioritize eco-friendly practices to minimize our environmental impact.
            </h3>

          </div>

          <div className='flex flex-col justify-center items-center gap-10 p-4'>

            <h1>Cultural Respect</h1>

            <div className="underline decoration-[#C0562F] text-color1 h-22 w-22">
               
               <Image
                 src={WayangIcons}
                 alt='image sementara'
                 width={800}
                 height={800}
                 className="w-full h-full object-cover "
               />
             
            </div>

            <h3 className='text-sm'>
              Our villas honor the legacy of Javanese heritage, from architecture to local community support.
            </h3>

          </div>

          <div className='flex flex-col justify-center items-center gap-10 p-4'>

            <h1>Serenity</h1>

            <div className="underline decoration-[#C0562F] text-color1 h-22 w-22">
               
               <Image
                 src={AirIcons}
                 alt='image sementara'
                 width={800}
                 height={800}
                 className="w-full h-full object-cover "
               />
             
            </div>

            <h3 className='text-sm'>
              We offer a peaceful sanctuary where guests can unwind and reconnect with nature.
            </h3>

          </div>

        </div>

      </div>



          <div className="relative w-full h-screen bg-room_bg  bg-no-repeat bg-cover bg-center  ">
             
   

             <div className='absolute z-20 w-full h-full backdrop-blur-xs bg-gradient-to-b from-white '>
 
             </div>
 
 
             <div className="absolute w-full h-1/2 z-30 text-slate-600 flex justify-center  items-center   text-left">
                
                <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[30rem] mt-10 ">
    
                  <h1 className="text-color2 text-md md:text-3xl font-normal tracking-wide ">Plan Your Peaceful Escape Today</h1>

                  <button className='bg-color1 px-8 py-2 text-white'>
                    <h1>Explore Our Villas</h1>
                  </button>
                  
                </div>
    
    
              </div>
    
          </div>



  </div>
  )
}

export default Layout