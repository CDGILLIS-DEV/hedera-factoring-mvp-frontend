"use client";

import { data } from "autoprefixer";
import { useState, useEffect } from "react";

export default function FinancierDashboard() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const financierAccountId = "0.0.6351690" // TODO: replace with wallet integration
    
    // Fetch all fundable invoices
    useEffect(() => {
        fetch("http://localhost:8080/invoices/open")
        .then(res => res.json())
        .then(data => setInvoices(Array.isArray(data) ? data : [data]))
        .catch(err => console.error("Failed to load invoices", err))
    }, []);

    // Fund Invoice
    const handleFund = async (invoiceId: number, amount: number) => {
        try {
            const resp = await fetch("http://localhost:8080/deals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invoiceId: invoiceId,
                    purchaserAccountId: financierAccountId,
                    purchasePrice: amount
                }),
            });

            if (!resp.ok) {
                const errTxt =  await resp.text();
                console.error("Funding failed:", resp.status, errTxt);
                alert("Funding failed: " + errTxt);
                return;
            }

            const deal = await resp.json();
            console.log("Fund succeeded:", deal);
            alert(`Transaction successful! Deal #${deal.id}`);

            // Remove funded invoice from "open" list
            setInvoices(prev => prev.filter(i => i.id !== invoiceId));
        } catch (err) {
            console.error("Fund error:", err);
            alert("Funding failed (network error)");
        }
    };

    console.log(invoices);
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Financier Dashboard</h1>

            {invoices.length == 0 ? (
                <p>No open invoices available.</p>
            ) : (
                <ul className="space-y-4">
                    {invoices.map(inv => (
                        <li key={inv.id ?? `invoice-${inv.invoiceId}`} className="p-4 bg-gray-100 rounded shadow space-y-1">
                            <div><strong>Invoice #{inv.id}</strong></div>
                            <div>Customer: {inv.customerId}</div>
                            <div>Amount: {inv.amount} {inv.currency}</div>
                            <div>Status: {inv.status}</div>
                            <div>Due: {inv.dueDate}</div>

                            <button
                            onClick={() => handleFund(inv.id, inv.amount)}
                            className="mask-t-to-red-200 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Fund This Invoice
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

