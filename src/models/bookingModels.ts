

export interface BookingModels {

    _id: string;
    oderId: string;
    checkIn: string;
    checkOut: string;

    room : number;
    adult: number;
    children: number;
    amountTotal: number;
    amountBefDisc: number;
    
    couponId: number;
    idUser:string ;
    idRoom : string;
    
    createAt: number;
    creatorId: string;
}


interface roomModels {

    roomId : string;
    quantity: number;

}



export interface ReservationModel {

    bookingId : string,
    title:string,
    name: string,
    email: string,
    phone: number,
    status: string,
    userId : string,
    checkIn : string | Date ,
    checkOut : string | Date,
    grossAmount : number,
    paymentUrl : string,
    room: roomModels[],


}
