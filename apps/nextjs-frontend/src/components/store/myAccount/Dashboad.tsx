"use client";
import dayjs from "dayjs";
import useUserOrders from "../dataFetching/useUserOrders";
import Loading from "../common/others/Loading";
import Link from "next/link";
import Skeleton from "../common/skeletonLoader/Skeleton";
import { Order } from "@/types";

const Dashboad = () => {
  const { userOrders, userOrdersLoading } = useUserOrders();
  
  return (
    <>
      <div className="recent-orders bg-white rounded">
        <h6 className="mb-4 px-4 pt-4">Recent Orders</h6>
        <div className="table-responsive">
          <table className="order-history-table table">
            <thead>
              <tr>
                <th>Order Number#</th>
                <th>Placed on</th>
                <th>Method</th>
                <th>Status</th>
                <th>Total</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {userOrdersLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Skeleton width="100px" height="20px" />
                      </td>
                      <td>
                        <Skeleton width="80px" height="20px" />
                      </td>
                      <td>
                        <Skeleton width="80px" height="20px" />
                      </td>
                      <td>
                        <Skeleton width="100px" height="20px" />
                      </td>
                      <td>
                        <Skeleton width="60px" height="20px" />
                      </td>
                      <td className="text-center">
                        <Skeleton width="40px" height="20px" />
                      </td>
                    </tr>
                  ))
                : Array.isArray(userOrders) &&
                  (userOrders as Order[]).map((order, i) => (
                    <tr key={i}>
                      <td>#G-Store: {order?.orderCode}</td>
                      <td>{dayjs(order?.createdAt).format("YYYY-MM-DD")}</td>
                      <td>{order.paymentMethod}</td>
                      <td
                        className={`${
                          order.status === "Processing"
                            ? "text-warning"
                            : order.status === "Pending"
                            ? "text-danger"
                            : order.status === "Delivered"
                            ? "text-primary"
                            : ""
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="text-secondary">${order.total}.00</td>
                      <td className="text-center">
                        <Link
                          href={`/invoice/${order.orderCode}`}
                          className="view-invoice fs-xs"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      {Array.isArray(userOrders) && userOrders.length === 0 && (
        <p className="text-center text-muted bg-light border rounded p-3 shadow-sm mt-10">
          Not yet ordered
        </p>
      )}
    </>
  );
};

export default Dashboad;

