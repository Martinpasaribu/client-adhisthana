import React from 'react'

const TransactionSkeletonSecond = () => {

  return (

    <div  className='flex h-full  justify-around items-center text-xl gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>

        <div role="status" className=" w-full space-y-8 animate-pulse">

            <div className="w-full h-full flex flex-col gap-2">

                <div className='w-full h-full flex gap-4'> 

                    <div className='w-full grid grid-cols-5 items-center'>

                        <div className="h-2.5 w-full bg-gray-300 rounded-full dark:bg-gray-700 max-w-16 "></div>
                        <div className="h-2.5 w-full bg-gray-300 rounded-full dark:bg-gray-700 max-w-16 "></div>
                        <div className="h-2.5 w-full bg-gray-300 rounded-full dark:bg-gray-700 max-w-16 "></div>
                        <div className="h-2.5 w-full bg-gray-300 rounded-full dark:bg-gray-700 max-w-16 "></div>
                       
                        <div className='flex justify-end items-center'>
                            <div className=" bg-gray-300 rounded-md dark:bg-gray-700 w-24 h-10 "></div>
                        </div>
                    </div>
             
                </div>

           

            </div>

            <span className="sr-only">Loading...</span>
        </div>


    </div>

  )
}

export default TransactionSkeletonSecond