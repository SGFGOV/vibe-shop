"use client";
import Breadcrumb from "components/store/common/others/Breadcrumb";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAllCoupons } from "app/backend/controllers/coupon.controller";
import OfferTimer from "components/store/coupon/OfferTimer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PreLoader from "components/store/common/others/PreLoader";
import type { Coupon } from "@/types";

export default function CouponsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string>("");
  const [enterCouponCodeList, setEnterCouponCodeList] = useState<Coupon[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopied = (code: string): void => {
    setCopiedCode(code);
    setCopied(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCoupons();
        const showCoupon = res?.filter((c) => c.status === "show");

        // Filter out active coupons based on endTime
        const activeCoupons = showCoupon?.filter((coupon) =>
          coupon.validUntil && dayjs().isBefore(dayjs(coupon.validUntil))
        ) || [];

        setEnterCouponCodeList(activeCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb title="All Coupons" page="coupons" />
      {loading ? (
        <PreLoader />
      ) : (
        <section className="tt-campaigns ptb-100">
          <div className="container">
            <div className="row g-4 justify-content-center">
              {enterCouponCodeList?.map((c, i) => (
                <div key={i} className="col-lg-6 col-md-6">
                  <div
                    className="card shadow-lg border-0 tt-coupon-single tt-gradient-top"
                    style={{
                      background: `url(${c.bannerImage || ""}) no-repeat center center / cover`,
                    }}
                  >
                    <div className="card-body text-center p-5">
                      <div className="offer-text mb-2 justify-content-center">
                        <div className="up-to fw-bold text-light">UP TO</div>
                        <div className="display-4 fw-bold text-danger">
                          {c?.discount}
                        </div>
                        <p className="mb-0 fw-bold text-danger">
                          <span>%</span> <br /> Off
                        </p>
                      </div>
                      <CopyToClipboard
                        text={c.code}
                        onCopy={() => handleCopied(c.code)}
                      >
                        <div className="coupon-row">
                          <span className="copyCode">{c.code}</span>
                          {copied && c.code === copiedCode ? (
                            <span className="copyBtn">Copied!</span>
                          ) : (
                            <span className="copyBtn">Copy Code</span>
                          )}
                        </div>
                      </CopyToClipboard>
                      <h5 className="text-light">Valid Till:</h5>
                      <ul
                        className="timing-countdown countdown-timer d-inline-block gap-2 mt-3"
                        data-date="06/30/2023 23:59:59"
                      >
                        {c.validUntil && (
                          <OfferTimer expiryTimestamp={new Date(c.validUntil)} />
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

