import { FaRegCalendarAlt, IoPeople, FaBasketShopping } from '@/style/icons';
import React, { useEffect, useState } from 'react'
import { formatCheckInCheckOut, night } from './formatDate';
import {  useAppSelector , useAppDispatch} from "@/lib/hooks/hooks";
import { setGetChart } from '@/lib/slice/bookingSlice';
import { RoomModels } from '@/models/roomModels';
import { BucketModels } from '../models';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DeletedCart } from '../utils/deletedCart';
import toast from 'react-hot-toast';
import { http } from '@/utils/http';

interface BucketProps {
    checkin? :  Date | null;
    checkout? : Date | null;
}

const Bucket = ( {checkin, checkout} : BucketProps) => {

  const [ nights, setNight ] = useState<number | 0>();
  const [ priceTotal, setPriceTotal] = useState<number | 0>();
  
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


  useEffect(()=> {

      dispatch(setGetChart())


  },[dispatch])

  
//   useEffect(() => {

//     const getPriceTot = async () => {
    
//         await http.get(`/booking/get-total-price`, {
//             headers: { 'Content-Type': 'application/json' },
//         })
//         .then(response => {
//             console.log('Price total successfully:', response.data);
//             setPriceTotal(response.data.totalPrice)
//         })
//         .catch(error => {
//             console.error('Failed to Price total with server:', error.response?.data || error.message);
//         });

//     }

//     getPriceTot()

//   },[])

      useEffect(() => {

        if(chart){

            const totalPrice = chart.reduce((total, item) => {
                return total + item?.data[0]?.price * item.quantity;
            }, 0);
            setPriceTotal(totalPrice)
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
  
//   // Menghapus local Storage Jika Window di close atau refesh
//       useEffect(() => {
//         const handleVisibilityChange = () => {
//           if (document.visibilityState === "hidden") {
//             localStorage.removeItem('cart_vila');
//           }
//         };
      
//         document.addEventListener("visibilitychange", handleVisibilityChange);
      
//         return () => {
//           document.removeEventListener("visibilitychange", handleVisibilityChange);
//         };
//       }, []);



  
  return (

    <div className='w-full  mt-4 md1:mt-10 sticky top-28 z-20 py-4'>
        
        
        <div className='flex flex-col h-full max-w-[70rem] mx-[.5rem]  md1:mx-[1.8rem] justify-around items-center text-xl gap-2 md1:gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>
            
            <div className='text-xl font-semibold w-full  flex justify-around  text-center  py-1'> 
                <div className='max-w-[5rem] p-2  bg-color2 text-white rounded-md'>
                    <FaBasketShopping size={30}/>
                </div>
                <div className='w-full flex flex-row-reverse justify-start items-center gap-4'>

                    <FaRegCalendarAlt size={20} />

                    <h1 className='text-[16px]'>
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

                            <h1 className='text-lg font-semibold text-left w-full'>  {item.data[0]?.name || "No Name"} </h1>

                            <div className='flex justify-between items-center w-full gap-4'>

                                <div className='flex text-sm w-full gap-3 font-normal'>
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

                                <div className='flex gap-2 text-[17px] font-semibold'>
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
            


            <div className='flex justify-between items-center font-bold w-full'>
                <h1>Total</h1>
                <div className='flex gap-2 text-[20px] '>
                    <h1>IDR</h1>
                    {/* <h1>{ priceTotal && priceTotal ? priceTotal : 0  }</h1> */}
                    <h1>{priceTotal ?? 0}</h1>

                </div>
            </div>

            <div className='flex gap-2 justify-between text-[15px] font-semibold items-center  w-full'>
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

  )
}

export default Bucket