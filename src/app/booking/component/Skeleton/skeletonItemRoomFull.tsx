import { homeFull } from '@/style/icons'
import Image from 'next/image'
import React from 'react'

const SkeletonRoomsFull = () => {
  return (
    
    <div  className='flex h-full max-w-[100rem]  mx-[2.2rem] justify-around items-center gap-5 m-2 p-3 border-[1px] shadow-md rounded-xl'>

        <div role="status" className=" w-full flex-center ">
            
        <div className=' '>

          <Image
              src={homeFull}
              alt='image cookies'
              width={200}
              height={300}
              className="w-[12rem] h-[12rem] max-w-[7rem] max-h-[7rem] object-cover "
          />

        </div  >
        <div className='text-slate-600 font-semibold'>
          
          <h1 className='text-[12px] sm:text-[18px]'> 
            Sorry, the rooms in that date range are all full 
          </h1>
          <h2 className='text-[10px] md:text-[15px]'> please use another date range </h2>

        </div>
        </div>


    </div>
  )
}

export default SkeletonRoomsFull