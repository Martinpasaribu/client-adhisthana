import { Logout } from '@/app/auth/logout/Logout'
import React from 'react'

interface LeftProps {

    setView : ( view : string ) => void
}


const Left = ( { setView } : LeftProps) => {


  const handleView =  (views : string) => {
    setView(views ? views : '')
  }  

  return (

    <div className='w-full max-w-[15rem] h-full max-h-[15rem] flex justify-start  items-center  p-4 bg-white rounded shadow-md text-slate-700'>
        
        <ul className='flex flex-col gap-5 '>
            <li onClick={() => handleView('Booking')} className='cursor-pointer'>
                <h1> My Booking </h1>
            </li>
            <li onClick={() => handleView('Profile')} className='cursor-pointer'>
                <h1> Change Profile </h1>
            </li>
            <li onClick={() => handleView('Password')} className='cursor-pointer'>
                <h1> Change Password </h1>
            </li>
            <li onClick={() => { Logout() }} className='cursor-pointer'>
                <h1> Logout </h1>
            </li>
        </ul>

    </div>



  )
}

export default Left