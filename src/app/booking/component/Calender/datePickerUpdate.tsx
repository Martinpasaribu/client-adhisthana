"use client";

import React, { useState } from "react";
import { DayPicker, DateRange, getDefaultClassNames  } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useAppDispatch } from "@/lib/hooks/hooks";
import { setCheckIn, setCheckOut } from "@/lib/slice/bookingSlice";
import { formatBookingDate, formatLocalISOIn, formatLocalISOOut } from "../constant";
import toast from "react-hot-toast";

interface CalendarProps {
  checkIn?: Date | null;
  checkOut?: Date | null;
  isOpen: boolean;
  closeModal: () => void;
}

const DatePickerUpdate = ({ checkIn, checkOut, isOpen, closeModal }: CalendarProps) => {
  const dispatch = useAppDispatch();

  // Inisialisasi rentang dengan nilai awal checkIn dan checkOut
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: checkIn || undefined,
    to: checkOut || undefined,
  });

  const handleUpdateDate = () => {

    if (!selectedRange.from || !selectedRange.to) {
      // Validasi jika salah satu tanggal belum diisi
      toast.error("Enter the booking date.", {
        position: "bottom-right",
        duration: 5000,
        iconTheme: { primary: "#604beb", secondary: "#fff" },
        icon: "🗓",
        style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
      });
      return;
    }
  
    if (selectedRange.from.toISOString() === selectedRange.to.toISOString()) {
      // Validasi jika tanggal Check-In sama dengan Check-Out
      toast.error("Dates cannot be the same.", {
        position: "bottom-right",
        duration: 5000,
        iconTheme: { primary: "#ff0000", secondary: "#fff" },
        icon: "⚠️",
        style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
      });
      return;
    }
    
  


    if (selectedRange.from) {
      dispatch(setCheckIn(formatBookingDate(selectedRange.from, "checkIn"))); // Simpan tanggal mulai
    }
    if (selectedRange.to) {
      dispatch(setCheckOut(formatBookingDate(selectedRange.to, "checkOut"))); // Simpan tanggal akhir
    }
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white fixed inset-0 z-30 flex-center">
      <div className="overflow-hidden bg-white">
        <div className="relative flex flex-col h-full w-full pt-[2rem]">
          <div className="flex flex-col w-full p-6 rounded-lg shadow-md h-full">
            <div className="flex flex-col items-center">

              <DayPicker
                mode="range"
                numberOfMonths={1}
                selected={selectedRange}
                onSelect={setSelectedRange}
                required // Tambahkan properti required
                classNames={{
                  day: `font-bold text-black hover:bg-gray-200 font-semibold rounded-md`,
                  selected: `bg-green-500 text-white font-semibold rounded-full`,
                  today: `text-[#FF5E00] font-bold border border-orange-500 rounded-md`,
                }}
                style={{
                  '--rdp-range_start-date-background-color': '#FF3C00FF',
                  '--rdp-range_end-date-background-color': '#FF3C00FF',
                  '--rdp-accent-color': '#FF3C00FF',
                  '--rdp-range_middle-background-color': '#FCCDC6FF',
                  fontSize: '1.1rem',
                } as React.CSSProperties}
              />

            </div>
          </div>
          <div className="w-full flex-center p-5">
            <button
              onClick={handleUpdateDate}
              className="w-full py-2 border-color2 border-2 rounded-md"
            >
              CHANGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerUpdate;
