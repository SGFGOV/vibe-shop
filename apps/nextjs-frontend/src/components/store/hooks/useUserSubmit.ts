"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSingleUser from "../dataFetching/useSingleUser";
import { useMainContextStore } from "../provider/MainContextStore";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { updateUserProfile } from "app/backend/controllers/user.controller";

interface UserFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
  userName: string;
  birthday: string;
}

interface UseUserSubmitResult {
  updateProfile: (data: UserFormData) => Promise<void>;
  handleSubmit: ReturnType<typeof useForm<UserFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<UserFormData>>["formState"]["errors"];
  register: ReturnType<typeof useForm<UserFormData>>["register"];
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const useUserSubmit = (): UseUserSubmitResult => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>();
  const session = useSession();
  const { setUpdateUserProfile, imageUrl, setImageUrl } = useMainContextStore();

  const { user } = useSingleUser();

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("address", user.address || "");
      setValue("phone", user.contact || "");
      setValue("email", user.email || "");
      setValue("userName", user.username || "");
      const formattedDate = user.birthday ? dayjs(user.birthday).format("YYYY-MM-DD") : "";
      setValue("birthday", formattedDate);
      setImageUrl(user?.img || "");
    }
  }, [user, setValue, setImageUrl]);

  const updateProfile = async (data: UserFormData) => {
    const userUpdateData = {
      address: data.address,
      name: data.name,
      phone: data.phone,
      userName: data.userName,
      img: imageUrl,
      birthday: data.birthday ? new Date(data.birthday) : undefined,
    };

    try {
      const res = await updateUserProfile(
        session?.data?.user?.id as string,
        userUpdateData
      );

      if (res?.message) {
        toast.success(res.message);
        setUpdateUserProfile(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return {
    updateProfile,
    handleSubmit,
    errors,
    register,
    imageUrl,
    setImageUrl,
  };
};

export default useUserSubmit;

