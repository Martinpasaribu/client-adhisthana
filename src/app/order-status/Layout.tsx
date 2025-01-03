/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { http } from "@/utils/http";


import  { Main_Layout }  from "./component/Layout";
import './order-status.css'

import { statusMapping } from "./utils/status-maping";
import { Button } from "./component/button";
import { Input } from "./component/input";
import { TransactionModels } from "./models/models_transaction";
import { ProductItem } from "./component/ProductItems";
import { Item } from "./component/Item";

const Layout = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [transaction, setTransaction] = useState<TransactionModels | null>();
    const [searchTransactionId, setSearchTransactionId] = useState('');
    const [emptyMessage, setEmptyMessage] = useState('');

    const getTransactionDetail = useCallback(async (transactionId : any) => {

        if(!transactionId) return alert('Transaction ID harus diisi');
        const response = await fetch(`${http}/get-transaction/${transactionId}`);
        const res = await response.json();
        if(res.data) {
            setTransaction(res.data);

            const newParams = new URLSearchParams(searchParams);
            newParams.set('transaction_id', transactionId);

            router.replace(`?${newParams.toString()}`);
           
            setEmptyMessage('');
        } else {
            setEmptyMessage('Transaksi tidak ditemukan');
                setTransaction(null);
            const newParams = new URLSearchParams(searchParams);
            newParams.set('transaction_id', '');

            router.replace(`?${newParams.toString()}`);
           
            setEmptyMessage('');
        }

    }, [searchParams])
    
    useEffect(() => {
        const transactionId = searchParams.get('transaction_id');
        if(transactionId) {
            getTransactionDetail(transactionId);
        } else {
            setEmptyMessage('Belum ada transaksi yang dicari, silahkan masukkan ID Transaksi');
        }
    }, [getTransactionDetail, searchParams]);

    return (
        <Main_Layout title="Status Pesanan" onBack={() =>  router.replace('/')}>
            <Input label="Kode Pesanan" value={searchTransactionId} onChange={(e: any) => setSearchTransactionId(e.target.value)} type={""} />
            <Button onClick={() => getTransactionDetail(searchTransactionId)}>Cek Status Pesanan</Button>
            <hr/>
            {emptyMessage && <p className="empty-message">{emptyMessage}</p>}
            {transaction && (
                <>
                    <div className="transaction-status">
                        <Item label="Transaction ID" value={transaction.bookingId} />
                        <Item label="Customer Name" value={transaction.userId} />
                        <Item label="Customer Email" value={transaction.userId} />
                        <Item label="Status" value={statusMapping(transaction.status)} />
                        {transaction.payment_method && (
                            <Item label="Payment Method" value={transaction.payment_method} />
                        )}
                    </div>0
                    <div className="transaction-status">
                        {
                        transaction.products.map((product) => (
                            <ProductItem key={product.roomId} name={product.roomId} price={product.price} totalItem={product.quantity} />
                        )
                        )}

                        <ProductItem name="Total" price={transaction.grossAmount} totalItem={10} />

                    </div>
                </>
            )}
        </Main_Layout>
    );
};

export default Layout;