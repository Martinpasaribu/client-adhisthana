import { discount, FaRegCalendarAlt, gift, GrNext, IoMdArrowDropdown, IoPeople } from '@/style/icons'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatCheckInCheckOut, night } from '../constant/formatDate'
import { useAppSelector } from '@/lib/hooks/hooks';
import SkeletonItemDate from '../Skeleton/skeletonItemDate';

interface ButtonProps {

    checkin?: Date | null;
    checkout?: Date | null;
    peopleMax?: number;
    OpenCalendarMini: () => void;
    OpenModalPeople: () => void;
    pushUpdate:() => void;
    updateCheckIn:(checkIn: Date | null) => void;
    updateCheckOut:(checkOut: Date | null) => void;
  
}

const ButtonUpdate = ( { checkin, checkout, OpenCalendarMini, OpenModalPeople, pushUpdate, peopleMax,updateCheckIn, updateCheckOut} : ButtonProps ) => {
    
    
    const [checkIn, setCheckInDay] = useState<Date | null>(null);
    const [checkOut, setCheckOutDay] = useState<Date | null>(null);
  
    const dateIn = useAppSelector((state) => state.booking.stateCheckIn);
    const dateOut = useAppSelector((state) => state.booking.stateCheckOut);



  // Sinkronisasi props ke local state
  useEffect(() => {
    if (checkin) {
      setCheckInDay(new Date(checkin));
    }
    if (checkout) {
      setCheckOutDay(new Date(checkout));
    }
  }, [checkin, checkout]);

  // Sinkronisasi Redux state ke local state
  useEffect(() => {
    if (dateIn) {
      setCheckInDay(new Date(dateIn));
      updateCheckIn(new Date(dateIn));
    }
    if (dateOut) {
      setCheckOutDay(new Date(dateOut));
      updateCheckOut(new Date(dateOut));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateIn, dateOut]);

    return (
    <section className='w-full flex-center flex-col md2:flex-row gap-4 md2:gap-1 mt-4'>
          
        <div className='flex h-full w-full   mx-[0.5rem] md1:mx-[1.8rem] justify-around items-center text-[10px] hp4:text-[14px]  md1:text-[16px] gap-2 md1:gap-5 m-1 p-3 border-[1px] shadow-md rounded-xl'>


        { checkIn && checkOut  ? (

          // Date
          <div onClick={OpenCalendarMini} className='cursor-pointer flex-center gap-3'>
          
              <FaRegCalendarAlt size={20} />
              <h1>
                  {checkIn && checkOut
                  ?  formatCheckInCheckOut(checkIn, checkOut, true, night)

                  : "Select check-in and check-out dates"}
              </h1>

              <IoMdArrowDropdown size={20} className='hidden hp4:flex'/>

          </div>

          ) :  (

            <div className='space-y-10'>

                <SkeletonItemDate/>

            </div>

          )
        }
      

        {/* People */}
        <div onClick={OpenModalPeople} className='flex-center gap-3 cursor-pointer'>
            <IoPeople size={20} />
            <h1 className='flex-center gap-2'> {peopleMax} <span className='hidden hp4:flex'>Adults</span> </h1>
            <IoMdArrowDropdown  size={20} className='hidden hp4:flex'/>
        </div>

        {/* Update */}

        <button onClick={pushUpdate} className='px-5 py-2 bg-color1 text-white rounded-xl'>
            <h1>Update</h1>
        </button>

        </div>

        <div className='w-full border-[1px] shadow-md rounded-xl  hp4:max-w-[25rem]  xl2:max-w-[30rem] flex justify-between hp4:justify-center items-center gap-5 px-2 hp4:p-2 md2:p-1 xl2:gap-5'>

            <div className='flex-center gap-2'>
                <div className='p-3 rounded-full hp4:bg-green-200'>
                    <Image src={gift} alt={'gift'} className='hidden hp4:block w-5 h-5 md1:w-7 md1:h-7 object-contain'/>
                    <Image src={discount} alt={'discount'} className='block hp4:hidden w-7 h-7 md1:w-8 md1:h-8 object-contain'/>
                </div>
                <div className='text-sm font-semibold hp4:text-lg'>
                <h1>
                    2 Special Offers Available
                </h1>
                </div>
            </div>    
            
            <div>
                <GrNext size={20} />
            </div>
        </div>

    </section>
  )
}

export default ButtonUpdate