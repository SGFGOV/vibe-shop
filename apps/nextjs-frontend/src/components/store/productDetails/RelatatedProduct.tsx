"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import Link from "next/link";
import { useRef } from "react";
import useProducts from "../dataFetching/useProducts";
import useSingleProduct from "../dataFetching/useSingleProduct";
import useAddToCart from "../hooks/useAddToCart";
import useAddWishlist from "../hooks/useAddWishlist";
import { useMainContextStore } from "../provider/MainContextStore";
import StarRating from "../common/others/StartRating";
import { Product } from "@/types";

interface RelatatedProductProps {
  id: string;
}

const RelatatedProduct = ({ id }: RelatatedProductProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const { product } = useSingleProduct(id);
  const { products } = useProducts();
  const relatadeProducts = products?.filter(
    (p) => p.category === product?.category
  ) || [];
  
  const { handelAddItem } = useAddToCart();
  const { handleWishlist, wishlist } = useAddWishlist();
  const { setOpenProductModal, setProductDetails } = useMainContextStore();
  
  if (relatadeProducts.length === 0) {
    return <div></div>;
  }
  
  return (
    <section className="related-product-slider pb-120">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-sm-8">
            <div className="section-title text-center text-sm-start">
              <h2 className="mb-0">You may be interested</h2>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="rl-slider-btns text-center text-sm-end mt-3 mt-sm-0">
              <button
                ref={prevRef}
                className="rl-slider-btn slider-btn-prev d-inline-block"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <button
                ref={nextRef}
                className="rl-slider-btn slider-btn-next ms-3 d-inline-block"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="rl-products-slider swiper mt-8">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (prevRef.current && nextRef.current) {
                if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="swiper-wrapper pb-10"
          >
            {relatadeProducts.map((product, i) => (
              <SwiperSlide
                key={i}
                className="vertical-product-card trend_style rounded-2 position-relative swiper-slide h-full"
              >
                {product.prices?.discount && product.prices.discount >= 12 && (
                  <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
                    -12% OFF
                  </span>
                )}
                <div className="thumbnail position-relative text-center p-4">
                  <img
                    src={product.image?.[0]}
                    alt="apple"
                    className="img-fluid"
                  />
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a
                      type="button"
                      onClick={() => handleWishlist(product)}
                      className="rounded-btn"
                    >
                      {wishlist?.some((item) => item._id === product._id) ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-regular fa-heart"></i>
                      )}
                    </a>

                    <a
                      type="button"
                      onClick={() => {
                        setOpenProductModal(true);
                        setProductDetails(product);
                      }}
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="#"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    {product.brand}
                  </a>
                  <Link
                    href={`/product-details/${product._id}`}
                    className="card-title fw-bold d-block tt-line-clamp tt-clamp-2 mb-2"
                  >
                    {product.name}
                  </Link>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <StarRating rating={product?.averageRating} />
                    <span className="flex-shrink-0">
                      ({(product?.ratings as unknown[])?.length || 0} Reviews)
                    </span>
                  </div>
                  <h6 className="price text-danger mb-3">
                    ${product?.prices?.price || 0}.00
                  </h6>

                  <a
                    type="button"
                    onClick={() =>
                      handelAddItem({ ...product, id: product._id || product.id })
                    }
                    className="btn btn-outline-secondary btn-md border-secondary d-block mt-4"
                  >
                    Add to Cart
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RelatatedProduct;
