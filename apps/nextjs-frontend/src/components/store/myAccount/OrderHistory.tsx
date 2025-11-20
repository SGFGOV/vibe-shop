"use client";

import dayjs from "dayjs";
import useUserOrders from "../dataFetching/useUserOrders";
import Loading from "../common/others/Loading";
import Link from "next/link";
import { Order } from "@/types";

const OrderHistory = () => {
  const { userOrders, userOrdersLoading } = useUserOrders();
  if (userOrdersLoading) return <Loading loading={userOrdersLoading} />;

  return (
    <>
      {Array.isArray(userOrders) && userOrders.length > 0 ? (
        <div className="recent-orders bg-white rounded">
          <h6 className="mb-4 px-4 pt-4">Your Orders</h6>

          <div className="table-responsive">
            <table className="order-history-table table">
              <thead>
                <tr>
                  <th scope="col">Order Number#</th>
                  <th scope="col">Placed on</th>
                  <th scope="col">Method</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {userOrders.map((order: Order) => (
                  <tr key={order._id ?? order.orderCode}>
                    <td>#G-Store: {order?.orderCode}</td>
                    <td>{dayjs(order?.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{order?.paymentMethod}</td>
                    <td>{order?.status}</td>
                    <td className="text-secondary">
                      ${Number(order?.total ?? 0).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <Link
                        href={`/invoice/${order.orderCode}`}
                        className="view-invoice fs-xs"
                      >
                        <i className="fas fa-eye" aria-hidden="true"></i>
                        <span className="sr-only">View invoice</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted bg-light border rounded p-3 shadow-sm mt-10">
          Not yet ordered
        </p>
      )}
    </>
  );
};

export default OrderHistory;

