"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { Size, bad, people } from '@/style/icons'

import { RoomModels, UnAvailableRoomModels } from '@/models/roomModels'

import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { setAddChart, setIsProcessing } from '@/lib/slice/bookingSlice';
import debounce from 'lodash-es/debounce';
import { http, UrlMain } from '@/utils/http';
import ClouserImage from '../constant/clouserImage';
import SelectButton from './selectButton';
import SkeletonItemOffers from '../Skeleton/skeletonItemOffers';
import toast from 'react-hot-toast';
import SkeletonRoomsFull from '../Skeleton/skeletonItemRoomFull';
import MainLoading from '@/component/mainLoading/loading';
import { formatCheckInCheckOut, FormatNight, night } from '../constant/formatDate';
import { setRoomUnAvailable } from '@/lib/slice/roomSlice';

interface Params {
  checkin? :  Date | null;
  checkout? : Date | null;
}

const OffersItem = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [isRoomsFull, setIsRoomsFull] = useState(false);
    const [load, setLoad] = useState(false);
    const dispatch = useAppDispatch();

    const [safecheckin, setSafecheckIn] = useState<Date | null>( );

    const [safecheckout, setSafecheckOut] = useState<Date | null>(

     );
    const [vila, setVila] = useState<RoomModels[]>([]);
    const [unVila, setUnVila] = useState<RoomModels[]>([]);
     
    const chart = useAppSelector((state) => state.booking.stateChartRes);

    useEffect(() => {
      
      const datePar = JSON.parse(localStorage.getItem('Params') ?? '{}') || {};
    
      // const setCheckin = datePar.checkin ? new Date(datePar.checkin).toISOString() : null;
      // const setCheckout = datePar.checkout ? new Date(datePar.checkout).toISOString() : null;
    
      const setCheckin = searchParams.get("checkin");
      const setCheckout = searchParams.get("checkout");
      setSafecheckIn(setCheckin ? new Date(setCheckin) : null)
      setSafecheckOut(setCheckout ? new Date(setCheckout) : null)
      
      const fetchVila = async () => {

        setLoad(true);

        try {

            // Jaga Jaga Kalo ada erorr pada saat Menghapus  session dan localstorage
            const url = `${UrlMain}/session/remove-cart-in-session`;
            navigator.sendBeacon(url);

            // Hapus localStorage
            localStorage.removeItem('cart_vila');
            localStorage.removeItem('Params');
            localStorage.removeItem('Night');


          const response = await fetch("/api/updateVila", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkIn: setCheckin,
              checkOut: setCheckout,
            }),
          });
    
          if (!response.ok) {
            const errorResponse = await response.json();
            const setError = errorResponse.error

            throw new Error(setError || "Server returned an error");
          }

          const data = await response.json();

              if(data.data.length > 0){

                setVila(data.data);
                setIsRoomsFull(false); 
                setUnVila(data.dataUnAvailable)
                dispatch(setRoomUnAvailable(data.dataUnAvailable)); 

              } else {
                setVila([]);
                setIsRoomsFull(true); 
                dispatch(setRoomUnAvailable(data.dataUnAvailable)); 
                toast.success("Rooms Full", {
                  position: "bottom-right",
                  duration: 4000,
                  iconTheme: { primary: "#C0562F", secondary: "#fff" },
                  icon: "🛒",
                  style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
                });

              }

          console.log("Data fetched:", data.data);
          

        } catch (error : any) {
          


          console.log("error update available room : ", error.message);


          toast.error( error.message , { position: "bottom-right", duration: 5000 });
          
        } finally {
          setLoad(false);
        }
        
      };
    
      fetchVila();
    }, [searchParams, dispatch]);
    

    const convertToRupiah = (number:any) => {
      return number.toLocaleString('id-ID', {

        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };
    
    const handleDetailRoom = (id:any) => {

      router.push(`/vila/${id}`);
  
    }

    const handleAddChart = debounce( async (id:any) => {


      const cart_vila = vila.filter( index => ( index._id === id ))
      

      dispatch(setIsProcessing(true));
      dispatch(setAddChart(cart_vila)); 


      
      // Kirim data ke server
      http.post(`/session/add-to-cart`, 
          {   roomId: id,
              quantity: 1
            }, 
          { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
          // console.log('Cart added to server successfully:', response.data);
          
          toast.success("Add Rooms", {
            position: "bottom-right",
            duration: 1000,
            iconTheme: { primary: "#C0562F", secondary: "#fff" },
            icon: "🛒",
            style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
          });

          
        })

      .catch(error => {
          console.error('Failed to sync cart with server:', error.response?.data || error.message);
          
          toast.error(error.response.data.message || error.message || 'server error', {
            position: "bottom-right",
            duration: 5000,
            iconTheme: { primary: "#ff0000", secondary: "#fff" },
            icon: "⚠️",
            style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
          });

        }).finally(() => {
        dispatch(setIsProcessing(false)); 

      });
    
      // console.log('data vila :', cart_vila)

    }, 700)


    if (isRoomsFull ) {
      return <SkeletonRoomsFull RoomUnAvailable={unVila }/>;
    }
    
  return (
    <section className='w-full mt-4 md1:mt-10'>
    
    { load && (<MainLoading/>)}

    { unVila && unVila.length > 0 ? ( 

        <div>

          { unVila.map((item, index) => (

            <div key={index} className=' flex h-full mx-[.5rem] md1:mx-[1.8rem] justify-around items-center text-xl gap-2 md1:gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>

                {/* Item */}

                <div className=' w-full flex flex-col space-y-6 '>
                

                  {/* Name Vila */}
                  <div className='relative text-left '>

                    <div className='corner-ribbon absolute top-1 -right-6 bg-slate-800 rounded-md text-white'>FULL</div>

                      <h1 className=' text-[16px]  md:text-xl md2:text-2xl font-bold text-color1'>
                        {item.nameAdditional}
                      </h1>
                  </div>

                  <div className='flex flex-col hp4:flex-row gap-5'> 

                    {/* Left */}

                    <div className='flex flex-col gap-4 w-full h-full hp4:max-w-[18rem] md1:max-w-[22rem]'>
                    
                        <div className='w-full h-full'>
                            <ClouserImage images={ item.image } />
                          </div>

                        <figure className='w-full flex justify-center hp4:justify-start'>

                          <ul className='flex gap-4 text-[15px] text-slate-600 font-semibold'>
                            <li className='flex-center gap-3'>
                           
                              <p></p>
                            </li>
                            <li className='flex-center gap-3'>
                              <p></p>

                            </li>
                            <li className='flex-center gap-3'>
                              <p> </p>

                            </li>
                          </ul>

                        </figure>

                        <button onClick={ () => { handleDetailRoom(item._id) }} className='text-slate-600 m-4'>
                          <h1 className='text-[14px] hp1:text-[17px] font-semibold'> Rooms Detail </h1>
                        </button>
                    </div>

                    {/* Right */}   

                    <div className=' w-full flex flex-col justify-between text-slate-600'>


                      <div className='w-full flex justify-between items-start p-2 md1:p-4'>
                        
                        <div className='w-1/2 h-full flex flex-col  items-start space-y-2 hp2:space-y-4'>

                          <div className='space-y-2'>
                            <h1 className=' text-[14px] hp4:text-[17px] font-semibold'> Basic Deal </h1>
                            <ul className='flex flex-wrap text-[11px] hp4:text-sm gap-2 hp2:gap-4'>
                              <li className='flex-center gap-2'>
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                                <h1>
                                  Without Breakfast
                                </h1>
                              </li>
                              <li className='flex-center gap-2'>
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                                <h1>
                                  Without Breakfast
                                </h1>
                              </li>                    
                              <li className='flex-center gap-2'>
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                                <h1>
                                  Without Breakfast
                                </h1>
                              </li>
                            </ul>
                          </div>


                          <div className='space-y-2'>
                            <h1 className='text-[12px] hp4:text-[17px] font-semibold'> Payment Option </h1>
                            <ul className='flex flex-wrap text-[11px] hp4:text-sm gap-4'>
                              <li className='flex-center gap-2'>
                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                                <h1>
                                  Pay now
                                </h1>
                              </li>
                            </ul>
                          </div>

                        </div>

                        <div className='w-1/2 h-full flex flex-col justify-start space-y-2 hp2:space-y-4'>

                          <h1 className='text-[13px] hp4:text-[17px] font-semibold text-right'>Basic price for 1 night                 
                          
                          </h1>

                          <div className='flex justify-end hp1:justify-end items-end flex-col-reverse hp1:flex-row gap-2 w-full'>
                            <p className='bg-red-100 text-red-900 px-1 text-[9px] hp4:text-[12px] font-bold rounded-3xl'> &#62;10% OFF</p>
                            <p className='line-through font-semibold text-[15px] hp4:text-[17px]'>IDR {convertToRupiah(item.price)}</p>
                          </div>

                          <div className='h-10 '>

                          </div>


                        </div>

                      </div>


                    {/*               
                          <div className='w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4'>
                              <button onClick={()=> { handleAddChart (item._id)}} className='px-4 hp3:px-6 py-1 bg-color1 text-white font-semibold'>
                                <h1>Select</h1>
                              </button>
                            </div>
                  */}



                    
                    <div className='select-none'>
                      <div className='w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4'>
                          <button  className='px-4 hp3:px-6 py-1 bg-gray-300 text-white font-semibold'>
                          <h1>Select</h1>
                          </button>
                      </div>
                    </div>
       


                    

                    </div>

                  </div>

                </div>


            </div>

          ))}

        </div>


        ) : ( 

        <div className='space-y-10'>

        </div>
        )
    }


    { vila && vila.length > 0 ? (

          <div className='space-y-4 md:space-y-8'>

            { vila.map((item, index) => (

              <div key={index} className='flex h-full mx-[.5rem] md1:mx-[1.8rem] justify-around items-center text-xl gap-2 md1:gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>

                  {/* Item */}

                  <div className='w-full flex flex-col space-y-6 '>
                  
                    {/* Name Vila */}
                    <div className='text-left'>
                        <h1 className=' text-[16px]  md:text-xl md2:text-2xl font-bold text-color1'>
                          {item.nameAdditional}
                        </h1>
                    </div>

                    <div className='flex flex-col hp4:flex-row gap-5'> 

                      {/* Left */}
                      <div className='flex flex-col gap-4 w-full h-full hp4:max-w-[18rem] md1:max-w-[22rem]'>

                          <div className='w-full h-full'>
                            <ClouserImage images={ item.image } />
                          </div>

                          <figure className='w-full flex justify-center hp4:justify-start'>

                            <ul className='flex gap-4 text-[15px] text-color1 font-semibold'>
                              <li className='flex-center gap-3'>
                                <Image src={people} alt='sizeIcons' sizes='10' width={100} height={100} className='w-5 h-5'  />
                                <p> {item.maxCapacity }</p>
                              </li>
                              <li className='flex-center gap-3'>
                                <Image src={Size} alt='sizeIcons' sizes='10' width={100} height={100} className='w-5 h-5'  />
                                <p> {item.size }</p>

                              </li>
                              <li className='flex-center gap-3'>
                                <Image src={bad} alt='sizeIcons' sizes='10' width={100} height={100} className='w-5 h-5'  />
                                <p> {item.bedType }</p>

                              </li>
                            </ul>

                          </figure>

                          <button onClick={ () => { handleDetailRoom(item._id) }} className='text-color1 m-4'>
                            <h1 className='text-[14px] hp1:text-[17px] font-semibold'> Rooms Detail </h1>
                          </button>
                      </div>

                      {/* Right */}
                      <div className='w-full flex flex-col justify-between '>
                        
                        <div className='w-full flex justify-between items-start p-2 md1:p-4'>
                          
                          {/* Left */}
                          <div className='w-1/2 h-full flex flex-col  items-start space-y-2 hp2:space-y-4'>

                            <div className='space-y-2'>
                              <h1 className=' text-[14px] hp4:text-[17px] font-semibold'> Basic Deal </h1>
                              <ul className='flex flex-wrap text-[11px] hp4:text-sm gap-2 hp2:gap-4'>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Private swimming area
                                  </h1>
                                </li>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Sitting area
                                  </h1>
                                </li>                    
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Personal refigerator
                                  </h1>
                                </li>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    King sized bed
                                  </h1>
                                </li>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Coffee maker
                                  </h1>
                                </li>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Bathtub
                                  </h1>
                                </li>
                              </ul>
                            </div>


                            <div className='space-y-2'>
                              <h1 className='text-[12px] hp4:text-[17px] font-semibold'> Payment Option </h1>
                              <ul className='flex flex-wrap text-[11px] hp4:text-sm gap-4'>
                                <li className='flex-center gap-2'>
                                  <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                  </svg>
                                  <h1>
                                    Pay now
                                  </h1>
                                </li>
                              </ul>
                            </div>

                          </div>

                          <div className='w-1/2 h-full flex flex-col items-end space-y-2 hp2:space-y-4'>
                            
                            <h1 className='text-[13px] hp4:text-[17px] font-semibold'>Basic price for 1 night                 
           
                            </h1>

                            <div className='flex justify-end hp1:justify-end items-end flex-col-reverse hp1:flex-row gap-2 w-full'>
                              <p className='bg-red-100 text-red-900 px-1 text-[9px] hp4:text-[12px] font-bold rounded-3xl'> &#62;10% OFF</p>
                              <p className='line-through font-semibold text-[15px] hp4:text-[17px] text-slate-500'>IDR {convertToRupiah(item.price)}</p>
                            </div>

                            <h1 className='text-[13px] hp4:text-[17px] font-semibold pt-4'>Total price for                   
                              <span className='mx-2'>
                                {safecheckin && safecheckout
                                
                                ?  FormatNight(safecheckin, safecheckout)
              
                                : " 0 "} 
                              </span>
                                              
                             night
                             
                            </h1>
                            


                            <h1 className='font-bold text-[18px] hp4:text-[21px]'>IDR {convertToRupiah(item.priceDateList)}</h1>
                            <p className=' text-[12px] hp4:text-[15px] text-slate-600 font-normal'>Includes taxes & fees</p>

                          </div>

                        </div>


                      {/*               
                            <div className='w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4'>
                                <button onClick={()=> { handleAddChart (item._id)}} className='px-4 hp3:px-6 py-1 bg-color1 text-white font-semibold'>
                                  <h1>Select</h1>
                                </button>
                              </div>
                    */}


                  { vila.length > 0 && chart && chart.length > 0 ? (
                        
                    <SelectButton item={ item._id || ''} handleAddChart={handleAddChart} chart={chart} name={item.name}/>
                   
                    ) : (
                      
                      <div className='select-none'>
                        <div className='w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4'>
                            <button onClick={()=> { handleAddChart (item._id)}} className='px-4 hp3:px-6 py-1 bg-color1 text-white font-semibold'>
                            <h1>Select</h1>
                            </button>
                        </div>
                      </div>
                    ) 
                       
                     }


                      

                      </div>

                    </div>

                  </div>


              </div>

            ))}

          </div>
        ) : (

          <div className='space-y-10'>
              <SkeletonItemOffers />
              <SkeletonItemOffers />
              <SkeletonItemOffers />
          </div>

        )
    }




    </section>
  )
}

export default OffersItem