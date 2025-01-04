import React, { Suspense } from 'react'
import Layout from './Layout'

const page = () => {

  return (

        <Suspense fallback={<div>Loading...</div>}>

          <Layout/>

        </Suspense>

        
  

  )
}

export default page