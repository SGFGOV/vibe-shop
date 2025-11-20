"use client";

import { useWishlist } from "../provider/WishlistProvider";
import useAddToCart from "../hooks/useAddToCart";
import Link from "next/link";
import StarRating from "../common/others/StartRating";
import { Product } from "@/types";

const WishlistBody = () => {
  const { wishlist, removeWishlist } = useWishlist();
  const { handelAddItem } = useAddToCart();

  return (
    <>
      <section className="wishlist-section ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wishlist-table bg-white">
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-center">Image</th>
                      <th className="text-center">Product Name</th>
                      <th className="text-center">Stock Status</th>
                      <th className="text-center">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((product: Product) => (
                      <tr key={product._id}>
                        <td className="text-center thumbnail">
                          <img
                            src={product.image?.[0]}
                            alt="product-thumb"
                            className="img-fluid"
                          />
                        </td>
                        <td>
                          <span className="fw-bold text-secondary fs-xs">
                            {product.category}
                          </span>
                          <h6 className="mb-1 mt-1">
                            <Link href={`/product-details/${product._id}`}>
                              {product.name}
                            </Link>
                          </h6>
                          <div className="star-rating">
                            <StarRating rating={product?.averageRating} />
                            <span className="fs-xs">
                              ({(product.ratings as unknown[])?.length || 0} reviews)
                            </span>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="stock-btn text-dark fw-bold fs-xxs d-inline-block rounded-pill">
                            {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="text-end">
                          <span className="price fw-bold text-dark">
                            ${product.prices?.price || 0}.00
                          </span>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handelAddItem({ ...product, id: product._id || product.id });
                            }}
                            className="btn btn-secondary btn-sm ms-5 rounded-1"
                          >
                            Add to Cart
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              removeWishlist(product);
                            }}
                            className="close-btn ms-3"
                          >
                            <i className="fas fa-close"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WishlistBody;

