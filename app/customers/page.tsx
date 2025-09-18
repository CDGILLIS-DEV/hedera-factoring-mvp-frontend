"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/customers")
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <ul className="space-y-2">
        {customers.map((c) => (
          <li key={c.id} className="p-4 rounded shadow bg-blue-900 hover:bg-blue-700">
            <Link href={`/invoices?customerId=${c.id}`}>
              <div className="text-lg font-semibold text-blue-300 hover:underline">
                {c.name}
              </div>
              <div className="text-cyan-200">{c.email}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}