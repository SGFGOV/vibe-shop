"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types";

interface MainContextStoreValue {
  updateUserProfile: boolean;
  setUpdateUserProfile: (value: boolean) => void;
  imageUrl: string;
  setImageUrl: (value: string) => void;
  openProductModal: boolean;
  setOpenProductModal: (value: boolean) => void;
  productDetails: Product | Record<string, never>;
  setProductDetails: (value: Product | Record<string, never>) => void;
  openOffcanvas: boolean;
  setOpenOffcanvas: (value: boolean) => void;
  demo: string;
  setDemo: (value: string) => void;
  hasHydrated: boolean;
}

const MainContextStore = createContext<MainContextStoreValue | undefined>(undefined);

export function useMainContextStore() {
  const context = useContext(MainContextStore);
  if (!context) {
    throw new Error("useMainContextStore must be used within a MainContextProviderStore");
  }
  return context;
}

interface MainContextProviderStoreProps {
  children: ReactNode;
}

export function MainContextProviderStore({ children }: MainContextProviderStoreProps) {
  const [updateUserProfile, setUpdateUserProfile] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openProductModal, setOpenProductModal] = useState(false);
  const [productDetails, setProductDetails] = useState<Product | Record<string, never>>({});
  const [openOffcanvas, setOpenOffcanvas] = useState(false);

  // Setting removed - using empty object
  const setting: {
    common?: {
      active_theme?: string;
    };
  } = {};
  const activeTheme = setting?.common?.active_theme;

  const [demo, setDemo] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("demo") || "grocery";
    setDemo(stored);
    setHasHydrated(true); // client-side hydration complete
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("demo", demo);
    }
  }, [demo, hasHydrated]);

  const contextValue: MainContextStoreValue = {
    updateUserProfile,
    setUpdateUserProfile,
    imageUrl,
    setImageUrl,
    openProductModal,
    setOpenProductModal,
    productDetails,
    setProductDetails,
    openOffcanvas,
    setOpenOffcanvas,
    demo,
    setDemo,
    hasHydrated,
  };

  return (
    <MainContextStore.Provider value={contextValue}>
      {children}
    </MainContextStore.Provider>
  );
}
