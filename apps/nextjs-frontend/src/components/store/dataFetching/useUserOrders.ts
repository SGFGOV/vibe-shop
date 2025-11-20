"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getOrdersByCustomerId } from "app/backend/controllers/order.controller.medusa";
import { Order } from "@/types";

interface UseUserOrdersResult {
  userOrders: Order[];
  userOrdersLoading: boolean;
}

const useUserOrders = (): UseUserOrdersResult => {
  const session = useSession();
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [userOrdersLoading, setUserOrdersLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Note: This requires customer_id from MedusaJS
        // For now, we'll use the NextAuth user ID, but ideally this should be
        // the MedusaJS customer ID after authentication migration
        const customerId = session?.data?.user?.id as string;
        if (customerId) {
          // TODO: Map NextAuth user ID to MedusaJS customer ID
          // For now, this will work if customer IDs match
          const orders = await getOrdersByCustomerId(customerId);
          setUserOrders(orders || []);
        }
      } catch (error) {
        console.error("Failed to fetch user orders:", error);
        setUserOrders([]);
      } finally {
        setUserOrdersLoading(false);
      }
    };

    if (session?.data?.user?.id) {
      fetchData();
    } else {
      setUserOrdersLoading(false);
    }
  }, [session?.data?.user?.id]);

  return { userOrders, userOrdersLoading };
};

export default useUserOrders;

