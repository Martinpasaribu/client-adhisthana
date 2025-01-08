
"use client"

import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { IoMdArrowDropdown, IoPeople, FaRegCalendarAlt, gift, discount,GrNext } from '@/style/icons';
import OffersItem from '../component/offersItem';
import { useRouter, useSearchParams } from "next/navigation";
import Bucket from '../component/bucket';
import { formatCheckInCheckOut, night } from '../component/formatDate';
import ButtonUpdate from '../component/buttonUpdate';
import CalendarMini from '../component/calendarMini';
import ModalPeople from '../component/modalPeople';
import { useAppSelector } from '@/lib/hooks/hooks';
import toast from 'react-hot-toast';
import { DeletedCart } from '../utils/deletedCart';
import { http } from '@/utils/http';


const images = [
    "/assets/ImageNav/image1.png",
    "/assets/ImageNav/image2.png",
    "/assets/ImageNav/image3.png",
    "/assets/ImageNav/image4.png",
  ];

const Layout = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
  
    // Ambil parameter checkin dan checkout
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const people: string | null = searchParams.get("people");
    
    const [validate, setValidate] = useState (true) 
  
    const [safecheckin, setSafecheckIn] = useState<Date | null>(
        checkin ? new Date(checkin) : null
        );
    const [safecheckout, setSafecheckOut] = useState<Date | null>(
      checkout ? new Date(checkout) : null
    );
    
    const [maxPeople, setMaxPeople] = useState<number>(() => {
      const initialPeople = Number(people);
      if (initialPeople <= 4 && initialPeople >= 0) {
        return initialPeople;
      } else if (initialPeople < 0) {
        return 2;
      }
      return 4;
    });
    
    useEffect(() => {
      // Validasi check-in tidak boleh >= check-out
      if (safecheckin && safecheckout && safecheckin >= safecheckout) {
        toast.error("Tanggal check-in harus kurang dari tanggal check-out.",{ position: "bottom-right", duration: 5000 });
        setValidate(false); // Reset jika tidak valid
      } else {
        setValidate(true)
      }
  
      // Validasi check-out tidak boleh <= check-in
      if (safecheckout && safecheckin && safecheckout <= safecheckin) {
        toast.error("Tanggal check-out harus lebih dari tanggal check-in.",{ position: "bottom-right", duration: 5000 });
        setValidate(false); // Reset jika tidak valid
      } else {
        setValidate(true)
      }
  
    }, [safecheckin, safecheckout]);
    
    
    const PushUpdate = () => {
      
  
      if(safecheckin && safecheckout && validate === true ) {
  
      
        router.push(
          `/booking/offers?checkin=${safecheckin?.toISOString()}&checkout=${safecheckout?.toISOString()}&people=${maxPeople}`
        );
        toast.success("Penawaran diperbaharui.",{ position: "top-right", duration: 5000 });
        
      }else {
        toast.error("Anda salah memasukan tanggal.",{ position: "bottom-right", duration: 5000 });
      }
    
    
    }
  
  
    // function Modal calendar mini
    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);
  
    // 
    const [isModalOpenPeople, setModalOpenPeople] = useState(false);
    const closeModalPeople = () => setModalOpenPeople(false);
    const openModalPeople = () => setModalOpenPeople(true);
  
  
  
      useEffect(() => {
          if (checkin) {
            setSafecheckIn(new Date(checkin)); // Konversi ke objek Date
          }
          if (checkout) {
            setSafecheckOut(new Date(checkout)); // Konversi ke objek Date
          }
      }, [checkin, checkout]);
  
        
  
      useEffect(() => {
  
        if (checkin && checkout) {
          // const formattedDates = formatCheckInCheckOut(safecheckin, safecheckout);
          console.log('hasil sementara',checkin);
        }
  
      }, [checkin, checkout]);
  

      useEffect(() => {
          const handleUnload = () => {
              // Kirim data ke server menggunakan navigator.sendBeacon
              const url = 'https://adhistahan-serve.vercel.app/api/v1/booking/remove-cart';
              navigator.sendBeacon(url);

              // Hapus localStorage
              localStorage.removeItem('cart_vila');
          };

          window.addEventListener("unload", handleUnload);

          return () => {
              window.removeEventListener("unload", handleUnload);
          };
      }, []);

    
      
  
  
  
    return (

        <div className=' flex-center flex-col py-[5rem] hp4:py-[8rem] relative '>
            
            {/* IMAGE VIEW */}
            <figure className='flex flex-col hp4:flex-row justify-center items-center hp4:p-5 w-full  max-h-[30rem] overflow-hidden'>
                
                <div className='w-full hp4:w-1/2 h-full max-h-[25rem] p-3'>
                      <Image alt='image1ffers' src={'/assets/Image/Family.png'} width={600} height={400} className='w-full max-h-[23.5rem] object-cover  rounded-xl'/>
                </div>
  
  
                <div className='w-full hp4:w-1/2 h-full'>
                      <div className='grid grid-cols-4 hp4:grid-cols-2 gap-2 hp4:gap-5 place-content-center p-2 h-full'>
  
                        { images.map((item, index) => (
  
                          <article key={index}  className='w-full h-full max-w-[25rem] hp4:max-h-[11rem] '>
  
                            <Image  alt={`ImageOffera ${index+1}`} src={item} width={400} height={400} className='w-full h-full object-cover rounded-xl'/>
  
                          </article>
                        ))}
  
                      </div>
                </div>
  
            </figure>
  

            {/* # Update Header  */}

            {/* Button Update */}
            <ButtonUpdate 
              checkin={safecheckin || null } 
              checkout={safecheckout || null } 
              OpenCalendarMini={openModal} 
              OpenModalPeople={openModalPeople} 
              peopleMax={maxPeople || 0}
              pushUpdate={PushUpdate}
              updateCheckIn={setSafecheckIn}
              updateCheckOut={setSafecheckOut}
            />
  
  
            {/* Edit Calendar */}
  
            <div className=''>
  
              <CalendarMini 
                checkIn={safecheckin || null } 
                checkOut={safecheckout || null} 
                isOpen={isModalOpen} 
                closeModal={closeModal}
                // changeIn={Date}
                // changeOut={Date}
              />       
            
            </div>
  
  
            <ModalPeople 
              isOpen={isModalOpenPeople} 
              closeModal={closeModalPeople} 
              peopleMax={maxPeople || 0} 
              setPeoples={setMaxPeople}
            />        

             {/* # Update Header  */}
  


  
  
            {/* Product Vilas */}
            <section className='flex w-full'>
  
              <div className='w-full max-w-[80rem] '>
  
                <OffersItem /> 
  
              </div>
  
              <div className='w-full max-w-[30rem] '>
  
                <Bucket checkin={safecheckin || null } checkout={safecheckout || null} />
  
              </div>
  
            </section>
                      
            
  
        </div>

    )
}

export default Layout