"use client"

/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { http } from "@/utils/http";

import { Main_Layout } from "./component/Layout";
import "./order-status.css";

import { statusMapping } from "./utils/status-maping";
import { Button } from "./component/button/button";
import { Input } from "./component/input";
import { TransactionModels } from "./models/models_transaction";
import { ProductItem } from "./component/ProductItems";
import { Item } from "./component/Item";
import PaymentUrl from "./component/Payment_URL";
import Transaction from "./component/skeleton/transaction";
import TransactionSkeleton from "./component/skeleton/transaction";
import MainLoading from "@/component/mainLoading/loading";
import { formatTanggal } from "./utils/FormatTangal";

const Layout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ load, setLoad] = useState(false)

  const [transaction, setTransaction] = useState<TransactionModels | null>(
    null
  );
  const [searchTransactionId, setSearchTransactionId] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");

  const getTransactionDetail = useCallback(
    async (transactionId: string) => {
      
      if (!transactionId) {

        return alert("Transaction ID harus diisi");

      }

      try {

        setLoad(true);

        const response = await fetch(`/api/getTransaction?order_id=${transactionId}`);

        const res = await response.json();

        if (res) {
          setTransaction(res);

          // Update query parameter di URL
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("order_id", transactionId);

          router.replace(`?${newParams.toString()}`);
          setEmptyMessage("");
        } else {
          setEmptyMessage("Transaksi tidak ditemukan");
          setTransaction(null);

          const newParams = new URLSearchParams(searchParams.toString());
          newParams.delete("order_id");

          router.replace(`?${newParams.toString()}`);
        }

        setLoad(false);

      } catch (error) {
        console.error("Error fetching transaction:", error);
        setEmptyMessage("Terjadi kesalahan saat mengambil data transaksi");

      }finally {
        setLoad(false); 
      }
    },
    [searchParams, router]
  );

  useEffect(() => {
    const transactionId = searchParams.get("order_id");
    console.log("Transaction ID dari URL:", transactionId);

    if (transactionId) {
      getTransactionDetail(transactionId);
    } else {
      setEmptyMessage(
        "Belum ada transaksi yang dicari, silahkan masukkan ID Transaksi"
      );
    }
  }, [getTransactionDetail, searchParams]);

  return (

    <Main_Layout title="Status Pesanan" onBack={() => router.replace("/")}>

      { load && (<MainLoading/>)}

      <Input
        label="Kode Transaksi"
        value={searchTransactionId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTransactionId(e.target.value)
        }
        type="text"
      />
      
      <Button onClick={() => getTransactionDetail(searchTransactionId)}>
        Cek Transaksi
      </Button>
      <hr />
      {emptyMessage && <p className="empty-message">{emptyMessage}</p>}
      
      {!transaction ? (

        <TransactionSkeleton />

        ) : (

            <>

            <div className="transaction-status h-full">

                <div className="flex justify-between">
                  <Item label="Transaction ID" value={transaction.bookingId} style="value" />
                  <div className="flex flex-col gap-4 border-[1px] p-1 border-slate-700 rounded-md">
                      <div className="text-left">
                        <h1 className="text-[14px] font-semibold "> Check-In </h1>
                        <h1 className="text-[13px]"> {formatTanggal(transaction.checkIn)} </h1>
                      </div>
                      <div className="text-left">
                        <h1 className="text-[14px] font-semibold "> Check-Out </h1>
                        <h1 className="text-[13px] "> {formatTanggal(transaction.checkOut)} </h1>
                      </div>
                  </div>
                </div>

                <Item label="Customer Name" value={transaction.name}  style="value" />
                <Item label="Customer Email" value={transaction.email}  style="value"/>
                
                <div className="flex justify-between items-center">
                    
                    <Item label="Status" value={statusMapping(transaction.status)}  style="value"/>

                    {(transaction.status === 'CANCELED' || transaction.status === 'PENDING_PAYMENT') &&  
                        <PaymentUrl url={transaction.paymentUrl} />
                    }


                </div>
                {transaction.payment_type && (

                    <Item label="Payment Method" value={transaction.payment_type}  style="text-blue-500"/>

                )}

            </div>

            <div className="transaction-status">
                
                { transaction && transaction.products?.map((product) => (

                <ProductItem

                    style="item-product-status "
                        key={product.roomId}
                        name={product.name}
                        nameAdditional={product.nameAdditional}
                        price={product.price}
                        totalItem={product.quantity}
                />
                ))}

                <ProductItem
                    style=" text-color2 font-bold text-md md:text-xl flex justify-between"
                    name="Total"
                    nameAdditional=""
                    price={transaction.grossAmount}
                    totalItem={0}
                />
            </div>

            </>
    
    )}

      
    </Main_Layout>
  );
};

export default Layout;
