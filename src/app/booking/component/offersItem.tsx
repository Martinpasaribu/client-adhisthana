"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Size, bad, people } from '@/style/icons'
import ClouserImage from './clouserImage'
import { RoomModels } from '@/models/roomModels'
import SkeletonItemOffers from './skeletonItemOffers';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { setAddChart } from '@/lib/slice/bookingSlice';
import SelectButton from './selectButton';
import { http } from '@/utils/http';

interface OffersItemsProps {
      
}

const OffersItem = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();


     const [vila, setVila] = useState<RoomModels[]>([]);
     
    const chart = useAppSelector((state) => state.booking.stateChartRes);


     useEffect(() => {
      const fetchVila = async () => {
        try {
          const response = await fetch("/api/vila");
          const data = await response.json();
          setVila(data.data);
          console.log("Data fetched:", data.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
  
      fetchVila();
    }, []);

    const convertToRupiah = (number:any) => {
      return number.toLocaleString('id-ID', {

        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };
    
    const handleDetailRoom = (id:any) => {

      router.push(`/vila/${id}`);
  
    }

    const handleAddChart = (id:any) => {

      const cart_vila = vila.filter( index => ( index._id === id ))
      dispatch(setAddChart(cart_vila)); 

      // Kirim data ke server
      http.post(`/booking/add-to-cart`, 
          {   roomId: id,
              quantity: 1
            }, 
          { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => {
          console.log('Cart added to server successfully:', response.data);
      })
      .catch(error => {
          console.error('Failed to sync cart with server:', error.response?.data || error.message);
      });
    
      // console.log('data vila :', cart_vila)

    }

 
    
  return (
    <section className='w-full mt-4 md1:mt-10'>

    { vila && vila.length > 0 ? (

          <div>

            { vila.map((item, index) => (

              <div key={index} className='flex h-full max-w-[70rem] mx-[.5rem]  md1:mx-[1.8rem] justify-around items-center text-xl gap-2 md1:gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>

                  {/* Item */}

                  <div className='w-full flex flex-col space-y-6'>
                  
                    {/* Name Vila */}
                    <div className='text-left'>
                        <h1 className=' text-[16px]  md:text-xl md2:text-2xl font-bold text-color1'>
                          {item.name}
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

                          <div className='w-1/2 h-full flex flex-col items-end space-y-2 hp2:space-y-4'>
                            <h1 className='text-[13px] hp4:text-[17px] font-semibold'>Total price for 1 night</h1>
                            <div className='flex justify-end hp1:justify-center items-end flex-col-reverse hp1:flex-row gap-2 p-1'>
                              <p className='bg-red-100 text-red-900 px-1 text-[9px] hp4:text-[12px] font-bold rounded-3xl'>20% OFF</p>
                              <p className='line-through font-semibold text-[15px] hp4:text-[17px]'>IDR {convertToRupiah(item.price)}</p>
                            </div>
                            <h1 className='font-bold text-[18px] hp4:text-[21px]'>IDR {convertToRupiah(item.price)}</h1>
                            <p className=' text-[12px] hp4:text-[15px]'>Includes taxes & fees</p>

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
                        
                    <SelectButton item={ item._id || ''} handleAddChart={handleAddChart} chart={chart} />
                   
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


                      {/* { chart && chart.map(( chart , index) => (

                          <div key={index}>
                            
                            { item._id != chart.data[0]._id ? (


                            <div className='w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4'>
                              <button onClick={()=> { handleAddChart (item._id)}} className='px-4 hp3:px-6 py-1 bg-color1 text-white font-semibold'>
                                <h1>Select</h1>
                              </button>
                            </div>

                            ) : (

                              
                            <div className="max-w-xs mx-auto">
                              
                              <div className="relative flex items-center">
                                  <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                      <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                      </svg>
                                  </button>
                                  <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                      <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                          <path stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                      </svg>
                                  </button>
                              </div>
                            </div>

                          )
                            
                          
                          } 
                          </div>

                        ))

                      } */}

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
          </div>

        )
    }

    </section>
  )
}

export default OffersItem