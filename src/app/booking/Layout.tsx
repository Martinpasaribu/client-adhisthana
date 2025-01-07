"use client";

import Calendar from "./component/calender";
import Link from "next/link";
import DatePicker from "./component/datePicker";


const HandleDate= () => {
    
}

const Layout = () => {
    return (
        <div>
            
            {/* <Calendar checkIn={''} checkOut={''} /> */}

            <DatePicker/>
        </div>
    );
};

export default Layout;
