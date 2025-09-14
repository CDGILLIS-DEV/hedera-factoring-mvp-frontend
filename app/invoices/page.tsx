"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { data } from "autoprefixer";

export default function InvoicePage() {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    
    const [ invoices, setInvoices ] = useState<any[]>([]);
    const [ loading, setLoading ] = useState(true);

    // Form state
    const [amount, setAmount] = useState("");
    const [ currency, setCurrency ] = useState("USD");
    const [ dueDate, setDueDate ] = useState("");

    useEffect(() => {
        if (customerId) {
            fetch(`http://localhost:8080/customers/${customerId}/invoices`)
            .then(res => res.json())
            .then(data => {
              setInvoices(Array.isArray(data) ? data: [data])
            })
            .finally(() => setLoading(false));
        }
    }, [customerId]);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const newInvoice = {
            customerId: Number(customerId),
            amount: parseFloat(amount),
            currency,
            dueDate,
            status: "OPEN"
        };
        // Send create request
        await fetch("http://localhost:8080/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newInvoice),
        });
        // refresh updated list of invoices
        const updated = await fetch(`http://localhost:8080/customers/${customerId}/invoices`).then(r => r.json());

        setInvoices(updated);
        setAmount("");
        setCurrency("USD");
        setDueDate("");
    }

    if (loading) return <div className="p-8">Loading invoices...</div>;

    return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Invoices for Customer {customerId}</h1>

          <form onSubmit={handleCreate} className="mb-6 space-y-4">
            <input 
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <input 
              type="text"
              placeholder="Currency"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <input 
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Invoice
            </button>
        </form>
        
        <ul className="space-y-2">
            {Array.isArray(invoices) && invoices.map((inv) => (
                <li key={inv.id} className="p-4 bg-gray-600 rounded shadow">
                    <div className="font-semibold text-green-600">Amount: ${inv.amount} {inv.currency ?? "USD"}</div>
                    <div className="text-sm text-yellow-600">
                        Due: {inv.dueDate ?? "N/A"} | Status: {inv.status}
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
}