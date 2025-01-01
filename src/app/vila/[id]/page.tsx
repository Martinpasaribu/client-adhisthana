"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation';
import { ImageIn, RoomModels } from '@/models/roomModels';
import { http } from '@/utils/http';



 const DetailVilaByID = () => {

    const { id } = useParams();
    const [room, setDataRoom] = useState<RoomModels[]>([]);
    const [imageRoom, setImageRoom] = useState<ImageIn[]>([])
    const [facility, setFacility] = useState<string[]>([])
    
        useEffect(() => {

            if (!id) {
                console.error("Room ID is missing!");
              
                return;
            }
        
        
            http.get(`/room/getRoomByParams/${id}`)
                .then((response) => {
                    setDataRoom(response.data.data);
                    console.log("Data Room by ID! :", response.data.data);
                })
                .catch((err) => {
                })
                .finally(() => {
    ;
                });
        }, [id]);

        useEffect(() => {
            if(room.length > 0){
                setImageRoom(room[0].image)
                setFacility(room[0].facility)
            }
        },[room])
        
  return (

    <div className='overflow-hidden'>

    { room.length > 0 && (

  
        <div className='w-full h-full pt-[8rem] gap-8 flex flex-col text-center text-xs md:text-lg font-[family-name:var(--font-geist-sans)]'>

            {/* Name Room */}
            <div className='text-[16px] md:text-[20px]'>
                <h1>{ room[0].name}</h1>
            </div>

            {/* Poster */}
            <div>
                <Image src={room[0].imagePoster} alt='peopleIcons' width={800} height={400} className='w-full h-full object-cover'/>
            </div>

            {/* Detail Info */}
            <section className='flex justify-center md:grid md:grid-cols-3 w-full max-w-[43rem] md2:max-w-[50rem] mx-auto gap-8 md:gap-4 md2:gap-10  md:pl-12 md2:pl-16'>
                <div className='flex flex-col gap-2 '>
                    <h1 className='text-left text-[12px] md:text-[1rem]'>Max Occupancy</h1>
                    <figure className='flex justify-start items-center gap-2'>
                        <Image src={'/assets/IconImage/people.png'} alt='peopleIcons' width={100} height={100} className='h-4 md:h-5 w-4 md:w-5 object-cover'/>
                        <h1 className='text-slate-600 text-[10px] md:text-[13px] md:font-normal'>{room[0].maxCapacity} people</h1>
                    </figure>
                </div>
                <div className='flex flex-col gap-2 '>
                    <h1 className='text-left text-[12px] md:text-[1rem]'>Size</h1>
                    <figure className='flex justify-start items-center gap-2'>
                        <Image src={'/assets/IconImage/Size.png'} alt='peopleIcons' width={100} height={100} className='h-4 md:h-5 w-4 md:w-5 object-cover'/>
                        <h1 className='text-slate-600 text-[10px] md:text-[13px] md:font-normal'>{room[0].size} square meters</h1>
                    </figure>
                </div>
                <div className='flex flex-col gap-2 '>
                    <h1 className='text-left text-[12px] md:text-[1rem]'>Bed Type</h1>
                    <figure className='flex justify-start items-center gap-2'>
                        <Image src={'/assets/IconImage/bad.png'} alt='peopleIcons' width={100} height={100} className='h-4 md:h-5 w-4 md:w-5 object-cover'/>
                        <h1 className='text-slate-600 text-[10px] md:text-[13px] md:font-normal'>{room[0].bedType}</h1>
                    </figure>
                </div>
            </section>

            {/* Description and Image */}
            <div className='flex flex-col p-1 hp2:p-3 sm:p-10 md:p-1 md:flex-row overflow-hidden'>

                {/* Image */}
                <div className='grid grid-cols-2 w-full  gap-2 p-4 md2:p-10'>
                    {room && imageRoom.map((item, index) => (
                        <div key={index}>
                            <Image
                                src={item.image} // Gunakan item.url jika `imageRoom` memiliki properti URL
                                alt={`Room Image ${index + 1}`}
                                width={600}
                                height={400}
                                className='h-full w-full object-cover'
                            />
                        </div>
                    ))}
                </div>


                {/* Describe */}
                <div className='w-full md:max-w-[20rem] md2:max-w-[30rem] text-[10px] sm:text-sm flex-center text-slate-500 text-justify p-4 md2:p-10'>
                    <p>{room[0].describe}</p>
                </div>

            </div>


            {/* Fasilitas */}
            <div className='w-full h-full max-h-[32rem] bg-color3 flex-center flex-col p-2 md:p-10 gap-5'>
                <h1 className='text-color1 h-[2rem] md2:h-[5rem] flex-center'>Room Amenities</h1>

                <ul className=' grid grid-cols-2 sm:grid-rows-6 md:grid-rows-5 sm:grid-flow-col  place-items-center p-4 md:p-10 pl-4 md:pl-10 gap-4 w-full max-w-[70rem] list-disc list-inside text-slate-500'>
                    {room && facility.map((item, index) => (
                        <li
                         key={index} className='w-full text-left  md:text-sm'>{item}</li>
                    ))}

                </ul>

            </div>

        </div>

    )}

    </div>
  )
}

export default DetailVilaByID
