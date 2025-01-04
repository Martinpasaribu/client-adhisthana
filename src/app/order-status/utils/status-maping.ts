

export const statusMapping = (status : any) => {
    switch(status) {
        case 'PENDING_PAYMENT':
            return 'Menunggu Pembayaran';
        case 'PAID':
            return 'Pembayaran Berhasil';
        case 'CANCELED':
            return 'Pesanan Dibatalkan';
        default:
            return 'Menunggu Pembayaran';
    }
};