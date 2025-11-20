"use client";

import Link from "next/link";
import { Category } from "@/types";

interface MedicineFooterProps {
  categorys?: Category[];
}

interface LinkItem {
  name: string;
  label: string;
}

const MedicineFooter = ({ categorys }: MedicineFooterProps) => {
  const quickLinks: LinkItem[] = [
    { name: "About Us", label: "/about" },
    { name: "Blog", label: "/blog" },
    { name: "Terms & Condition", label: "/terms-condition" },
    { name: "Contact Us", label: "/contact" },
    { name: "Products", label: "/products" },
    { name: "Coupons", label: "/coupons" },
  ];

  const myAccountLinks: LinkItem[] = [
    { name: "Contact Us", label: "/contact" },
    { name: "Products", label: "/products" },
    { name: "Coupons", label: "/coupons" },
    { name: "About Us", label: "/about" },
    { name: "Blog", label: "/blog" },
    { name: "Terms & Condition", label: "/terms-condition" },
  ];

  return (
    <div className="section-space-sm-y">
      <div className="container">
        <div className="row g-4 gy-5">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <Link href="/index-6" className="link d-inline-block logo">
              <img
                src="/img/logo.png"
                alt="logo"
                className="img-fluid logo__img"
              />
            </Link>
            <p className="mb-6 clr-heading">
              Objectively administrate superior paradigms with mission -
              Distinctively procrastinate.
            </p>
            <ul className="list gap-3">
              <li>
                <div className="d-flex align-items-center gap-3">
                  <span className="d-inline-block flex-shrink-0 clr-primary">
                    <i className="far fa-envelope"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium clr-heading">
                    mail@mail.com
                  </span>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center gap-3">
                  <span className="d-inline-block flex-shrink-0 clr-primary">
                    <i className="fas fa-phone-volume"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium clr-heading">
                    +1 (800) 060-07-30
                  </span>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center gap-3">
                  <span className="d-inline-block flex-shrink-0 clr-primary">
                    <i className="fas fa-stopwatch"></i>
                  </span>
                  <span className="d-block flex-grow-1 fw-medium clr-heading">
                    Mon-Sat 10:00pm - 7:00pm
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3 col-xl-2">
            <h5 className="mb-5">Quick Links</h5>
            <ul className="list gap-2">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.label}
                    className="link d-inline-block clr-heading :clr-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6 col-lg-3 col-xl-2">
            <h5 className="mb-5">My Account</h5>
            <ul className="list gap-2">
              {myAccountLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.label}
                    className="link d-inline-block clr-heading :clr-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6 col-xl-4">
            <h5 className="mb-5">Gallery</h5>
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-6 col-sm-4">
                  <Link href="#" className="link d-inline-block w-100">
                    <img
                      src={`/img/home-6/footer-img-${i}.png`}
                      alt={`gallery-${i}`}
                      className="img-fluid w-100"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr className="footer-hr my-12" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <p className="mb-0 fs-14 clr-heading text-center text-md-start">
              &copy; All rights reserved. Made by{" "}
              <Link
                href="#"
                className="link d-inline-block clr-primary :clr-primary fw-semibold"
              >
                ThemeTags
              </Link>
            </p>
          </div>
          <div className="col-md-6">
            <ul className="list list--row gap-2 flex-wrap justify-content-center justify-content-md-end">
              {[1, 2, 3, 4].map((i) => (
                <li key={i}>
                  <img
                    src={`/img/home-6/payment-img-${i}.png`}
                    alt={`payment-${i}`}
                    className="img-fluid"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineFooter;

