"use client";

import { ReactNode } from "react";

interface CartProviderContextProps {
  children: ReactNode;
}

// MedusaJS cart doesn't require a provider - it's managed via the hook
// This component is kept for compatibility but doesn't wrap anything
const CartProviderContext = ({ children }: CartProviderContextProps) => {
  return <>{children}</>;
};

export default CartProviderContext;

