"use client";

import { useState } from "react";
import Left from "./component/Left/Left";
import MyBooking from "./component/Right/MyBooking";
import ChangeProfile from "./component/Right/ChangeProfile";
import ChangePassword from "./component/Right/ChangePassword";
import LeftMini from "./component/Left/LeftMini";

export default function Login() {

  const [filter, setFilter] = useState<string>("Booking"); // State untuk filter

  // Fungsi untuk memperbarui filter dari komponen Left
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="flex flex-col gap-8 items-center pt-[4rem] sm:pt-[7rem] min-h-screen overflow-hidden">
      {/* Head */}
      <div className="w-full max-w-[80rem] p-10 text-center  hp3:text-left">
        <h1 className="text-2xl font-bold text-color1 "> Member </h1>
      </div>

      {/* Body */}
      <div className="w-full max-w-[80rem] flex flex-row h-full relative">
        
        {/* Left */}
        <div className="hidden  xl:flex justify-center items-center w-full max-w-[20rem] h-full max-h-[15rem]">
          <Left setView={handleFilterChange}  />
        </div>

        <div className="flex fixed bottom-2  xl:hidden justify-center items-center sm:bottom-10  p-4  rounded shadow-md  text-white w-full max-w-[80rem] h-full max-h-[8rem]  z-40">

          <LeftMini setView={handleFilterChange}/>

        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 w-full max-w-[90rem] p-3 ">
            
            <div className=" text-slate-700 text-[13px] px-4 xl:px-0">
              <h1> Member &#62;	  {filter} </h1>
            </div>



            <div className="h-full">

              {filter === "Booking" && <MyBooking />}
              {filter === "Profile" && <ChangeProfile />}
              {filter === "Password" && <ChangePassword />}

            </div>
        </div>
      </div>
    </div>
  );
}
