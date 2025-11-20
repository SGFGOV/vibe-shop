"use client";

import Link from "next/link";
import StarRating from "../common/others/StartRating";
import { useMainContextStore } from "../provider/MainContextStore";
import { useWishlist } from "../provider/WishlistProvider";
import useAddToCart from "../hooks/useAddToCart";
import { Product } from "@/types";

interface FurnitureProductCardProps {
  product: Product;
}

const FurnitureProductCard = ({ product }: FurnitureProductCardProps) => {
  const { handleWishlist, wishlist } = useWishlist();
  const { setOpenProductModal, setProductDetails } = useMainContextStore();
  const { handelAddItem } = useAddToCart();
  
  return (
    <>
      <div className="col-md-6 col-lg-4 col-xxl-3">
        <div className="meat-card meat-card--secondary">
          <div className="meat-card__img text-center">
            <Link
              href={`/product-details/${product._id}`}
              className="link d-inline-block text-center"
            >
              <img
                src={
                  Array.isArray(product.image)
                    ? product.image[0]
                    : product.image || ""
                }
                alt={product.name || ""}
                className="img-fluid w-100 h-100 object-fit-contain"
              />
            </Link>
            <ul className="list gap-2 meat-card__icon-list">
              <li>
                <a
                  type="button"
                  onClick={() => handleWishlist(product)}
                  className="link d-grid place-content-center w-9 h-9 rounded-circle light-bg clr-heading drop-shadow"
                >
                  {wishlist?.some((item) => item._id === product._id) ? (
                    <i className="fa-solid fa-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                </a>
              </li>
              <li>
                <a
                  type="button"
                  onClick={() => {
                    setOpenProductModal(true);
                    setProductDetails(product);
                  }}
                  className="link d-grid place-content-center w-9 h-9 rounded-circle light-bg clr-heading drop-shadow"
                >
                  <i className="far fa-eye"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="meat-card__body">
            <Link
              href={`/products/brands=${product.brand
                ?.replace(/\s+/g, "")
                .toLowerCase()}=${product._id}`}
              className="meat-card__subtitle"
            >
              {product.brand}
            </Link>
            <h6 className="meat-card__title">
              <Link
                href={`/product-details/${product._id}`}
                className="link meat-card__title-link"
              >
                {product.name}
              </Link>
            </h6>
            <ul className="list list--row">
              <StarRating rating={product?.averageRating} />
            </ul>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4">
              <div className="d-flex align-items-center gap-3">
                <h6 className="meat-card__current-price mb-0">
                  ${product.prices?.price || 0}
                </h6>
              </div>
              <a
                type="button"
                onClick={() =>
                  handelAddItem({ ...product, id: product._id || product.id })
                }
                className="link meat-card__cart-btn"
              >
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FurnitureProductCard;

