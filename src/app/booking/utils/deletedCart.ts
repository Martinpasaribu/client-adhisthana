"use client"

import { http } from "@/utils/http";

export const DeletedCart = async () => {
    try {

        const response = http.put(`/booking/remove-cart`, {
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response ;

        return { success: true, message: result.data.message };

    } catch (error) {
      return { success: false, message: 'Terjadi kesalahan saat menghapus cart.' };
    }
  };
  


// export const DeletedCart = async () => {
//   try {
//     const response = await fetch('/api/cart', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     });

//     console.log('Response Headers:', response.headers); // Debug header respons

//     if (response.ok) {
    
//       const data = await response.json();
//       return { success: true, message: data.message };
//     } else {
//       const errorData = await response.json();
//       return { success: false, message: errorData.error || 'Gagal menghapus cart.' };
//     }
//   } catch (error) {
//     return { success: false, message: 'Terjadi kesalahan saat menghapus cart.' };
//   }
// };
