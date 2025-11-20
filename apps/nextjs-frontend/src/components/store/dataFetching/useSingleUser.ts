"use client";

import { useState, useEffect } from "react";
import { useMainContextStore } from "../provider/MainContextStore";
import { useSession } from "next-auth/react";
import { getUserById } from "app/backend/controllers/user.controller";
import { User } from "@/types";

interface UseSingleUserResult {
  user: User | null;
  userLoading: boolean;
}

const useSingleUser = (): UseSingleUserResult => {
  const session = useSession();
  const { updateUserProfile, setUpdateUserProfile } = useMainContextStore();
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserById(session?.data?.user?.id as string);
        setUser((res as User) || null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setUserLoading(false);
        setUpdateUserProfile(false);
      }
    };

    if (session?.data?.user?.id) {
      fetchData();
    } else {
      setUserLoading(false);
    }
  }, [session?.data?.user?.id, updateUserProfile, setUpdateUserProfile]);

  return { user, userLoading };
};

export default useSingleUser;

