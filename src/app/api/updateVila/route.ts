import { NextResponse } from 'next/server';
import axios from 'axios';
import { http } from '@/utils/http';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Ambil data dari body request
    const { checkIn, checkOut } = body;

    // Validasi input
    if (!checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Both checkIn and checkOut are required.' },
        { status: 400 }
      );
    }

    // Lakukan permintaan ke API lain atau database dengan parameter
    const response = await http.post(`/short/get-short-available`, {
      checkIn: checkIn,
      checkOut,
    });

    // Kirimkan data hasil ke frontend
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching vila data:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to fetch vila data' },
      { status: 500 }
    );
  }
}
