"use client"

import { ReservationModel } from '@/models/bookingModels';
import { http } from '@/utils/http';
import React, { useEffect, useState } from 'react'
import {  useAppSelector , useAppDispatch} from "@/lib/hooks/hooks";
import { setGetChart } from '@/lib/slice/bookingSlice';
import { formatCheckInCheckOut, night } from '../booking/component/formatDate';
import { convertToRupiah } from '@/constants';
import toast from 'react-hot-toast';
import useSnap from './hooks/useSnap';
import { useRouter } from 'next/navigation';
import { DeletedCart } from '../booking/utils/deletedCart';

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


  useEffect(()=> {

      dispatch(setGetChart()) 
      
      

      const datePar  = JSON.parse(localStorage.getItem('Params') ?? '[]') || [];

      setDate(datePar )

  },[dispatch])


     // Kirimkan Harga Total
    useEffect(() => {

    const getPriceTot = async () => {

        if(chart) { 
            await http.get(`/booking/get-total-price`, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                console.log('Price total successfully:', response.data);
                // setPriceTotal(response.data.totalPrice)
                setFormData((prev) => (
                    { ...prev, 
                        grossAmount: response.data.totalPrice,
                        room: response.data.data,
                    }
                ));

     
            })
            .catch(error => {
                const mail = error.response?.data.message
                console.error('Failed to Price total with server:', error.response?.data || error.message);
                toast.error(mail, { position: 'bottom-right', duration: 5000 });
            });
        }
    }

    getPriceTot()

  },[chart])

    const [formData, setFormData] = useState<ReservationModel>({

        bookingId: '',
        title:'',
        name:'',
        email:'',
        phone: 0,
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
    
      const handleSubmit = async () => {

        if (!formData.title || !formData.name || !formData.email || !formData.phone) {
          toast.error('Semua field wajib diisi!', { position: 'bottom-right', duration: 5000 });
          return;
      }

        try {
          const response = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
        if (response.ok) {
            const responseData = await response.json(); // Parse JSON dari response
            const responseServer = responseData.data.data
            toast.success('Berhasil Booking.', { position: 'top-right', duration: 5000 });

            setSnapShow(true);
            console.log(" hasil snaptoken darisever : ", responseServer.snap_token, '/ hasil id dari server : ', responseServer.id, )
            snapEmbed(responseServer.snap_token, 'snap-container', {
                onSuccess: function (result: any) {
                    console.log('Payment Success:', result);
                    router.replace(`/order-status?order_id=${responseServer.id}`);
                    setSnapShow(false);
                },
                onPending: function (result: any) {
                    console.log('Payment Pending:', result);
                    router.replace(`/order-status?order_id=${responseServer.id}`);
                    setSnapShow(false);
                },
                onClose: function (result: any) {
                    console.log('Payment Closed:', result);
                    router.replace(`/order-status?order_id=${responseServer.id}`);
                    setSnapShow(false);
                },
            });

            localStorage.removeItem('cart_vila');
            DeletedCart().catch((error) => console.error('Error during deleted session:', error));
        }
        else {
            throw new Error('Gagal melakukan booking.');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Gagal Melakukan checkout.', { position: 'bottom-right', duration: 5000 });
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
          const nightDuration = Math.ceil(
            (checkout.getTime() - checkin.getTime()) / (1000 * 3600 * 24)
          );
      
          setNight(nightDuration);
      
        //   console.log("Checkin:", checkin);
        //   console.log("Checkout:", checkout);
        //   console.log("Night Duration:", nightDuration);
        }
      }, [checkin, checkout]);
      

      useEffect(() => {

        if(chart){

            const totalPrice = chart.reduce((total, item) => {
                return total + item?.data[0]?.price * item.quantity;
            }, 0);
            setSubtotal(totalPrice)
            setTax(totalPrice * 0.12 )
        }

      },[chart])


  return (
    
    // onBack={() => router.push('/')} full={snapShow} noHeader={snapShow}

    <div title='Checkout'>
        
        {!snapShow && (
            <>

                <form  onSubmit={(e) => { e.preventDefault();  handleSubmit();  }} className='flex-center flex-col py-[5rem] hp4:py-[9rem] relative gap-2 overflow-hidden p-2'>
                    
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
                                        className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
                                        required
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
                                        required
                                    />
                                    </div>
                                    <div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 md:p-3"
                                        placeholder="Phone Number"
                                        required
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
                                                <h1>{convertToRupiah(item.data[0]?.price) || "No price"}</h1>
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

                    <div className='flex justify-end items-center w-full h-full max-w-[70rem] p-2 mt-5'>

                        <button type="submit" className='px-3 py-2 bg-color1 text-white'>
                            <h1> Create Transaction </h1>
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