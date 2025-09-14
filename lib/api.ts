export async function fetchCustomers() {
  const res = await fetch("http://localhost:8080/customers");
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
}

export async function fetchInvoicesForCustomers(customerId: number) {
  const res = await fetch(`http://localhost:8080/customers/${customerId}/invoices`);
  return res.json();
}

export async function fetchDealsForInvoices(invoiceId: number) {
  const res = await fetch(`http://localhost:8080/invoices/${invoiceId}/deals`);
  return res.json();
}