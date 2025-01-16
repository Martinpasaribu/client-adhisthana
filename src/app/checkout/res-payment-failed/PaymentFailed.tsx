/* eslint-disable @next/next/no-img-element */
import React from 'react'

const PaymentFailed = () => {
  return (

    <div className='py-[9rem]  flex-center flex-col gap-4'>
          <img src="/assets/Gif/payment-yes.gif" alt="Timeout Response" className='w-full h-full max-w-[20rem] max-h-[20rem]' />
          <h1 className='text-color1 text-md sm:text-2xl sm:font-semibold'> Payment Completed </h1>
    </div>

  )
}

export default PaymentFailed