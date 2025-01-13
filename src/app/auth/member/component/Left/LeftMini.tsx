import React from 'react'

interface LeftProps {

    setView : ( view : string ) => void
}


const LeftMini = ( { setView } : LeftProps) => {


  const handleView =  (views : string) => {
    setView(views ? views : '')
  }  

  return (

        
        <ul className='flex-center  gap-5  text-[14px] hp1:text-[16px] font-bold w-full max-w-[25rem] bg-color2  rounded-md h-full max-h-[3rem]'>
            <li onClick={() => handleView('Booking')} className='cursor-pointer'>
                <h1>Booking </h1>
            </li>
            <li onClick={() => handleView('Profile')} className='cursor-pointer'>
                <h1>Profile </h1>
            </li>
            <li onClick={() => handleView('Password')} className='cursor-pointer'>
                <h1>Password </h1>
            </li>
            <li className='cursor-pointer'>
                <h1> Logout </h1>
            </li>
        </ul>




  )
}

export default LeftMini