"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMedusaCart } from "@/hooks/useMedusaCart";
import { useMedusaCheckout } from "@/hooks/useMedusaCheckout";
import { getAllCoupons } from "app/backend/controllers/coupon.controller";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import dayjs from "dayjs";
import Loading from "../common/others/Loading";
import { toast, ToastContainer } from "react-toastify";
import { transformToMedusaAddress } from "app/backend/controllers/checkout.controller.medusa";
import { Coupon } from "@/types";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shipping: string;
  payment: string;
}

interface CouponInfo {
  couponCode?: string;
  discountPercentage?: number;
  [key: string]: unknown;
}

const CheckoutBody = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Store setting removed - using empty object
  const storeSetting: Record<string, unknown> = {};
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<CheckoutFormData>();
  const router = useRouter();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponInfo, setCouponInfo] = useState<CouponInfo>({});
  const { cart, items, updateItemQuantity, emptyCart, cartTotal } = useMedusaCart();
  const {
    setEmail,
    setAddresses,
    setShippingMethod,
    getShippingOptions,
    setPaymentMethod,
    getPaymentProviders,
    completeCheckout,
    isLoading: checkoutLoading,
  } = useMedusaCheckout();
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [shippingOptions, setShippingOptions] = useState<unknown[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState<string>("");

  const taxes =
    cartTotal * 0.01 < 50
      ? Math.floor(cartTotal * 0.01)
      : Math.ceil(cartTotal * 0.01);

  const grandTotal = shippingCost + taxes + cartTotal - discount;

  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [createOrderLoading, setCreateOrderLoading] = useState(false);

  const handleCheckoutSubmit = async () => {
    const isValid = await trigger();

    if (!isValid || !cart?.id) {
      return;
    }

    try {
      setCreateOrderLoading(true);
      const values = getValues();
      const { name, email, payment, address, phone } = values;

      // Step 1: Set email on cart
      await setEmail(email);

      // Step 2: Set addresses
      const shippingAddress = transformToMedusaAddress({
        name,
        email,
        phone,
        address,
        country: (cart as { region?: { countries?: Array<{ iso_2?: string }> } })?.region?.countries?.[0]?.iso_2 || "us",
      });
      await setAddresses(shippingAddress);
      
      // Step 2.5: Load shipping options after addresses are set
      const shippingOpts = await getShippingOptions();
      setShippingOptions(shippingOpts);

      // Step 3: Set shipping method (if selected)
      if (selectedShippingOption) {
        await setShippingMethod(selectedShippingOption);
      }

      // Step 4: Handle payment
      if (selectedPaymentMethod === "card") {
        // Get payment providers and find Stripe
        const providers = await getPaymentProviders();
        const stripeProvider = providers.find(
          (p: unknown) => (p as { id?: string })?.id === "pp_stripe_stripe" || (p as { id?: string })?.id?.includes("stripe")
        ) as { id?: string } | undefined;

        if (!stripeProvider?.id) {
          toast.error("Stripe payment provider not available. Please use COD.");
          setCreateOrderLoading(false);
          return;
        }

        // Create payment session for Stripe
        const paymentResult = await setPaymentMethod(stripeProvider.id);
        
        if (paymentResult.error || !paymentResult.payment_session) {
          toast.error("Failed to initialize payment. Please try again.");
          setCreateOrderLoading(false);
          return;
        }

        // Get client secret from payment session for Stripe Elements
        const paymentSession = paymentResult.payment_session as {
          data?: { client_secret?: string };
          id?: string;
        };
        const clientSecret = paymentSession?.data?.client_secret;

        if (!clientSecret || !stripe || !elements) {
          toast.error("Payment initialization failed. Please try again.");
          setCreateOrderLoading(false);
          return;
        }

        // Confirm Stripe payment
        setPaymentLoading(true);
        const cardElement = elements.getElement(CardElement);
        
        if (!cardElement) {
          toast.error("Card element not found. Please try again.");
          setPaymentLoading(false);
          setCreateOrderLoading(false);
          return;
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name,
                email,
                phone,
                address: {
                  line1: address,
                  city: shippingAddress.city || "",
                  country: shippingAddress.country_code || "us",
                  postal_code: shippingAddress.postal_code || "",
                },
              },
            },
          }
        );

        setPaymentLoading(false);

        if (stripeError) {
          toast.error(stripeError.message || "Payment failed. Please try again.");
          setCreateOrderLoading(false);
          return;
        }

        if (paymentIntent?.status !== "succeeded") {
          toast.error("Payment not completed. Please try again.");
          setCreateOrderLoading(false);
          return;
        }
      } else if (selectedPaymentMethod === "cod") {
        // For COD, we can use system_default payment provider or complete without payment
        // MedusaJS will handle this automatically when completing the cart
      }

      // Step 5: Complete checkout (creates order)
      const result = await completeCheckout();

      if (result.error) {
        toast.error("Failed to complete checkout. Please try again.");
        setCreateOrderLoading(false);
        return;
      }

      if (result.order) {
        toast.success("Order placed successfully!");
        emptyCart();
        setCreateOrderLoading(false);
        // Redirect to order confirmation page
        router.push(`/order-confirmation/${(result.order as { id: string }).id}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.");
      setCreateOrderLoading(false);
    }
  };

  const [enterCouponCodeList, setEnterCouponCodeList] = useState<Coupon[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCoupons();
        const activeCoupons = (res as Coupon[])?.filter((coupon) =>
          dayjs().isBefore(dayjs(coupon.validUntil as string | Date))
        );
        setEnterCouponCodeList(activeCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const cookieCoupon = Cookies.get("couponInfo");
    if (cookieCoupon) {
      const coupon = JSON.parse(cookieCoupon) as CouponInfo;
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage || 0);
    }
  }, []);

  const handleCopunApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundCoupon = enterCouponCodeList?.find(
      (coupon) => coupon.code?.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (foundCoupon) {
      setMessage("Coupon applied successfully!");
      const discountPercent = foundCoupon.discount || 0;
      setDiscount((cartTotal * discountPercent) / 100);
      const couponInfoData: CouponInfo = {
        couponCode: foundCoupon.code,
        discountPercentage: discountPercent,
      };
      setCouponInfo(couponInfoData);
      Cookies.set("couponInfo", JSON.stringify(couponInfoData));
    } else {
      setMessage("Invalid or expired coupon.");
    }
  };
  
  return (
    <>
      {isClient && (
        <div className="checkout-section ptb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-8">
                <div className="col-12">
                  <div className="bg-white p-4 rounded">
                    <h5 className="text-muted fs-5 fw-semibold mb-2">
                      Billing Details
                    </h5>
                    <form id="reviewForm" className="review-form mt-3">
                      <div className="d-flex flex-wrap gap-3">
                        <div className="w-100 col-md-6">
                          <label
                            className="form-label fw-medium"
                            htmlFor="Name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="form-control"
                            {...register("name", {
                              required: " Name is required",
                            })}
                          />
                          {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <div className="w-100 col-md-6">
                          <label
                            className="form-label fw-medium"
                            htmlFor="phone"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            placeholder="Phone"
                            className="form-control"
                            {...register("phone", {
                              required: "Phone is required",
                            })}
                          />
                          {errors.phone && (
                            <p className="text-danger">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="w-100 mt-4">
                        <label
                          className="form-label fw-medium"
                          htmlFor="address"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          placeholder="Street Address"
                          className="form-control"
                          {...register("address", {
                            required: "address is required",
                          })}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-danger">{errors.address.message}</p>
                      )}

                      <h5 className="text-muted fs-5 fw-semibold mt-4">
                        Select Shipping Method
                      </h5>
                      <div className="mt-3">
                        {shippingOptions.length > 0 ? (
                          shippingOptions.map((option: unknown, index: number) => {
                            const opt = option as {
                              id: string;
                              name?: string;
                              amount?: number;
                              data?: { name?: string };
                            };
                            const optionName = opt.name || opt.data?.name || `Shipping Option ${index + 1}`;
                            const optionAmount = opt.amount ? opt.amount / 100 : 0;
                            const isSelected = selectedShippingOption === opt.id;

                            return (
                              <div key={opt.id} className="p-3 border rounded mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center gap-2">
                                    <input
                                      type="radio"
                                      value={opt.id}
                                      id={opt.id}
                                      checked={isSelected}
                                      className="form-check-input"
                                      {...register("shipping", {
                                        required: "Shipping method is required",
                                        onChange: () => {
                                          setSelectedShippingOption(opt.id);
                                          setShippingCost(optionAmount);
                                        },
                                      })}
                                    />
                                    <label
                                      className="form-check-label fw-semibold"
                                      htmlFor={opt.id}
                                    >
                                      {optionName} -{" "}
                                      <span className="text-primary">
                                        ${optionAmount.toFixed(2)} USD
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-muted">
                            {checkoutLoading
                              ? "Loading shipping options..."
                              : "No shipping options available. Please add a shipping address first."}
                          </p>
                        )}
                        {errors.shipping && (
                          <p className="text-danger mt-3 fw-bold">
                            {errors.shipping.message}
                          </p>
                        )}
                      </div>
                      <h4 className="mt-7">Payment Method</h4>

                      {selectedPaymentMethod === "card" && (
                        <CardElement options={{ hidePostalCode: true }} />
                      )}
                      {Boolean(storeSetting?.stripePayment) && (
                        <div className="checkout-radio d-flex align-items-center justify-content-between gap-3 bg-white rounded p-4 mt-3">
                            <div className="radio-left d-inline-flex align-items-center">
                              <div className="theme-radio">
                                <input
                                  type="radio"
                                  value="card"
                                  checked={selectedPaymentMethod === "card"}
                                  className="form-check-input"
                                  {...register("payment", {
                                    required: "Payment method is required",
                                    onChange: () => setSelectedPaymentMethod("card"),
                                  })}
                                />
                                <span className="custom-radio"></span>
                              </div>
                              <label htmlFor="wallet" className="ms-2 h6 mb-0">
                                Credit Card
                              </label>
                            </div>
                            <div className="radio-right text-end">
                              <img
                                src="https://grostore.themetags.com/public/frontend/pg/wallet.svg?v=v4.4.0"
                                alt="wallet"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                      )}

                      <div className="checkout-radio d-flex align-items-center justify-content-between gap-3 bg-white rounded p-4 mt-3">
                        <div className="radio-left d-inline-flex align-items-center">
                          <div className="theme-radio">
                            <input
                              type="radio"
                              value="cod"
                              checked={selectedPaymentMethod === "cod"}
                              className="form-check-input"
                              {...register("payment", {
                                required: "Payment method is required",
                                onChange: () => setSelectedPaymentMethod("cod"),
                              })}
                            />
                            <span className="custom-radio"></span>
                          </div>
                          <label htmlFor="cod" className="ms-2 h6 mb-0">
                            Cash on delivery (COD)
                          </label>
                        </div>

                        <div className="radio-right text-end">
                          <img
                            src="https://grostore.themetags.com/public/frontend/pg/cod.svg?v=v4.4.0"
                            alt="cod"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      {errors.payment && (
                        <p className="text-danger mt-3 fw-bold">
                          {errors.payment.message}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="checkout-sidebar">
                  <div className="sidebar-widget checkout-sidebar py-6 px-4 bg-white rounded-2">
                    <img
                      src="/img/shapes/circle-half.png"
                      alt="circle shape"
                      className="position-absolute end-0 top-0 z--1"
                    />
                    <h4 className="mb-3">Have a coupon?</h4>
                    <p className="mb-7">Apply coupon to get discount.</p>
                    {couponInfo?.couponCode ? (
                      <span className=" border px-4 pt-3 leading-tight w-full rounded-md flex justify-between">
                        <p className=" font-extrabold text-sm">
                          Coupon Applied
                        </p>
                        <span className="text-black font-extrabold text-sm text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <form
                        onSubmit={handleCopunApply}
                        className="d-flex align-items-center"
                        action="#"
                      >
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          type="text"
                          placeholder="Enter Your Coupn Cod"
                          className="theme-input w-100"
                        />
                        <button
                          type="submit"
                          className="btn btn-secondary flex-shrink-0"
                        >
                          Apply Coupon
                        </button>
                      </form>
                    )}

                    {message && (
                      <div className="w-full  text-sm text-green-500 mt-4">
                        {message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="checkout-sidebar">
                  <div className="sidebar-widget checkout-sidebar py-6 px-4 bg-white rounded-2">
                    <div className="widget-title d-flex">
                      <h5 className="mb-0 flex-shrink-0">Order Summery</h5>
                      <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                    </div>
                    <table className="sidebar-table w-100 mt-5">
                      <tbody>
                        <tr>
                          <td>Items ({items.length}):</td>
                          <td className="text-end">${cartTotal}.00</td>
                        </tr>
                        <tr>
                          <td>Shipping & handling:</td>
                          <td className="text-end">${shippingCost}.00</td>
                        </tr>
                        <tr>
                          <td>Discount:</td>
                          <td className="text-end">
                            ${Math.floor(discount)}.00
                          </td>
                        </tr>
                        <tr>
                          <td>Tax:</td>
                          <td className="text-end">${taxes}.00</td>
                        </tr>
                      </tbody>
                    </table>

                    <span className="sidebar-spacer d-block my-4 opacity-50"></span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 fs-md">Total</h6>
                      <h6 className="mb-0 fs-md">
                        ${Math.floor(grandTotal)}.00
                      </h6>
                    </div>
                    <button
                      type="submit"
                      disabled={paymentLoading || createOrderLoading}
                      onClick={handleCheckoutSubmit}
                      className="btn btn-primary btn-md rounded mt-6 w-100"
                    >
                      Place Order
                    </button>
                    {paymentLoading && (
                      <div className="mt-3 flex items-center text-green-600">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                          ></path>
                        </svg>
                        Payment in progress...
                      </div>
                    )}
                    {createOrderLoading && (
                      <div className="mt-3 flex items-center text-green-600">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-green-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                          ></path>
                        </svg>
                        Confirm Order progress...
                      </div>
                    )}
                    <p className="mt-3 mb-0 fs-xs">
                      By Placing your order your agree to our company{" "}
                      <Link href="/terms-condition">Privacy-policy</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutBody;

