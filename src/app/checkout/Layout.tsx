"use client"

import { ReservationModel } from '@/models/bookingModels';
import { http } from '@/utils/http';
import Image from 'next/image';
import React, { useEffect, useState, useRef  } from 'react'
import {  useAppSelector , useAppDispatch} from "@/lib/hooks/hooks";
import { setGetChart } from '@/lib/slice/bookingSlice';
import { formatCheckInCheckOut, night } from '../booking/component/constant/formatDate';
import { convertToRupiah } from '@/constants';
import toast from 'react-hot-toast';
import useSnap from './hooks/useSnap';
import { useRouter } from 'next/navigation';
import { DeletedCart } from '../booking/utils/deletedCart';
import { authCheckout, authLogin, checkUser } from '../auth/authCeckout/authCheckout';
import { NextResponse } from 'next/server';
import { handleMe } from '@/utils/getMe';
import MainLoading from '@/component/mainLoading/loading';
import { shopBag } from '@/style/icons';

interface Params {
    checkin? :  Date | null;
    checkout? : Date | null;
  }
interface LayoutProps {

    onBack: () => void;
    // {onBack}: LayoutProps
}

const Layout = (  ) => {
    
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { snapEmbed } = useSnap()
  const chart = useAppSelector((state) => state.booking.stateChartRes);
  const [ nights, setNight ] = useState<number | 0>();
  const [ subtotal, setSubtotal ] = useState<number | 0>();
  const [ tax, setTax ] = useState<number | 0>();
  const [ dateParams, setDate  ] = useState<Params>();
  const [ checkin, setCheckin  ] = useState< Date | null>();
  const [ checkout, setcheckout  ] = useState< Date | null>();
  const [ priceTotal, setPriceTotal] = useState<number | 0>();
  const [ snapShow, setSnapShow] = useState(false)
  const [ load, setLoad] = useState(false)
  const [ amountNight, setAmountNight] = useState<number | 0>();

  const isInitialRender = useRef(true); 

  useEffect(()=> {

      dispatch(setGetChart()) 
      

      const datePar  = JSON.parse(localStorage.getItem('Params') ?? '[]') || [];
      const AmountNights  = JSON.parse(localStorage.getItem('Night') ?? '[]') || [];

      setDate(datePar )
      setAmountNight(AmountNights)

  },[dispatch])


    // useEffect(() => {

    //   if (snapShow) {
       
    //     router.push('/auth/member');
    //   }
    // }, [router]);



     // Kirimkan Harga Total
     useEffect(() => {
      const handleRedirectOrFetch = async () => {
        
        
        // if (isInitialRender.current) {
        //   isInitialRender.current = false; 

        //   if (snapShow === true) {
          
        //     router.push('/auth/member');
        //     return;
        //   }
        // }
  
        if (!snapShow && chart) {

          setLoad(true);

          try {
            const response = await http.get('/booking/get-total-price', {
              headers: { 'Content-Type': 'application/json' },

            });
            console.log('Price total successfully:', response.data);
  
    
            setTimeout(() => {
              setLoad(false);
            }, 2000);

            setFormData((prev) => ({
              ...prev,
              grossAmount: response.data.totalPrice,
              room: response.data.data,
            }));

  

          } catch (error: any) {

            const mail = error.response?.data?.message || 'server does not respond';
            console.error('Failed to fetch price total:', error.response?.data || error.message);
  
            // Tampilkan toast error
            toast.error(mail, { position: 'bottom-right', duration: 5000 });
    
              const auth = await handleMe()
              console.log('hasil debuging me:', auth)
              if( auth === false ){

                  setTimeout(() => {
                    router.push('/booking');
                  }, 2000);
              }
                else {

                router.push('/auth/member');
            }
            setLoad(false);
          }
        }
      };
  
      handleRedirectOrFetch();

    }, [snapShow, chart, router]); 

    const [formData, setFormData] = useState<ReservationModel>({

        bookingId: '',
        title:'',
        name:'',
        email:'',
        phone: '',
        status: '',
        userId: 'ID Martin',
        checkIn: '',
        checkOut: '',
        grossAmount: 0,
        paymentUrl: '',
        room:[]

      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
      };
    

    //   Submit Semua data untuk diCheckOut
    const handleSubmit = async () => {
      try {
        // Validasi awal
        if (!formData.title || !formData.name || !formData.email || !formData.phone) {
          toast.error("Semua field wajib diisi!", { position: "bottom-right", duration: 5000 });
          return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Invalid email format!", { position: "bottom-right", duration: 5000 });
          return;
        }
    
        // Set loading sebelum memulai proses
        setLoad(true);
    
        // Proses booking
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          const responseServer = responseData.data.data;
    
          toast.success(responseData.message || "Successful Booking", { position: "bottom-left", duration: 5000 });
    
          setSnapShow(true);
          snapEmbed(responseServer.snap_token, "snap-container", {
            onSuccess: function (result :any) {
              console.log("Payment Success:", result);
              router.replace(`/order-status?order_id=${responseServer.id}`);
              setSnapShow(false);
            },
            onPending: function (result : any) {
              console.log("Payment Pending:", result);
              router.replace(`/order-status?order_id=${responseServer.id}`);
              setSnapShow(false);
            },
            onClose: function () {
              console.log("Payment Closed");
              setSnapShow(false);
            },
          });
    
          // Bersihkan cart_vila di localStorage
          localStorage.removeItem("cart_vila");
          localStorage.removeItem('Params');
          localStorage.removeItem('Night');
          await DeletedCart();

        } else {
          const errorMessage = (await response.json()).message || "Gagal melakukan booking.";
          throw new Error(errorMessage);
        }
    
        // Proses auth setelah booking berhasil
        const userExists = await checkUser(formData.email);
        if (userExists) {
          await authLogin({ email: formData.email });
          return;
        } else {
          await authCheckout({
            title: formData.title,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          });
    
          await authLogin({ email: formData.email });
        }
      } catch (error:any) {
        console.error("Error during handleSubmit:", error.message);
        toast.error(error.message || "Failed to checkout.", { position: "bottom-right", duration: 5000 });
      } finally {

        setTimeout(() => {
          setLoad(false)
        }, 2000);
      }

    };
    
      

    // Kirimkan Tanggal CheckIn dan CheckOut
    useEffect(() => {
        if (dateParams) {
          // Setel checkin dan checkout ke state
          setCheckin(dateParams.checkin ? new Date(dateParams.checkin) : null);
          setcheckout(dateParams.checkout ? new Date(dateParams.checkout) : null);


          setFormData((prev) => ({ ...prev, checkIn: dateParams.checkin || '', checkOut: dateParams.checkout || '' })); 

        }
      }, [dateParams]);
      


      useEffect(() => {
        // Hitung durasi malam hanya jika checkin dan checkout valid
        if (checkin && checkout) {

          const checkInDate = new Date(checkin);
          const checkOutDate = new Date(checkout);

          checkInDate.setHours(0, 0, 0, 0);
          checkOutDate.setHours(0, 0, 0, 0);

          const nightDuration = Math.max(
              0,
              (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
          );

      
          setNight(nightDuration);
      
        //   console.log("Checkin:", checkin);
        //   console.log("Checkout:", checkout);
        //   console.log("Night Duration:", nightDuration);
        }
      }, [checkin, checkout]);
      

      useEffect(() => {


        if(chart && amountNight){
            

            const totalPrice = chart.reduce((total, item) => {
                return total + item?.data[0]?.price * item.quantity * amountNight;
            }, 0);

            setSubtotal(totalPrice)
            setTax(totalPrice * 0.12 )
        }

      },[chart, amountNight])


  


  return (
    
    // onBack={() => router.push('/')} full={snapShow} noHeader={snapShow}


    <div title='Checkout'>
        
        { load && (<MainLoading/>)}

        {!snapShow && (
            <>

                <form  onSubmit={(e) => { e.preventDefault();  handleSubmit();  }} className='flex-center flex-col pt-[6rem] hp4:py-[9rem] relative gap-2 overflow-hidden p-3 '>
                    
                    <div className='flex flex-col xl:flex-row w-full h-full max-w-[70rem] gap-5'>


                        <div className='select-none flex flex-col gap-4 space-y-5 w-full xl:max-w-[30rem]'>

                            <h1 className='text-md md:text-xl font-semibold text-gray-700'> Guest Information </h1>

                            <div  className='flex flex-col gap-4 space-y-5 w-full xl:max-w-[30rem]' >

                                <div className=' flex justify-around items-center gap-4 w-full'>
                                    {['Mr.', 'Mrs.', 'Ms.'].map((title) => (
                                    <div key={title} className="flex items-center">
                                        <input
                                        id="title"
                                        type="radio"
                                        name="title"
                                        value={title}
                                        checked={formData.title === title}
                                        onChange={() => setFormData((prev) => ({ ...prev, title }))}
                                        required
                                        className="w-4 h-4 appearance-none rounded-full border border-color2 checked:bg-color1 checked:border-color1 focus:ring-2 focus:ring-white"
                                        />
                                        <label className="ms-2 text-sm font-medium text-gray-900">{title}</label>
                                    </div>
                                    ))}
                                </div>

                                <div className="grid gap-6 mb-6 md:grid-rows-4 ">
                                    <div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2 md:p-3"
                                        placeholder="Name"
                                    />
                                    </div>
                                    <div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 md:p-3"
                                        placeholder="Email Address"
                                    />
                                    </div>
                                    <div>
                                    <input
                                        type="number"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 md:p-3"
                                        placeholder="Phone Number"
                                    />
                                    </div>
                                </div>

                            </div>
                            
                        </div>

                        <div className='flex justify-end items-end  flex-col h-full w-full xl:max-w-[40rem]'>



                                <div className='bg-color4 p-4 w-full xl:max-w-[30rem] space-y-2'>

                                    <h1 className='text-[18px] sm:text-[22px] md:text-xl mb-8 text-black font-bold'>
                                        Your Resevation
                                    </h1>

                                    <h1 className='text-[13px] sm:text-[16px]'>
                                    {checkin && checkout
                                    ? formatCheckInCheckOut(checkin ,checkout , false, night) 
                                    : "Select check-in and check-out dates"}
                                    </h1>

                                    {chart && chart.length > 0 ? (

                                        chart.map(( item , index) => (

                                        <div key={index} className='flex justify-between items-center w-full gap-5'>

                                            <h1 className='text-[13px] font-bold sm:text-[18px] sm:font-semibold text-left w-full'>  {item.data[0]?.name || "No Name"} </h1>
                                            
                                            <div className='flex text-sm w-full gap-1 font-normal'>
                                                <div className='flex gap-1'>
                                                    <h1>
                                                        {item.quantity} 
                                                    </h1>
                                                    <p className='hidden sm:block' >Rooms</p>
                                                </div>
                                                <h1>
                                                    X
                                                </h1>
                                                <div>
                                                    { nights && nights > 0 ? (

                                                        <h1> {nights} </h1>
                                                        ) : (
                                                        <h1> {nights} </h1>
                                                        )

                                                    }
                                                </div>

                                                <div>
                                                    Nights
                                                </div>
                                                
                                            </div>

                                            <div className='flex gap-2 text-[15px] sm:text-[17px] font-semibold'>
                                                <h1>IDR</h1>
                                                { nights && nights && (

                                                <h1>{convertToRupiah(item.data[0]?.price * nights) || "No price"}</h1>

                                                )}
                                            </div>

                                        </div>


                                            
                                            ))

                                        ) : (

                                        <p>Data tidak ditemukan</p>

                                    )}

                                    <div className='text-[14px] sm:text-[20px] flex justify-between items-center'>
                                        <h1 className='text-[13px] font-bold sm:text-[18px] sm:font-semibold'>Reservation Subtotal</h1>
                                        <h1 className='flex gap-2 text-[15px] sm:text-[17px] font-semibold'>{convertToRupiah(subtotal && subtotal ? subtotal : 0)}</h1>
                                    </div>
                                    <div className='text-[14px] sm:text-[20px] flex justify-between items-center'>
                                        <h1 className='text-[13px] font-bold sm:text-[18px] sm:font-semibold'>Tax</h1>
                                        <h1 className='flex gap-2 text-[15px] sm:text-[17px] font-semibold'>{convertToRupiah(tax && tax ? tax : 0) }</h1>
                                    </div>

                                </div>

                                <div className='p-4 w-full xl:max-w-[30rem] flex-center bg-color2'>

                                    <div className='flex justify-between items-center w-full text-yellow-400 font-semibold'>
                                        <h1>Reservation Total</h1>
                                        <h1 className='text-md md:text-lg'>IDR {convertToRupiah((subtotal && tax) && subtotal ? subtotal+tax : 0)}</h1>
                                    </div>

                                </div>
                        </div>

                    </div>

                    <hr className=" top-0 left-0 z-30 h-0 w-full max-w-[74rem] border-b border-solid border-color1 mt-5"/>

                    <div className='hidden sm:flex justify-end items-center w-full h-full max-w-[70rem] p-2 mt-5'>

                        <button type="submit" className='px-3 py-2 bg-color1 text-white flex-center gap-2'>
                            
                            <h1> Checkout </h1>

                            <Image
                                src={shopBag}
                                alt='image appointment'
                                width={200}
                                height={200}
                                className="w-[1.6rem] h-[1.6rem]  hp2:w-[1.8rem] hp2:h-[1.8rem] max-w-[2rem] max-h-[2rem] object-cover "
                            />
                        </button>

                    </div>

                    <div className='relative h-32 w-32 sm:hidden justify-end items-center max-w-[30rem] p-2 mt-5 z-40'>

                      <button type="submit" className=' flex-center gap-2 px-3 py-2 bg-color1 text-white fixed bottom-10 h-12 rounded-md'>
                          
                          <h1> Checkout </h1>

                            <Image
                                src={shopBag}
                                alt='image appointment'
                                width={200}
                                height={200}
                                className="w-[1.6rem] h-[1.6rem]  hp2:w-[1.8rem] hp2:h-[1.8rem] max-w-[2rem] max-h-[2rem] object-cover "
                            />

                      </button>

                    </div>


                </form>
            
            </>
        )}

        <div id="snap-container" className="w-full h-auto pt-[8rem] mx-auto p-4">


        </div>


    </div>

  )
}

export default Layout