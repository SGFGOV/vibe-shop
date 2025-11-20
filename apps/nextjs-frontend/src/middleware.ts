import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface TokenPayload {
  role?: "Admin" | "Customer";
  [key: string]: unknown;
}

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req })) as TokenPayload | null;
  // console.log("Token===========================================", token); // Logs token for debugging

  const { pathname } = req.nextUrl;

  // If the user is trying to access the login page, allow it
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // If the token exists and the user is an Admin, allow access to the Admin dashboard
  if (token && token.role === "Admin") {
    // Admin cannot access /checkout, /my-account, or /cart
    if (
      pathname === "/checkout" ||
      pathname === "/my-account" ||
      pathname === "/cart"
    ) {
      const dashboardUrl = new URL("/admin", req.url); // Redirect Admin to /dashboard
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next(); // Allow access to other admin pages (e.g., /dashboard, /admin/*)
  }

  // If the token exists and the user is a Customer, redirect to the customer dashboard
  if (token && token.role === "Customer") {
    // Redirect Customer to their dashboard
    if (
      pathname === "/admin" ||
      pathname === "/admin/product" ||
      pathname === "/admid/category" ||
      pathname === "/admin/attributes" ||
      pathname === "/admin/coupon" ||
      pathname === "/admin/brands" ||
      pathname === "/admin/customers" ||
      pathname === "/admin/order" ||
      pathname === "admin/staff" ||
      pathname === "/admin/blogs" ||
      pathname === "/admin/store-customization"
    ) {
      const customerDashboardUrl = new URL("/my-account", req.url);
      return NextResponse.redirect(customerDashboardUrl);
    }
    return NextResponse.next(); // Allow Customer to access their dashboard
  }

  // If the user is not authenticated or doesn't have a valid role, redirect to login
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url); // Set callbackUrl to redirect after login
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout", "/admin/:path*", "/my-account", "/cart"], // Include customer dashboard
};
