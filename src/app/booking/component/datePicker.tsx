"use client";
import { useEffect, useState } from "react";
import { DayPicker, DateRange, getDefaultClassNames  } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setCheckIn, setCheckOut } from "@/lib/slice/bookingSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const DatePicker = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const checkInDate = (selectedRange?.from);
  const checkOutDate = selectedRange?.to;
  const defaultClassNames = getDefaultClassNames();

    // Fungsi untuk memformat tanggal menjadi format ISO
    const formatDate = (date: Date) => {
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

  // Fungsi untuk menambahkan waktu default pada tanggal
  const setDefaultTime = (date: Date, hours: number, minutes: number) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0); // Set jam dan menit sesuai
    return newDate;
  };

  useEffect(() => {
    if (checkInDate) {
      const formattedCheckIn = formatDate(checkInDate);
      dispatch(setCheckIn(formattedCheckIn)); // Kirim tanggal check-in ke Redux
    }
    if (checkOutDate) {
      const formattedCheckOut = formatDate(checkOutDate);
      dispatch(setCheckOut(formattedCheckOut)); // Kirim tanggal check-out ke Redux
    }
  }, [checkInDate, checkOutDate, dispatch]);

  const handleSetDate = () => {
    if (!checkInDate || !checkOutDate) {
      // Validasi jika salah satu tanggal belum diisi
      toast.error("Masukkan tanggal booking.", {
        position: "bottom-right",
        duration: 5000,
        iconTheme: { primary: "#604beb", secondary: "#fff" },
        icon: "🗓",
        style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
      });
      return;
    }
  
    if (checkInDate.getTime() === checkOutDate.getTime()) {
      // Validasi jika tanggal Check-In sama dengan Check-Out
      toast.error("Tanggal tidak boleh sama.", {
        position: "bottom-right",
        duration: 5000,
        iconTheme: { primary: "#ff0000", secondary: "#fff" },
        icon: "⚠️",
        style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
      });
      return;
    }
  
    if (checkOutDate < checkInDate) {
      // Validasi jika tanggal Check-Out lebih kecil dari Check-In
      toast.error("Tanggal Check-Out tidak boleh sebelum Check-In.", {
        position: "bottom-right",
        duration: 5000,
        iconTheme: { primary: "#ff0000", secondary: "#fff" },
        icon: "⚠️",
        style: { borderRadius: "10px", background: "#C0562F", color: "#fff" },
      });
      return;
    }
  
    // Jika semua validasi lolos
    router.push(
      `/booking/offers?checkin=${checkInDate.toISOString()}&checkout=${checkOutDate.toISOString()}&people=4`
    );
  };
  



  return (
    <div className="overflow-hidden ">
      <div className="relative flex flex-col justify-center items-center h-full md3:h-screen w-full pt-[6rem] md3:pt-[2rem]">
        
        <h2 className="h-[8rem] max-h-[6rem] w-full text-center text-2xl font-semibold mb-6 text-gray-700 flex-center">
          Book Your Stay
        </h2>


        <div className="flex-center w-full h-full full md3:max-h-[23rem] p-2 rounded-lg  overflow-hidden">

          <div className="flex flex-col  w-full md3:flex-row gap-7 md3:gap-0">

            {/* Komponen DayPicker */}
            <div className="w-full flex justify-center md3:justify-end ">
              {/* <label className="mb-2 text-gray-600 font-medium">Select Your Dates</label> */}

                <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                    classNames={{
                        day: `font-bold text-black hover:bg-gray-200 font-semibold rounded-md`, // Setiap hari
                        selected: `bg-green-500 text-color1 font-semibold rounded-full`, // Hari yang dipilih
                        today: `text-[#FF5E00] font-bold border border-orange-500  rounded-md`, // Hari ini
                        month: `p-4`,
                    }}
                    style={{
                        '--rdp-range_start-date-background-color': '#FF3C00FF',
                        '--rdp-range_end-date-background-color': '#FF3C00FF',
                        '--rdp-accent-color': '#FF3C00FF',
                        '--rdp-range_middle-background-color': '#FCCDC6FF',
                        '--rdp-nav_button-disabled-opacity':'',
                        fontSize: '1.1rem',
                    } as React.CSSProperties}
                />


            </div>

            {/* Tampilkan Check-In dan Check-Out */}
            <div className="w-full flex-center gap-4 flex-col  ">
              
              <div className="w-full h-full flex-center ">

                {/* Check-In */}
                <div className="w-full h-full max-w-[20rem] max-h-[20rem] flex-col border-black border-2 ">
                  <div className="w-full h-full bg-color2 max-h-[2rem] flex-center text-white">
                    <h1 className="text-md md:text-xl">Check-In</h1>
                  </div>
                  <div className="w-full flex-center h-full max-h-[10rem]">
                      
                    <div className="text-md md:text-2xl flex-center gap-2  md3:flex-col p-4 md3:p-2">
                      <div> {checkInDate ? format(checkInDate, "dd ") : ""} </div>
                      <div> {checkInDate ? format(checkInDate, "MMM ") : ""} </div>
                    </div>

                  </div>
                </div>

                {/* Check-Out */}
                <div className="w-full h-full max-w-[20rem] max-h-[20rem] flex-col border-black border-2">
                  <div className="w-full h-full bg-color2 max-h-[2rem] flex-center text-white">
                    <h1 className="text-md md:text-xl">Check-Out</h1>
                  </div>
                  <div className="w-full flex-center h-full max-h-[10rem]">
                    <div className="text-md md:text-2xl flex-center gap-2 md3:flex-col p-4 md3:p-2">
                      <div> {checkOutDate ? format(checkOutDate, "dd ") : ""} </div>
                      <div> {checkOutDate ? format(checkOutDate, "MMM ") : ""} </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="w-full flex-center p-5 ">
                <button
                  className="p-2 border-color2 border-2 w-full max-w-[40rem]"
                  onClick={() => {
                  //   if (!checkInDate || !checkOutDate) {
                  //     alert("Please select both Check-In and Check-Out dates!");
                  //   } else {
                  //     alert(
                  //       `Check-In: ${format(checkInDate, "dd MMMM yyyy")}\nCheck-Out: ${format(
                  //         checkOutDate,
                  //         "dd MMMM yyyy"
                  //       )}`
                  //     );
                  //   }
                  // }
                  handleSetDate()}
                }
                >
                  CHECK RATES
                </button>
              </div>
        
            
            </div>

          </div>
        </div>


      </div>
    </div>
  );
};

export default DatePicker;
