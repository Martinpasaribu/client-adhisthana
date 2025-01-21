import { NextResponse } from 'next/server';
import axios from 'axios';
import { http } from '@/utils/http';

export async function POST(req: Request) {

  try {



    const body = await req.json(); // Ambil data dari body request
    const { checkIn, checkOut } = body;

    // Dapatkan tanggal hari ini
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    

    if (checkInDate < today || checkOutDate < today) {
      return NextResponse.json(
        { error: 'Date cannot be in the past. ' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date.' },
        { status: 400 }
      );
    }

    // Validasi input
    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Both checkIn and checkOut are required.' },
        { status: 400 }
      );
    }

    // Lakukan permintaan ke API lain atau database dengan parameter
    const response = await http.post(`/short/get-available-set-minder`, {
      checkIn: checkIn,
      checkOut: checkOut,
    });


    // Kirimkan data hasil ke frontend
    return NextResponse.json(response.data);

  } catch (error: any) {


  const errorMessage =  'The server is not responding';
  console.log('Error fetching vila data:', errorMessage);
  

  return NextResponse.json(
    
    { error: errorMessage },
    { status: error.response?.status || 500 }
    
  );

  }
}
