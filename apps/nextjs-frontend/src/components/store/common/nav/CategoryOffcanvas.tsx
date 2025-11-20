"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Category } from "@/types";

interface CategoryOffcanvasProps {
  setCategoryOffcanvas: (value: boolean) => void;
  categorys: Category[];
  categoryOffcanvas: boolean;
}

const CategoryOffcanvas = ({
  setCategoryOffcanvas,
  categorys,
  categoryOffcanvas,
}: CategoryOffcanvasProps) => {
  const offcanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        offcanvasRef.current &&
        !offcanvasRef.current.contains(event.target as Node)
      ) {
        setCategoryOffcanvas(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCategoryOffcanvas]);
  // Setting removed - using empty object
  const setting: { home?: { logo?: string } } = {};
  return (
    <>
      <div
        ref={offcanvasRef}
        className={`offcanvas-left-menu position-fixed ${
          categoryOffcanvas ? "active" : ""
        }`}
      >
        <div className="mobile-menu">
          <button
            onClick={() => setCategoryOffcanvas(false)}
            className="offcanvas-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <Link href="/" className="d-inline-block mb-5">
            {setting?.home?.logo && <img src={setting.home.logo} alt="logo" />}
          </Link>
          <nav className="mobile-menu-wrapper scrollbar">
            <ul>
              {categorys?.map((c, i) => (
                <li key={i}>
                  <Link
                    href={`/products/category=${c.name
                      .replace(/\s+/g, "")
                      .toLowerCase()}=${c._id}`}
                    className="d-flex align-items-center"
                    onClick={() => setCategoryOffcanvas(false)}
                  >
                    <div className="me-2 avatar-icon">
                      <img
                        src={c.icon}
                        alt="vegetables"
                        className="w-100 h-100 rounded-circle"
                      />
                    </div>
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default CategoryOffcanvas;

