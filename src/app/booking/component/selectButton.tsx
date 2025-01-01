"use client"

import { RoomModels } from '@/models/roomModels'
import React, { useEffect, useState } from 'react'
import { BucketModels } from '../models';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { setAddChart, setAddVila, setRemoveVila } from '@/lib/slice/bookingSlice';
import { http } from '@/utils/http';
import { DeletedCart } from '../utils/deletedCart';
import toast from 'react-hot-toast';

interface SelectProps {
    item : string;
    chart : BucketModels[];
    handleAddChart : (id: string) =>  void ;


}



const SelectButton = ( { item, chart , handleAddChart } : SelectProps ) => {
    
    const [active , setActive] = useState (false)
    const [ pty, setPty] = useState<number >(0)
    const [alert, setAlert] = useState(false)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
    
        if(item){
            
            const actived = chart.some((chartItem) => chartItem.data.some((dataItem) => dataItem._id === item))
            setActive(actived);

            const matchingChartItem = chart.find((chartItem) =>  chartItem.data.some((dataItem) => dataItem._id === item));
            const  quantity = matchingChartItem?.quantity;

            if( matchingChartItem ){
                const Room = matchingChartItem.data.find((dataItem: any) => dataItem._id === item); // Cari dataItem
                let max = Room?.available;
                
                if( max === quantity ){
                    setAlert(max? true : false)
                    console.log(max, '===', quantity)
                }else{
                    setAlert(false)
                }
            }


            setPty(quantity? quantity: 0)
            
           
        }

    }, [item, chart])


    const handleRemoveVila = async() => {
        dispatch(setRemoveVila(item)); 


        // Kirim data ke server

        http.post(`/booking/del-to-cart`, { itemId : item }, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            console.log('Cart synced successfully:', response.data);
        })
        .catch(error => {
            console.error('Failed to sync cart with server:', error.response?.data || error.message);
        });
        

        // console.log("remove :", item)
    }
    const handleAddVila = () => {
        dispatch(setAddVila(item)); 

        http.post(`/booking/add-to-cart`, 
            {   roomId: item,
                quantity: 1,
                price: 200
             }, 
            { headers: { 'Content-Type': 'application/json' } }
        )
        .then(response => {
            console.log('Cart added to server successfully:', response.data);
        })
        .catch(error => {
            console.error('Failed to sync cart with server:', error.response?.data || error.message);
        });

        // console.log("add :", item)
    }

    return (

    <div className='w-full select-none'>
 
                    <div className={` ${active  ? 'hidden':'w-full text-[16px] hp3:text-md flex justify-end p-1 hp2:p-4' } `}>
                        <button onClick={()=> { handleAddChart (item)}} className='px-4 hp3:px-6 py-1 bg-color1 text-white font-semibold'>
                        <h1>Select</h1>
                        </button>
                    </div>
                        
                    <div className={` ${active ? 'w-full mx-auto flex justify-center items-end flex-col' : 'hidden'} `}>
                        <div className="relative flex items-center justify-center p-4 gap-5">
                            <button 
                                onClick={handleRemoveVila} 
                                className="w-full h-[2rem] max-w-[2rem] p-2 flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                  
                            >
                                <svg className="w-full h-full max-w-[1.5rem] max-h-[1.5rem] text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                            </button>

                            <h1>{pty}</h1>

                            <button 
                                onClick={handleAddVila} 
                                className={` ${alert  ? "cursor-not-allowed w-full h-[2rem] max-w-[2rem] p-2 flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none " : " w-full h-[2rem] max-w-[2rem] p-2 flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" }`}
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                disabled={alert} // Disable tombol jika alert bernilai true
                            >
                                <svg className="w-full h-full max-w-[1.5rem] max-h-[1.5rem] text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>

                            <span className={` ${alert ? 'text-sm absolute -bottom-[4] text-red-500' : 'hidden'}`}>
                                <h1>Max Room</h1>
                            </span>
                        </div>
                    </div>


                </div>

  )
}

export default SelectButton