"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Controller } from "swiper";
import ProductDetailsTab from "./ProductDetailsTab";
import ProductDetailsSidebar from "./ProductDetailsSidebar";
import useSingleProduct from "../dataFetching/useSingleProduct";
import useProducts from "../dataFetching/useProducts";
import StarRating from "../common/others/StartRating";
import usebrands from "../dataFetching/useBrand";
import Link from "next/link";
import useAddToCart from "../hooks/useAddToCart";
import { useMedusaCart } from "@/hooks/useMedusaCart";
import Loading from "../common/others/Loading";
import { getAllAttributes } from "../../../app/backend/controllers/attribute.controller";
import VariantList from "./VariantList";
import Price from "./Price";
import SkeletonLoading from "./SkeletonLoading";
import PreLoader from "../common/others/PreLoader";
import { toast } from "react-toastify";
import { Product, Attribute, ProductVariant } from "@/types";

interface ProductDetailsBodyProps {
  id?: string;
}

const ProductDetailsBody = ({ id }: ProductDetailsBodyProps) => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);
  const [loadingHuteiThak, setLoadingHuteiThak] = useState(true);

  const { product, productLoading } = useSingleProduct(id);
  const { brands } = usebrands();
  const { handelAddItem, handleIncrement, handleDecrement, quantity } =
    useAddToCart();
  const { inCart } = useMedusaCart();
  
  if (!product) {
    return (
      <div className="alert alert-warning text-center py-10" role="alert">
        Product Not Found
      </div>
    );
  }
  
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAttributes();
      setAttributes((res as unknown as Attribute[]) || []);
    };

    fetchData();
  }, []);

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
    if (value) {
      const result = (product?.variants as ProductVariant[])?.filter((variant) =>
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

      setSelectVariant(result2 as Record<string, unknown>);
      setSelectVa(result2 as Record<string, unknown>);
      setSalePrice(Number(result2?.price) || 0);
      setOriginalPrice(Number(result2?.originalPrice) || 0);
      setStock((result2?.quantity as number) || 0);
      setVolume((result2?.volume as number) || 0);
      setTotalVolume((result2?.totalVolume as number) || 0);
      setUnit((result2?.unit as string) || "ml");
      setDiscount(Number(result2?.discount) || 0);
    } else if ((product?.variants as ProductVariant[])?.length > 0) {
      const result = (product?.variants as ProductVariant[])?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k as keyof ProductVariant])
      );
      setVariants(result);

      setSalePrice(Number(product.variants?.[0]?.price) || 0);
      setOriginalPrice(Number(product.variants?.[0]?.originalPrice) || 0);
      setStock((product.variants?.[0]?.quantity as number) || 0);
      setUnit((product?.variants?.[0]?.unit as string) || "ml");
      setDiscount(Number(product.variants?.[0]?.discount) || 0);
      setSelectVariant((product.variants?.[0] as unknown as Record<string, unknown>) || {});
      setSelectVa((product.variants?.[0] as unknown as Record<string, unknown>) || {});
    } else {
      setSalePrice(Number(product?.prices?.price) || 0);
      setOriginalPrice(Number(product?.prices?.originalPrice) || 0);
      setStock(product?.stock || 0);
      setVolume((product?.measurement as { volume?: number })?.volume || 0);
      setTotalVolume((product?.measurement as { totalVolume?: number })?.totalVolume || 0);
      setUnit((product?.measurement as { unit?: string })?.unit || "ml");
      setDiscount(Number(product?.prices?.discount) || 0);
    }
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    product?.stock,
    product?.variants,
    selectVa,
    selectVariant,
    value,
  ]);
  
  useEffect(() => {
    if (product?.variants && Array.isArray(product.variants) && attributes) {
      const res = Object.keys(Object.assign({}, ...product.variants));
      const varTitle = attributes.filter((att) => res.includes(att?._id || ""));
      setVariantTitle(varTitle.sort());
    }
  }, [product, attributes]);

  const handleAddToCart = (p: Product) => {
    if ((p.variants as ProductVariant[])?.length === 1 && (p.variants?.[0]?.quantity as number) < 1)
      return toast.error("Insufficient stock");

    if (stock <= 0) return toast.error("Insufficient stock");

    const hasMatchingVariant = (product?.variants as ProductVariant[])?.some(
      (variant) =>
        Object.entries(variant).sort().toString() ===
        Object.entries(selectVariant).sort().toString()
    );

    if (hasMatchingVariant || (product?.variants as ProductVariant[])?.length === 0) {
      const selectVariantTitle = variantTitle?.map((att) =>
        (att.variants as Array<{ _id?: string; name?: string }>)?.find((v) => v._id === selectVariant[att._id || ""])
      );

      const newItem = {
        ...p,
        id: `${
          (product.variants as ProductVariant[])?.length <= 1
            ? product._id
            : product._id +
              variantTitle?.map((att) => selectVariant[att._id || ""]).join("-")
        }`,
        name: `${
          (product.variants as ProductVariant[])?.length <= 1
            ? product.name
            : product.name +
              "-" +
              selectVariantTitle?.map((el) => el?.name).join(", ")
        }`,
        variant: (product.variants as ProductVariant[])?.length === 0 ? product.prices : selectVariant,
        prices: {
          price:
            (product.variants as ProductVariant[])?.length === 0 ? product.prices.price : salePrice,
          originalPrice:
            (product.variants as ProductVariant[])?.length === 0
              ? product.prices.originalPrice
              : originalPrice,
        },
      };
      handelAddItem(newItem);
    } else {
      return toast.error("Please select all variant first!");
    }
  };
  
  return (
    <>
      {productLoading ? (
        <PreLoader />
      ) : (
        <section className="product-details-area ptb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-9">
                <div className="product-details">
                  <div className="gstore-product-quick-view bg-white rounded-3 py-6 px-4">
                    <div className="row g-4">
                      <div className="col-xl-6 align-self-end">
                        <div className="quickview-double-slider">
                          <div className="quickview-product-slider">
                            <Swiper
                              modules={[Controller]}
                              onSwiper={setFirstSwiper}
                              controller={{ control: secondSwiper }}
                              slidesPerView={1}
                              centeredSlides={true}
                              speed={700}
                              loop={true}
                              loopedSlides={6}
                            >
                              <SwiperSlide className="swiper-slide text-center">
                                <img
                                  src={product?.image?.[0]}
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

                          <div className="product-thumbnail-slider mt-80">
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
                                  src={product?.image?.[0]}
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
                          <h2 className="h5 mt-1 mb-3">{product?.name}</h2>
                          <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                            <StarRating rating={product?.averageRating} />
                            <span className="flex-shrink-0">
                              ({(product?.ratings as unknown[])?.length || 0} Reviews)
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
                            className="tt-line-clamp tt-clamp-2 mb-3"
                            dangerouslySetInnerHTML={{
                              __html: product?.description || "",
                            }}
                          ></div>

                          <div className="mb-3">
                            {variantTitle?.map((a, i) => (
                              <div key={a._id}>
                                <h4 className="h6 py-2 font-weight-bold text-secondary">
                                  {a?.name}
                                </h4>
                                <div className="mb-3">
                                  <VariantList
                                    att={a._id || ""}
                                    varTitle={variantTitle}
                                    option={a.option}
                                    variants={product?.variants}
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
                                disabled={inCart(product?._id || "")}
                                onClick={handleDecrement}
                                className={`px-2 py-1 border rounded-l ${
                                  inCart(product?._id || "")
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                                title={
                                  inCart(product?._id || "")
                                    ? "Item is already in your cart"
                                    : ""
                                }
                              >
                                -
                              </button>
                              <input readOnly type="number" value={quantity} />
                              <button
                                disabled={inCart(product?._id || "")}
                                onClick={handleIncrement}
                                className={`px-2 py-1 border rounded-end ${
                                  inCart(product?._id || "") ? "disabled" : ""
                                }`}
                                title={
                                  inCart(product?._id || "")
                                    ? "Item is already in your cart"
                                    : ""
                                }
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
                                <i className="fa-solid fa-bag-shopping"></i>
                              </span>
                              Add to Cart
                            </a>
                          </div>
                          <div className="tt-category-tag mt-4">
                            {brands.map((brand, i) => (
                              <Link
                                key={i}
                                href={`/products/brands=${brand?.name
                                  .replace(/\s+/g, "")
                                  .toLowerCase()}=${brand._id}`}
                                className="text-muted fs-xxs"
                              >
                                {brand?.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProductDetailsTab product={product} />
                </div>
              </div>

              <ProductDetailsSidebar />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetailsBody;

