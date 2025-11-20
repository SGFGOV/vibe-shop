"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/app/backend/controllers/order.controller.medusa";
import { Order } from "@/types";
import Loading from "@/components/store/common/others/Loading";
import { toast } from "react-toastify";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        router.push("/");
        return;
      }

      try {
        const orderData = await getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
        } else {
          toast.error("Order not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return <Loading loading={true} />;
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Order not found</div>
        <Link href="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success" style={{ fontSize: "4rem" }}></i>
              </div>
              <h1 className="mb-3">Order Confirmed!</h1>
              <p className="lead mb-4">
                Thank you for your purchase. Your order has been placed successfully.
              </p>
              
              <div className="bg-light p-4 rounded mb-4">
                <h5 className="mb-3">Order Details</h5>
                <div className="row text-start">
                  <div className="col-md-6 mb-2">
                    <strong>Order ID:</strong> {order.orderCode || order.id}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Status:</strong> {order.status}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </div>
                  <div className="col-md-6 mb-2">
                    <strong>Date:</strong>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Link href="/my-account" className="btn btn-primary">
                  View My Orders
                </Link>
                <Link href="/products" className="btn btn-outline-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

