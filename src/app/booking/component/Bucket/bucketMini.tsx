import { FaRegCalendarAlt, IoPeople, FaBasketShopping } from '@/style/icons';
import React, { useEffect, useState } from 'react'
import { formatCheckInCheckOut, night } from '../formatDate';
import {  useAppSelector , useAppDispatch} from "@/lib/hooks/hooks";
import { setGetChart } from '@/lib/slice/bookingSlice';
import { RoomModels } from '@/models/roomModels';
import { BucketModels } from '../../models';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DeletedCart } from '../../utils/deletedCart';
import toast from 'react-hot-toast';
import { http } from '@/utils/http';

interface BucketProps {
    checkin? :  Date | null;
    checkout? : Date | null;
    activeBucket: (activeBucket: boolean) => void;
}

const BucketMini = ( {checkin, checkout, activeBucket} : BucketProps) => {

  const [ nights, setNight ] = useState<number | 0>();
  const [ priceTotal, setPriceTotal] = useState<number | 0>();
//   const [ activeBucket, setActiveBucket] = useState(false);
  const [ activeList, setActiveList] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter()
  
  //   const [chart, setChart] = useState<BucketModels[]>()
  
  const chart = useAppSelector((state) => state.booking.stateChartRes);
  const isProcessing = useAppSelector((state) => state.booking.isProcessing);

  useEffect(() => {

    if(checkin && checkout){

        const nightDuration = Math.ceil(

            (checkout.getTime() - checkin.getTime()) / (1000 * 3600 * 24)
            
          );

          setNight(nightDuration);
    }

  },[checkin , checkout])


  const HandleList = () => {

    setActiveList(!activeList)

  }

  
  useEffect(()=> {

      dispatch(setGetChart())


  },[dispatch])

  

      useEffect(() => {

        if(chart.length > 0){

            const totalPrice = chart.reduce((total, item) => {
                return total + item?.data[0]?.price * item.quantity;
            }, 0);
            setPriceTotal(totalPrice)
            activeBucket(true)
            console.log('active')
        }else {
            activeBucket(false)
            console.log('no active')
        }

      },[chart])

  const handleSetParams = () => {

    if (isProcessing) return;

    if(checkin && checkout){

        const param = {
            checkin : checkin,
            checkout : checkout
        }

        if(param){
            router.push('/checkout')
        }

        localStorage.setItem('Params', JSON.stringify(param));
    }

  }
  




  
  return (

    <div className='w-full xl2:mt-8 '>
        
        
        <div className=' flex flex-col h-full  mx-[.5rem]  md1:mx-[1.8rem] justify-around items-center text-xl gap-2 md1:gap-2 m-2 p-3 border-[1px] shadow-md rounded-xl'>
            

            {/* Top Bucket */}

            <div className={`${activeList === true ? 'w-full flex flex-col gap-2 animate-bucket':'hidden'} `}>
                <div className='text-xl font-semibold w-full  flex justify-around  text-center  py-1'> 
                    <div className='max-w-[5rem] p-2  bg-color2 text-white rounded-md'>
                        <FaBasketShopping size={25} className='h-7 w-7 hp3:h-10 hp3:w-10'/>
                    </div>
                    <div className='w-full flex flex-row-reverse justify-start items-center gap-4'>

                        <FaRegCalendarAlt size={20} />

                        <h1 className='text-[13px] hp3:text-[16px]'>
                        {checkin && checkout
                        ? formatCheckInCheckOut(checkin, checkout, false, night) 
                        : "Select check-in and check-out dates"}
                        </h1>


                        {/* <IoPeople size={20} /> */}
                    </div>
                </div>


                {chart && chart.length > 0 ? (

                    
                chart.map(( item , index) => (
                
                    <div key={index} className='w-full'>
                    
                            <div className='w-full'>  

                                <h1 className='text-sm hp3:text-lg font-semibold text-left w-full'>  {item.data[0]?.name || "No Name"} </h1>

                                <div className='flex justify-between items-center w-full gap-4'>

                                    <div className='flex text-[12px] hp3:text-sm w-full gap-3 font-normal'>
                                        <h1>
                                            {item.quantity} Rooms
                                        </h1>
                                        <h1>
                                            X
                                        </h1>
                                        <div>
                                            { nights && nights > 0 ? (

                                                <h1> {nights} </h1>
                                                ) : (
                                                <h1> {nights} </h1>
                                                )

                                            }
                                        </div>

                                        <div>
                                            Nights
                                        </div>
                                        
                                    </div>

                                    <div className='flex gap-2 text-[14px] hp3:text-[17px] font-semibold'>
                                        <h1>IDR</h1>
                                        <h1>{item.data[0]?.price || "No price"}</h1>
                                    </div>

                                </div>


                            </div>

                    </div>
                    ))

                ) : (
                
                <p>No choice items</p>

                )}

            <hr className=" top-0 left-0 z-40 h-0 w-full  border-b border-solid border-gray-300"/>
            
            </div>

            
            <div onClick={HandleList} className='w-full py-2 flex-center cursor-pointer'>
                <div className='h-2  w-full max-w-[4rem] bg-gray-400 rounded-md'></div>
            </div> 

            {/* Bottom Bucket */}

            <div className='w-full flex flex-col gap-2'>
                <div className='flex justify-between items-center font-bold w-full text-[15px] hp3:text-[20px]'>
                    <h1>Total</h1>
                    <div className='flex gap-2  '>
                        <h1>IDR</h1>
                        {/* <h1>{ priceTotal && priceTotal ? priceTotal : 0  }</h1> */}
                        <h1>{priceTotal ?? 0}</h1>

                    </div>
                </div>

                <div className='flex gap-2 justify-between  text-[12px] hp3:text-[15px]  font-semibold items-center  w-full'>
                    <button className='w-full border-[1px] border-color1 text-color1 rounded-md'>
                        <h1> Chart </h1>
                    </button>
                    
                
                    <button
                        onClick={handleSetParams}
                        className={`w-full rounded-md ${
                        isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-color1 text-white'
                        }`}
                        disabled={isProcessing}
                    >
                        <h1> Book Now </h1>
                    </button>
            

                </div>
            </div>

        </div>
    


    </div>

  )
}

export default BucketMini