"use client";

import Link from "next/link";
import { useMedusaCart } from "@/hooks/useMedusaCart";
import { Product } from "@/types";

const ShoppingBegHoverContent = () => {
  const { items, removeItem, cartTotal, itemCount } = useMedusaCart();

  return (
    <>
      <div className="gshop-header-cart position-relative">
        <button type="button" className="header-icon">
          <svg
            width="18"
            height="25"
            viewBox="0 0 22 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1704 23.9559L19.6264 7.01422C19.5843 6.55156 19.1908 6.19718 18.7194 6.19718H15.5355V4.78227C15.5355 2.14533 13.3583 0 10.6823 0C8.00628 0 5.82937 2.14533 5.82937 4.78227V6.19718H2.6433C2.17192 6.19718 1.77839 6.55156 1.73625 7.01422L0.186259 24.0225C0.163431 24.2735 0.248671 24.5223 0.421216 24.7082C0.593761 24.8941 0.837705 25 1.0933 25H20.2695C20.2702 25 20.2712 25 20.2719 25C20.775 25 21.1826 24.5982 21.1826 24.1027C21.1825 24.0528 21.1784 24.0036 21.1704 23.9559ZM7.65075 4.78227C7.65075 3.1349 9.01071 1.79465 10.6824 1.79465C12.3542 1.79465 13.7142 3.1349 13.7142 4.78227V6.19718H7.65075V4.78227ZM2.08948 23.2055L3.47591 7.99183H5.82937V9.59649C5.82937 10.0921 6.237 10.4938 6.74006 10.4938C7.24313 10.4938 7.65075 10.0921 7.65075 9.59649V7.99183H13.7142V9.59649C13.7142 10.0921 14.1219 10.4938 14.6249 10.4938C15.128 10.4938 15.5356 10.0921 15.5356 9.59649V7.99183H17.8869L19.2733 23.2055H2.08948Z"
              fill="#5D6374"
            />
          </svg>
          <span className="cart-counter badge bg-primary rounded-circle p-0">
            {itemCount}
          </span>
        </button>
        {items.length === 0 || itemCount === 0 ? (
          <div className="cart-box-wrapper w-80 h-100">
            <p className="text-center bg-white text-danger shadow-lg py-4">
              Empty cart
            </p>
          </div>
        ) : (
          <div className="cart-box-wrapper">
            <div className="apt_cart_box theme-scrollbar">
              <ul
                className="at_scrollbar scrollbar cart-navbar-wrapper"
                style={{
                  height: "auto",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {items.map((item, i) => (
                  <li key={i} className="d-flex align-items-center">
                    <div className="thumb-wrapper">
                      <Link href="#">
                        <img
                          src={
                            (item.product?.image && Array.isArray(item.product.image))
                              ? item.product.image[0]
                              : (item.product?.image as string | undefined) ||
                                ""
                          }
                          alt="products"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="items-content ms-3">
                      <Link href={`/product-details/${item._id || item.id}`}>
                        <h6 className="tt-line-clamp tt-clamp-1 max-text-30 mb-1">
                          {String(item.name || item.title || item.product?.name || "")}
                        </h6>
                      </Link>
                      <div className="products_meta d-flex align-items-center justify-content-between">
                        <div>
                          <span className="price text-primary fw-semibold mx-1">
                            ${((Number(item.unit_price) || Number(item.price) || 0) / 100).toFixed(2)}
                          </span>

                          <span className="count">x {item.quantity}</span>
                        </div>
                        <button
                          onClick={async () => {
                            try {
                              await removeItem(item.id);
                            } catch (error) {
                              console.error("Error removing item:", error);
                            }
                          }}
                          className="remove_cart_btn"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-footer d-flex align-items-center justify-content-between p-4 border-top">
                <h6 className="mb-0 fw-bold">Total:</h6>
                <h6 className="mb-0 fw-bold text-primary">
                  ${cartTotal.toFixed(2)}
                </h6>
              </div>
              <div className="cart-footer-btn p-4 border-top">
                <Link
                  href="/cart"
                  className="btn btn-outline-secondary btn-sm w-100 mb-2"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="btn btn-primary btn-sm w-100"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingBegHoverContent;
