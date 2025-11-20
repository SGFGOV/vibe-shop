import { NextResponse } from "next/server";
import { sdk } from "../../../../lib/sdk";
import { FetchError } from "@medusajs/js-sdk";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface MedusaCustomerResponse {
  customer: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export async function POST(req: Request): Promise<NextResponse> {
  const { name, email, password } = await req.json() as SignupRequest;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Split name into first and last name
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Step 1: Try to register and get registration token
    let registrationToken: string;

    try {
      registrationToken = await sdk.auth.register("customer", "emailpass", {
        email,
        password,
      });
    } catch (error) {
      const fetchError = error as FetchError;

      // If identity already exists, try to login instead
      if (
        fetchError.statusText === "Unauthorized" &&
        fetchError.message === "Identity with email already exists"
      ) {
        // Try to login with the same credentials
        const loginResponse = await sdk.auth.login("customer", "emailpass", {
          email,
          password,
        });

        if (typeof loginResponse !== "string") {
          return NextResponse.json(
            { error: "Authentication requires additional steps" },
            { status: 400 }
          );
        }

        registrationToken = loginResponse;
      } else {
        // Other registration errors
        return NextResponse.json(
          { error: fetchError.message || "Failed to register customer" },
          { status: 400 }
        );
      }
    }

    // Step 2: Create customer using the registration/login token
    const { customer } = await sdk.store.customer.create(
      {
        email,
        first_name: firstName,
        last_name: lastName,
      },
      {},
      {
        Authorization: `Bearer ${registrationToken}`,
      }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: customer.id,
          email: customer.email,
          name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const fetchError = error as FetchError;
    console.error("Error creating customer:", error);

    // Handle duplicate customer error
    if (fetchError.message?.includes("already exists") || fetchError.statusText === "Conflict") {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: fetchError.message || "Failed to create user",
      },
      { status: 500 }
    );
  }
}

