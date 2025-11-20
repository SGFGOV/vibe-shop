"use client";

import { getOrderByCode } from "app/backend/controllers/order.controller";
import { useState, useEffect } from "react";
import { Order } from "@/types";

interface UseOrderCodeResult {
  codeOrder: Order | null;
  codeOrderLoading: boolean;
}

const useOrderCode = (code?: string | number): UseOrderCodeResult => {
  const [codeOrder, setCodeOrder] = useState<Order | null>(null);
  const [codeOrderLoading, setCodeOrderLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!code) return;
      
      setCodeOrderLoading(true);
      try {
        const res = await getOrderByCode(code);
        setCodeOrder((res?.singleOrder as Order) || null);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setCodeOrderLoading(false);
      }
    };

    fetchData();
  }, [code]);

  return { codeOrder, codeOrderLoading };
};

export default useOrderCode;

