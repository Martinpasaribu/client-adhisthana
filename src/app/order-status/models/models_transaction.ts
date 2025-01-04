
export interface TransactionModels {
    _id: string;
    bookingId: string;
    userId: string;
    status: string;
    grossAmount: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    payment_method?: string;
    products?: Products[];
    snap_token: string;
    paymentUrl: string;     
}

interface Products {
    roomId: string;
    price: number; 
    quantity: number ;
}