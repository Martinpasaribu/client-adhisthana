/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Script from 'next/script'
import { handleMe } from '@/utils/me/getMe'
import { authCheckout } from '../auth/authCeckout/authCheckout'
import AuthCheckout from './component/auth-checkout/authCheckout'

const page = () => {

  const [ auth, setAuth ] = useState(false)

      useEffect(() => {
  
         const DataMe = async() => {
  
         const data = await handleMe()
  
          if( data === true ){
            setAuth(true)
          }
        }

        DataMe()
  
      },[])
  
  return (
    <div>
      
      { auth ? 
      
        ( <AuthCheckout/> )
      :
        ( <Layout  /> ) 
      }

        
        
    </div>

  )
}

export default page