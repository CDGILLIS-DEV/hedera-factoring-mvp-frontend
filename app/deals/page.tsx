"use client";
import { useState, useEffect } from "react";

export default function DealList() {
    const [ deals, setDeals ] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/deals")
        .then(res => res.json())
        .then(data => setDeals(Array.isArray(data) ? data: [data]))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-8">Loading deals...</div>;
    
    return (
        <div className="space-y-4">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Deals</h1>
            <ul className="space-y-3">
              {deals.map(d => (
                <li key={d.id} className="p-4 bg-blue-900 rounded shadow">
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
                         className="text-blue-300 underline"
                        >
                         {d.transactionId}   
                        </a>
                      ) : ("N/A")}
                    </div>
                </li>
              ))}  
            </ul>
          </div> 
        </div>
    );
}