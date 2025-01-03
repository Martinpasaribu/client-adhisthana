export interface TransactionModels {

    _id: string;
    bookingId: string;
    userId: string;
    status: string;
    payment_method: string;
    grossAmount : number;
    products : { roomId: string; quantity: number, price: number }[];
    createAt: number;
    creatorId: string;
}

