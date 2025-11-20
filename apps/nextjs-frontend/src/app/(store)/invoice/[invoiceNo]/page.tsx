"use client";

import Invoice from "components/store/invoice/Invoice";

interface PageProps {
  params: Promise<{ invoiceNo: string }>;
}

export default async function InvoicePage({ params }: PageProps) {
  const { invoiceNo } = await params;
  return (
    <>
      <Invoice invoiceNo={invoiceNo} />
    </>
  );
}

