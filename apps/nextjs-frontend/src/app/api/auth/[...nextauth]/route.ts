import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MEDUSA_BACKEND_URL } from "../../../../lib/sdk";

// Extended types for NextAuth with MedusaJS token
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    medusaToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    medusaToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    medusaToken?: string;
  }
}

// MedusaJS API response types
interface MedusaAuthResponse {
  token?: string;
  location?: string;
  type?: string;
  message?: string;
}

interface MedusaCustomerResponse {
  customer: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        try {
          // Authenticate customer with MedusaJS
          // POST /auth/customer/emailpass returns { token: "..." } on success
          const authResponse = await fetch(`${MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          // Handle non-OK responses
          if (!authResponse.ok) {
            const errorData = await authResponse.json().catch(() => ({}));
            const errorMessage = errorData.message || "Invalid email or password";
            console.error("MedusaJS authentication failed:", errorMessage);
            throw new Error(errorMessage);
          }

          const authData = (await authResponse.json()) as MedusaAuthResponse;
          
          // If authData has a location property, it means third-party auth is required
          if (authData.location) {
            console.error("Third-party authentication required");
            throw new Error("Third-party authentication is required for this account");
          }

          // Extract JWT token from response
          // MedusaJS returns { token: "..." } according to documentation
          const token = authData.token;

          if (!token || typeof token !== "string") {
            console.error("No token received from MedusaJS");
            throw new Error("Authentication failed: No token received");
          }

          // Fetch customer details using the authenticated token
          const customerResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/customers/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!customerResponse.ok) {
            const errorText = await customerResponse.text();
            console.error("Failed to fetch customer details:", errorText);
            throw new Error("Failed to retrieve customer information");
          }

          const customerData = (await customerResponse.json()) as MedusaCustomerResponse;
          const { customer } = customerData;

          if (!customer || !customer.id) {
            throw new Error("Invalid customer data received");
          }

          // Return user object for NextAuth
            return {
              id: customer.id,
              email: customer.email || email,
              role: "Customer", // MedusaJS customers are always "Customer" role
            name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.email || email,
            medusaToken: token, // Store the MedusaJS token for authenticated API calls
            };
        } catch (error) {
          // Re-throw errors to be handled by NextAuth
          if (error instanceof Error) {
            throw error;
          }
          console.error("Unexpected error during MedusaJS authentication:", error);
          throw new Error("An unexpected error occurred during authentication");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.medusaToken = user.medusaToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.medusaToken = token.medusaToken;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// NextAuth handler for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
