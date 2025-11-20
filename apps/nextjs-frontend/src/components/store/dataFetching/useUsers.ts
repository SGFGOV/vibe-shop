"use client";

import { useState, useEffect } from "react";
import { sdk } from "../../../lib/sdk";
import { User } from "@/types";

interface UseUsersResult {
  users: User[];
  usersLoading: boolean;
}

interface MedusaCustomer {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Transform MedusaJS customer to User type for compatibility
 */
function transformCustomer(customer: MedusaCustomer): User {
  return {
    id: customer.id,
    _id: customer.id,
    email: customer.email,
    name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.email,
    role: "Customer",
    status: "show",
    createdAt: new Date(customer.created_at),
    updatedAt: new Date(customer.updated_at),
  };
}

const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use MedusaJS Admin SDK to get all customers
        // Note: This requires admin authentication, but for public stats we can use store API
        // For now, we'll use admin API - in production, you might want to create a public stats endpoint
        const { customers = [] } = await sdk.admin.customer.list({
          limit: 100, // Get up to 100 customers for statistics
        });

        const transformedUsers = customers.map((customer) =>
          transformCustomer(customer as MedusaCustomer)
        );
        setUsers(transformedUsers);
      } catch (error) {
        console.error("Failed to fetch customers from MedusaJS:", error);
        // Fallback to empty array if admin API is not available
        // In production, consider using a public stats endpoint
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, usersLoading };
};

export default useUsers;
