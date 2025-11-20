"use client";

import { useState, useEffect } from "react";
import { getAllOrders } from "../../../app/backend/controllers/order.controller.medusa";
import { Order } from "@/types";

interface UseOrdersResult {
  orders: Order[];
  ordersLoading: boolean;
}

const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllOrders({
          limit: 100, // Get up to 100 orders for statistics
        });
        setOrders((res as Order[]) || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchData();
  }, []);

  return { orders, ordersLoading };
};

export default useOrders;

