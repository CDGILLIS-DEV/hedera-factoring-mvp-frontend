 "use client";
 import { useDebugValue, useEffect, useState } from "react";
 import { fetchCustomers } from "@/lib/api";

import Image from "next/image";

export default function HomePage() {
  // const [customers, setCustomers] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchCustomers().then(setCustomers).finally(() => setLoading(false));
  // }, []);

  // if (loading) return <div className="p-8">Loading customers...</div>;

  // return (
  //   <div className="p-8 ">
  //     <h1 className="text-2xlo font-bold mb-4">Customers</h1>
  //     <ul className="space-y-2">
  //       {customers.map(c => (
  //         <li key={c.id} className="p-4 bg-gray-100 rounded shadow">
  //           <div className="font-semibold text-cyan-600">{c.name}</div>
  //           <div className="text-sm text-gray-600">{c.email}</div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-20">Welcome!!</h1>
    </div>
  )
}
