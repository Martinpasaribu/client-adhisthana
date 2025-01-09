export const formatLocalISOIn = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '12');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format: YYYY-MM-DDTHH:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  export const formatLocalISOOut = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Format: YYYY-MM-DDTHH:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }