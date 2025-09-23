"use client";
import { useEffect, useState } from "react";

export default function FinancierDealPage() {
    const [deals, setDeals] = useState<any[]>([]);
    const fincancierAccountId = "0.0.6351690"; // TODO: replace with wallet integration

    useEffect(() => {
        fetch("http://localhost:8080/deals/purchaser/${financierAccountId}")
            .then(res => res.json())
            .then(data => setDeals(data));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Deals</h1>
            <ul className="space-y-4">
                {deals.map(d => (
                    <li key={d.id} className="p-4 bg-green-100 rounded shadow">
                        <div>Deal #{d.id}</div>
                        <div>Invoice ID: {d.invoiceId}</div>
                        <div>Purchase Price: {d.purchasePrice}</div>
                        <div>Status: {d.status}</div>
                        <div>
                            TxId:{" "}
                            {d.transactionId ? (
                                <a 
                                    href={`https://hashscan.io/testnet/transaction/${d.transactionId}`}
                                    target="_blank"
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