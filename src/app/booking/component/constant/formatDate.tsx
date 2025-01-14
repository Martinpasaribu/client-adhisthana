export const formatCheckInCheckOut = (
    checkin: Date,
    checkout: Date,
    setWeekDay: boolean,
    onNightCalculated: (nightDuration: number) => void
  ) => {
    const options: Intl.DateTimeFormatOptions | undefined = setWeekDay
      ? { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
      : { day: '2-digit', month: 'short', year: 'numeric' };
  
    const formattedCheckIn = checkin.toLocaleDateString('en-GB', options);
    const formattedCheckOut = checkout.toLocaleDateString('en-GB', options);
  
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

   
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    // console.log(`Processed Check-In: ${checkInDate}`);
    // console.log(`Processed Check-Out: ${checkOutDate}`);

    // Hitung durasi malam dengan mengurangi tanggal check-out dari check-in
    const nightDuration = Math.max(
        0,
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
    );
  
    // Panggil callback dengan nightDuration
    onNightCalculated(nightDuration);
  
    return (
      <div>
        <p className='flex flex-wrap hp1:gap-3'>
          <span className='flex-center'>
            {formattedCheckIn} - {formattedCheckOut}
          </span>
          <span
            className={`${
              setWeekDay === true
                ? 'hidden hp2:block mx-1 p-1 hp4:rounded-2xl border-[1px] border-blue-800 bg-blue-50 text-blue-900 md:text-[11px] font-semibold'
                : 'hidden'
            }`}
          >
            {nightDuration} Night{nightDuration > 1 ? 's' : ''}
          </span>
        </p>
      </div>
    );
  };
  
  export const night = (nightDuration: number) => {
    // console.log(`Night duration from callback: ${nightDuration}`);
  };

  export const formatDate = (date: Date) => {
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Format 24 jam
      });
    };
  
  // Fungsi untuk menambahkan waktu default pada tanggal
  export const setDefaultTime = (date: Date, hours: number, minutes: number) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0); // Set jam dan menit sesuai
    return newDate;
  };
