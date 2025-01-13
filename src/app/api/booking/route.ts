import { http } from '@/utils/http';
import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';

export async function POST(req: Request) {
  try {
    // Parsing body dari request
    const body = await req.json();

    const {
      name,
      email,
      bookingId,
      status,
      userId,
      checkIn,
      checkOut,
      grossAmount,
      paymentUrl,
      room,
    } = body;

    // Validasi data
    if (
      !userId ||
      !checkIn ||
      !checkOut ||
      !grossAmount ||
      !room ||
      !Array.isArray(room)
    ) {
      return NextResponse.json(
        { message: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Kirim data ke API eksternal
    const response = await http.post('/booking/addBooking', {
      name,
      email,
      bookingId,
      status,
      checkIn,
      checkOut,
      grossAmount,
      userId,
      paymentUrl,
      room: room.map((r: any) => ({
        roomId: r.roomId,
        quantity: r.quantity,
      })),
    });

    if (response && response.data) {
      return NextResponse.json(
        { message: 'Booking created successfully', data: response.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to receive a response from external server' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    
    console.error('Error in /api/booking handler:', error);

    // Cek apakah error adalah AxiosError
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || 'Error in external API request',
        },
        { status: error.response?.status || 500 }
      );
    }

    // Penanganan untuk jenis error lain
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
