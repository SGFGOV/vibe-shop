"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import "./globals.css";
import "../assets/css/main.css";
import "rc-tree/assets/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { WishlistProvider } from "../components/store/provider/WishlistProvider";
import { MainContextProviderStore } from "../components/store/provider/MainContextStore";
import Offcanvas from "../components/store/common/nav/Offcanvas";
import Navbar from "../components/store/common/nav/Navbar";
import { AuthProvider } from "../components/store/provider/AuthProvider";
import Footer from "../components/store/common/nav/Footer";
import CartProviderContext from "../components/store/provider/CartProviderContex";
import ProductModal from "../components/store/common/others/ProductModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  // Store setting removed - using empty object
  const storeSetting: Record<string, unknown> = {};
  const stripeKey = storeSetting?.stripeKey as string | undefined;

  const stripePromise = useMemo<Promise<Stripe | null> | null>(
    () => (stripeKey?.startsWith("pk_") ? loadStripe(stripeKey) : null),
    [stripeKey]
  );

  // Setting removed - using empty object
  const setting: Record<string, unknown> = {};

  let title = "Home - Grostore Online Store";
  let description = "Welcome to my Next.js application!";

  // Adjust title and description based on the route
  if (pathname.startsWith("/products")) {
    title = "Products - Grostore Online Store";
    description = "Browse the latest products in the Grostore online store.";
  } else if (pathname.startsWith("/about")) {
    title = "About Us - Grostore Online Store";
    description = "Learn more about the Grostore online store and our mission.";
  } else if (pathname.startsWith("/contact")) {
    title = "Contact Us - Grostore Online Store";
    description = "Get in touch with the Grostore online store team.";
  }

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={(setting as { home?: { favicon?: string } })?.home?.favicon || "/favicon.ico"} />
      </head>
      <body cz-shortcut-listen="true">
        <AuthProvider>
          <CartProviderContext>
            <ToastContainer />
              <WishlistProvider>
                <MainContextProviderStore>
                    {(pathname === "/" ||
                      pathname.startsWith("/halal-food") ||
                      pathname.startsWith("/grocery") ||
                      pathname.startsWith("/products") ||
                      pathname.startsWith("/product-details") ||
                      pathname.startsWith("/invoice") ||
                      pathname === "/checkout" ||
                      pathname === "/cart" ||
                      pathname === "/medicine" ||
                      pathname === "/about" ||
                      pathname === "/contact" ||
                      pathname === "/blog" ||
                      pathname === "/my-account" ||
                      pathname === "/coupons" ||
                      pathname === "/terms-condition" ||
                      pathname.startsWith("/blog-details")) && (
                      <>
                        <Offcanvas />
                        <Navbar />
                      </>
                    )}
                    {stripePromise ? (
                      <Elements stripe={stripePromise}>{children}</Elements>
                    ) : (
                      <Elements stripe={stripePromise}>{children}</Elements>
                    )}
                    {(pathname === "/" ||
                      pathname.startsWith("/grocery") ||
                      pathname.startsWith("/halal-food") ||
                      pathname.startsWith("/products") ||
                      pathname.startsWith("/product-details") ||
                      pathname === "/about" ||
                      pathname === "/coupons" ||
                      pathname === "/blog" ||
                      pathname === "/checkout" ||
                      pathname === "/contact" ||
                      pathname === "/my-account" ||
                      pathname === "/cart" ||
                      pathname === "/contact" ||
                      pathname.startsWith("/blog-details")) && <Footer />}
                    <ProductModal />
                </MainContextProviderStore>
              </WishlistProvider>
          </CartProviderContext>
        </AuthProvider>
      </body>
    </html>
  );
}
