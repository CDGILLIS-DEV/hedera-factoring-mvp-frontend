"use client";
import { useEffect, useState } from "react";

export default function FinancierDashboard() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const financierAccountId = "0.0.6351690"; // TODO: replace with wallet integration

    useEffect(() => {
        fetch("http://localhost:8080/invoices/open")
        .then(res => res.json())
        .then(data => setInvoices(data));
    }, []);

    const handleFund = async (invoiceId: number, amount: number) => {
        const resp = await fetch("http://localhost:8080/deals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                invoiceId,
                purchaserAccountId: financierAccountId,
                purchasePrice: amount
            }),
        });
        if (resp.ok) {
            alert("Funded!");
            setInvoices(prev => prev.filter(inv => inv.id !== invoiceId)); //remove funded invoice
        } else {
            alert("Funding faild");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Available Invoices</h1>
            <ul>
                {invoices.map(inv => (
                   <li key={inv.id} className="p-4 bg-gray-100 rounded shadow">
                        <div>Invoice #{inv.id}</div>
                        <div>Customer: {inv.customerName ?? "Unknown"}</div>
                        <div>Status: {inv.status}</div>
                        <button
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={() => handleFund(inv.id, inv.amount)}
                        >
                            Fund This Invoice
                        </button>
                   </li> 
                ))}
            </ul>  
        </div>
    );
}