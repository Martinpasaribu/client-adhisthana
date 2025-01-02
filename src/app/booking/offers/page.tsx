"use client"

import React, { Suspense } from 'react'
import Layout from './Layout'







const Offers = () => {


  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Layout />
    </Suspense>
  )
}

export default Offers