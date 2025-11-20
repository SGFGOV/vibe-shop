"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMedusaCart } from "@/hooks/useMedusaCart";

interface CartItem {
  id: string;
  variant_id?: string;
  product_id?: string;
  title?: string;
  name?: string;
  unit_price?: number;
  price?: number;
  quantity: number;
  image?: string[];
  product?: {
    id?: string;
    name?: string;
    image?: string[];
    prices?: {
      price?: number;
    };
  };
  [key: string]: unknown;
}

const CartBody = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { items, updateItemQuantity, emptyCart, cartTotal, isLoading } = useMedusaCart();
  
  const handleQuantityChange = async (itemId: string, newQuantity: number): Promise<void> => {
    try {
      await updateItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item: CartItem): Promise<void> => {
    await handleQuantityChange(item?.id, item?.quantity - 1);
  };

  const handleIncrease = async (item: CartItem): Promise<void> => {
    await handleQuantityChange(item?.id, item?.quantity + 1);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Handle checkbox change event
  const handleCheckboxChange = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {isClient && (
        <section className="cart-section ptb-120">
          <div className="container">
            <div className="select-all d-flex align-items-center justify-content-between bg-white rounded p-4">
              <div className="d-inline-flex gap-2 align-items-center">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkbox-field">
                    {isChecked && <i className="fa-solid fa-check"></i>}
                  </span>
                </div>
                <label htmlFor="select-all">
                  Select All({items?.length} ITEMS)
                </label>
              </div>
              <a
                href="#"
                type="button"
                className={`text-danger ${!isChecked ? "disabled-link" : ""}`}
                onClick={async () => {
                  try {
                    await emptyCart();
                  } catch (error) {
                    console.error("Error emptying cart:", error);
                  }
                }}
                style={{
                  pointerEvents: !isChecked ? "none" : "auto",
                  opacity: !isChecked ? 0.5 : 1,
                }}
              >
                <span className="me-2">
                  <i className="fa-solid fa-trash-can"></i>
                </span>
                Delete
              </a>
            </div>
            {items?.length === 0 ? (
              <div className="d-flex justify-content-center mt-10">
                Empty Cart
              </div>
            ) : (
              <>
                <div className="mt-4 bg-white rounded-2 overflow-hidden">
                  <table className="cart-table next_style w-100">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody className="cart_tbody">
                      {items.map((item: CartItem, i: number) => (
                        <tr key={i}>
                          <td>
                            <div className="border border-success border-opacity-25 w-[120px] h-[100px] p-3 rounded-md overflow-hidden">
                              <img
                                src={
                                  (item.image as string[])?.[0] ||
                                  item.product?.image?.[0] ||
                                  ""
                                }
                                alt="product-thumb"
                                className="w-full h-[100%] object-contain"
                              />
                            </div>
                          </td>
                          <td className="text-start product-title">
                            <h6 className="fw-medium tt-line-clamp tt-clamp-1 mb-0">
                              {item.name || item.title || item.product?.name || ""}
                            </h6>
                          </td>
                          <td>
                            <div className="product-qty d-inline-flex align-items-center">
                              <button
                                onClick={() => handleDecrease(item)}
                                className="decrese"
                              >
                                -
                              </button>
                              <input type="text" value={item.quantity} readOnly />
                              <button
                                onClick={() => handleIncrease(item)}
                                className="increase"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark fw-bold me-2 d-lg-none">
                              Unit Price:
                            </span>
                            <span className="text-dark fw-semibold">
                              ${((item.unit_price || item.price || 0) / 100).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <span className="text-dark fw-bold me-2 d-lg-none">
                              Total Price:
                            </span>
                            <span className="text-dark fw-bold">
                              ${(((item.unit_price || item.price || 0) / 100) * item.quantity).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row g-4">
                  <div className="col-xl-7"></div>
                  <div className="col-xl-5 ">
                    <div className="cart-summery bg-white rounded-2 pt-4 pb-6 px-5 mt-4 h-[100%]">
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <td className="py-3">
                              <h5 className="mb-0 fw-medium">Subtotal</h5>
                            </td>
                            <td className="py-3">
                              <h5 className="mb-0 fw-semibold text-end">
                                ${cartTotal.toFixed(2)}
                              </h5>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mb-5 mt-2">
                        Shipping options will be updated during checkout.
                      </p>
                      <div className="btns-group d-flex gap-3">
                        <Link
                          type="button"
                          href="/products"
                          className="btn btn-outline-secondary border-secondary btn-md rounded-1"
                        >
                          Continue Shopping
                        </Link>
                        <Link
                          type="submit"
                          href="/checkout"
                          className="btn btn-primary btn-md rounded-1"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CartBody;

