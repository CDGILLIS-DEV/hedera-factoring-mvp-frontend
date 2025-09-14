"use client";
import { useState, useEffect } from "react";

export default function DealList() {
    const [ deals, setDeals ] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/deals")
        .then(res => res.json())
        .then(setDeals);
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Deals</h1>
            <ul className="space-y-3">
              {deals.map(d => (
                <li key={d.id} className="p-4 bg-green-100 rounded shadow">
                    <div>Invoice ID: {d.invoiceId}</div>
                    <div>Purchaser: {d.purchaserAccountId}</div>
                    <div>Purchase Price: {d.purchasePrice}</div>
                    <div>Status: {d.status}</div>
                    <div>
                      TxId:{" "}
                      {d.transactionId ? (
                        <a 
                         href={`https://hashscan.io/testnet/transaction/${d.transactionId}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-blue-600 underline"
                        >
                         {d.transactionId}   
                        </a>
                      ) : ("N/A")}
                    </div>
                </li>
              ))}  
            </ul>
        </div>
    );
}