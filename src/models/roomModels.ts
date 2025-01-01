

interface Review {
    name: number;
    email: string;
    image: string;
    comment: string;
}


interface Image {
    row:number;
    image:string;
}

export  interface RoomModels {
    _id: string;
    name: string;
    image: Image [],
    imagePoster: string;
    imageShort: string;
    maxCapacity: number;
    price:number;
    size: number;
    quantity:0;
    bedType: string;
    available: number;
    used: number;
    describe:string;
    shortDesc:string;
    facility: string [];
    review: Review[];
    createAt: number;
    creatorId: string;
    rating: number;

}


export interface ImageIn {
    row:number;
    image:string;
}

