"use client";

import Link from "next/link";

interface HalalMeatAboutProps {
  setting?: {
    hala_meat_about_sub_title?: string;
    hala_meat_about_title?: string;
    hala_meat_about_text?: string;
    hala_meat_about_link?: string;
    hala_meat_about_link_text?: string;
    hala_meat_about_img?: string;
  };
}

const HalalMeatAbout = ({ setting }: HalalMeatAboutProps) => {
  return (
    <>
      <section className="hl-about-section pb-120">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-7">
              <div className="hl-about-content">
                <span className="hl-subtitle mb-2 fw-bold ps-2 pe-3">
                  {setting?.hala_meat_about_sub_title}
                </span>
                <h2 className="mb-3 h1">{setting?.hala_meat_about_title}</h2>
                <p>{setting?.hala_meat_about_text}</p>

                <Link
                  href={setting?.hala_meat_about_link || "#"}
                  className="btn hl-primary-btn"
                >
                  {setting?.hala_meat_about_link_text}
                  <span className="ms-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 5.875C15 5.65399 14.9122 5.44202 14.7559 5.28574C14.5996 5.12946 14.3877 5.04167 14.1667 5.04167L7.49999 5C7.27898 5 7.06702 5.0878 6.91074 5.24408C6.75446 5.40036 6.66666 5.61232 6.66666 5.83333C6.66666 6.05435 6.75446 6.26631 6.91074 6.42259C7.06702 6.57887 7.27898 6.66667 7.49999 6.66667H12.1333L5.24166 13.575C5.16355 13.6525 5.10156 13.7446 5.05925 13.8462C5.01695 13.9477 4.99516 14.0567 4.99516 14.1667C4.99516 14.2767 5.01695 14.3856 5.05925 14.4871C5.10156 14.5887 5.16355 14.6809 5.24166 14.7583C5.31913 14.8364 5.4113 14.8984 5.51285 14.9407C5.6144 14.9831 5.72332 15.0048 5.83333 15.0048C5.94334 15.0048 6.05226 14.9831 6.15381 14.9407C6.25536 14.8984 6.34753 14.8364 6.42499 14.7583L13.3333 7.85V12.5C13.3333 12.721 13.4211 12.933 13.5774 13.0893C13.7337 13.2455 13.9456 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.2455 14.7559 13.0893C14.9122 12.933 15 12.721 15 12.5V5.875Z"
                        fill="#F8F8F8"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="img-wrapper mt-5 mt-lg-0">
                <img
                  src={setting?.hala_meat_about_img}
                  alt="not found"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalMeatAbout;

