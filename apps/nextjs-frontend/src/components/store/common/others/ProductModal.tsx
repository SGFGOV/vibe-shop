"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Controller } from "swiper";
import Link from "next/link";
import StarRating from "./StartRating";
import { useMainContextStore } from "../../provider/MainContextStore";
import usebrands from "../../dataFetching/useBrand";
import { useMedusaCart } from "@/hooks/useMedusaCart";
import useAddToCart from "../../hooks/useAddToCart";
import { getAllAttributes } from "../../../../app/backend/controllers/attribute.controller";
import VariantList from "../../productDetails/VariantList";
import Price from "../../productDetails/Price";
import { toast } from "react-toastify";
import { Product, Attribute, ProductVariant } from "@/types";

const ProductModal = () => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);
  
  const { brands } = usebrands();
  const { handelAddItem, handleIncrement, handleDecrement, quantity } =
    useAddToCart();
  const { openProductModal, setOpenProductModal, productDetails } =
    useMainContextStore();
  const { inCart } = useMedusaCart();

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAttributes();
      setAttributes((res as unknown as Attribute[]) || []);
    };

    if (openProductModal) {
      fetchData();
    }
  }, [openProductModal]);

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("ml");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [volume, setVolume] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [discount, setDiscount] = useState<number | string>(0);

  const [selectVariant, setSelectVariant] = useState<Record<string, unknown>>({});
  const [selectVa, setSelectVa] = useState<Record<string, unknown>>({});
  const [variantTitle, setVariantTitle] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    if (value && productDetails) {
      const result = (productDetails?.variants as ProductVariant[])?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k as keyof ProductVariant])
      );

      const res = result?.map(
        ({
          originalPrice,
          price,
          discount,
          quantity,
          inUse,
          inUseOrder,
          barcode,
          volume,
          totalVolume,
          unit,
          sku,
          productId,
          image,
          ...rest
        }) => ({ ...rest })
      );

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {} as Record<string, unknown>
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {} as Record<string, unknown>
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k as keyof ProductVariant])
      );

      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);
      setSelectVariant(result2 as unknown as Record<string, unknown>);
      setSelectVa(result2 as unknown as Record<string, unknown>);
      setSalePrice(Number(result2?.price) || 0);
      setOriginalPrice(Number(result2?.originalPrice) || 0);
      setStock((result2?.quantity as number) || 0);
      setVolume((result2?.volume as number) || 0);
      setTotalVolume((result2?.totalVolume as number) || 0);
      setUnit((result2?.unit as string) || "ml");
      setDiscount(Number(result2?.discount) || 0);
    } else if ((productDetails?.variants as ProductVariant[])?.length > 0) {
      const result = (productDetails?.variants as ProductVariant[])?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k as keyof ProductVariant])
      );
      setVariants(result);
      setSalePrice(Number(productDetails.variants?.[0]?.price) || 0);
      setOriginalPrice(Number(productDetails.variants?.[0]?.originalPrice) || 0);
      setStock((productDetails.variants?.[0]?.quantity as number) || 0);
      setUnit((productDetails?.variants?.[0]?.unit as string) || "ml");
      setDiscount(Number(productDetails.variants?.[0]?.discount) || 0);
      setSelectVariant((productDetails.variants?.[0] as unknown as Record<string, unknown>) || {});
      setSelectVa((productDetails.variants?.[0] as unknown as Record<string, unknown>) || {});
    } else if (productDetails) {
      setSalePrice(Number(productDetails?.prices?.price) || 0);
      setOriginalPrice(Number(productDetails?.prices?.originalPrice) || 0);
      setStock(productDetails?.stock || 0);
      setVolume((productDetails?.measurement as { volume?: number })?.volume || 0);
      setTotalVolume((productDetails?.measurement as { totalVolume?: number })?.totalVolume || 0);
      setUnit((productDetails?.measurement as { unit?: string })?.unit || "ml");
      setDiscount(Number(productDetails?.prices?.discount) || 0);
    }
  }, [
    productDetails?.prices?.discount,
    productDetails?.prices?.originalPrice,
    productDetails?.prices?.price,
    productDetails?.stock,
    productDetails?.variants,
    selectVa,
    selectVariant,
    value,
    productDetails,
  ]);

  useEffect(() => {
    if (
      productDetails?.variants &&
      Array.isArray(productDetails.variants) &&
      attributes
    ) {
      const res = Object.keys(Object.assign({}, ...productDetails.variants));
      const varTitle = attributes.filter((att) => res.includes(att?._id || ""));
      setVariantTitle(varTitle.sort());
    }
  }, [productDetails, attributes]);

  const handleAddToCart = (p: Product) => {
    if ((p.variants as ProductVariant[])?.length === 1 && (p.variants?.[0]?.quantity as number) < 1)
      return toast.error("Insufficient stock");

    if (stock <= 0) return toast.error("Insufficient stock");

    const hasMatchingVariant = (productDetails?.variants as ProductVariant[])?.some(
      (variant) =>
        Object.entries(variant).sort().toString() ===
        Object.entries(selectVariant).sort().toString()
    );

    if (hasMatchingVariant || (productDetails?.variants as ProductVariant[])?.length === 0) {
      const selectVariantTitle = variantTitle?.map((att) =>
        (att.variants as Array<{ _id?: string; name?: string }>)?.find((v) => v._id === selectVariant[att._id || ""])
      );

      const newItem = {
        ...p,
        id: `${
          (productDetails.variants as ProductVariant[])?.length <= 1
            ? productDetails._id
            : productDetails._id +
              variantTitle?.map((att) => selectVariant[att._id || ""]).join("-")
        }`,
        name: `${
          (productDetails.variants as ProductVariant[])?.length <= 1
            ? productDetails.name
            : productDetails.name +
              "-" +
              selectVariantTitle?.map((el) => el?.name).join(", ")
        }`,
        variant:
          (productDetails.variants as ProductVariant[])?.length === 0
            ? productDetails.prices
            : selectVariant,
        prices: {
          price:
            (productDetails?.variants as ProductVariant[])?.length === 0
              ? productDetails.prices.price
              : salePrice,
          originalPrice:
            (productDetails.variants as ProductVariant[])?.length === 0
              ? productDetails.prices.originalPrice
              : originalPrice,
        },
      };
      handelAddItem(newItem);
    } else {
      return toast.error("Please select all variant first!");
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenProductModal(false);
      }
    };

    if (openProductModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openProductModal, setOpenProductModal]);

  if (!openProductModal || !productDetails || !('name' in productDetails)) return null;
  
  // Type guard: ensure productDetails is a Product
  const product = productDetails as Product;
  
  return (
    <>
      <div
        className={`modal fade bg-black bg-opacity-25 ${
          openProductModal ? "show d-block" : ""
        }`}
      >
        <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-body bg-white rounded-3">
              <button
                type="button"
                onClick={() => setOpenProductModal(false)}
                className="btn-close float-end"
              ></button>
              <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                <div className="row g-4">
                  <div className="col-xl-6 align-self-end">
                    <div className="quickview-double-slider">
                      <div className="quickview-product-slider">
                        <Swiper
                          modules={[Controller]}
                          onSwiper={setFirstSwiper}
                          controller={{ control: secondSwiper || undefined }}
                          slidesPerView={1}
                          centeredSlides={true}
                          speed={700}
                          loop={true}
                          loopedSlides={6}
                        >
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src={productDetails?.image?.[0]}
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-2.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-3.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide text-center">
                            <img
                              src="/img/products/p-lg-4.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>

                      <div className="product-thumbnail-slider mt-2">
                        <Swiper
                          modules={[Controller]}
                          onSwiper={setSecondSwiper}
                          controller={{ control: firstSwiper }}
                          slidesPerView={4}
                          speed={700}
                          loop={true}
                          spaceBetween={20}
                          slideToClickedSlide={true}
                          loopedSlides={6}
                          centeredSlides={true}
                          breakpoints={{
                            0: { slidesPerView: 2 },
                            380: { slidesPerView: 3 },
                            576: { slidesPerView: 4 },
                          }}
                        >
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src={productDetails?.image?.[0]}
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-2.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-3.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                          <SwiperSlide className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center">
                            <img
                              src="/img/products/thumb-sm-4.png"
                              alt="jam"
                              className="img-fluid"
                            />
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="product-info">
                      <h2 className="h5 mt-1 mb-3">{productDetails?.name}</h2>
                      <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                        <StarRating rating={productDetails?.averageRating} />
                        <span className="flex-shrink-0">
                          ({(productDetails?.ratings as unknown[])?.length || 0} Reviews)
                        </span>
                      </div>
                      <div className="pricing mt-2">
                        <Price
                          product={product}
                          price={salePrice}
                          originalPrice={originalPrice}
                        />
                      </div>
                      <div className="widget-title d-flex mt-4">
                        <h6 className="mb-1 flex-shrink-0">Description</h6>
                        <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                      </div>
                      <div
                        className="tt-line-clamp tt-clamp-3 mb-3"
                        dangerouslySetInnerHTML={{
                          __html: productDetails?.description || "",
                        }}
                      ></div>

                      <div className="mb-3">
                        {variantTitle?.map((a) => (
                          <div key={a._id}>
                            <h4 className="h6 py-2 font-weight-bold text-secondary">
                              {a?.name}
                            </h4>
                            <div className="d-flex flex-row mb-3">
                              <VariantList
                                att={a._id || ""}
                                varTitle={variantTitle}
                                option={a.option}
                                variants={productDetails?.variants}
                                setValue={setValue}
                                setSelectVa={setSelectVa}
                                selectVariant={selectVariant}
                                setSelectVariant={setSelectVariant}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="d-flex align-items-center gap-4 flex-wrap">
                        <div className="product-qty d-flex align-items-center">
                          <button
                            disabled={inCart(productDetails._id || "")}
                            onClick={handleDecrement}
                            className="decrese"
                          >
                            -
                          </button>
                          <input readOnly type="number" value={quantity} />
                          <button
                            disabled={inCart(productDetails._id || "")}
                            onClick={handleIncrement}
                            className="increase"
                          >
                            +
                          </button>
                        </div>
                        <a
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-secondary btn-md"
                        >
                          <span className="me-2">
                            <i className="fa-solid fa-cart-plus"></i>
                          </span>
                          Add to Cart
                        </a>
                      </div>
                      <div className="tt-category-tag my-4 mb-7">
                        {brands?.slice(0, 5).map((brand, i) => (
                          <Link
                            key={i}
                            href={`/products/brands=${brand.name
                              .replace(/\s+/g, "")
                              .toLowerCase()}=${brand._id}`}
                            className="text-muted fs-xxs"
                            onClick={() => setOpenProductModal(false)}
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        className="btn btn-sm btn-primary"
                        href={`/product-details/${product._id}`}
                        onClick={() => setOpenProductModal(false)}
                      >
                        More Info
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;

