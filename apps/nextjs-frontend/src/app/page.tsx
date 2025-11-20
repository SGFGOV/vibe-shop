"use client";

import useCategory from "../components/store/dataFetching/useCategory";
import BannerOne from "../components/store/home/BannerOne";
import BannerTwo from "../components/store/home/BannerTwo";
import Blog from "../components/store/home/Blog";
import Category from "../components/store/home/Category";
import FeatureProduct from "../components/store/home/FeatureProduct";
import FeedbackSection from "../components/store/home/FeedbackSection";
import Hero from "../components/store/home/Hero";
import TrendingProducts from "../components/store/home/TrendingProducts";
import WeeklyBestDeals from "../components/store/home/WeeklyBestDeals";
import useBlog from "../components/store/dataFetching/useBlog";
import useTheme from "../components/store/dataFetching/useTheme";
import PreLoader from "../components/store/common/others/PreLoader";
import HalalFoodHero from "../components/store/halalFood/HalalFoodHero";
import HalalCounter from "../components/store/halalFood/HalalCounter";
import HalalFoodCategory from "../components/store/halalFood/HalalFoodCategory";
import HalalAboutUs from "../components/store/halalFood/HalalAboutUs";
import HalalMostPopularProduct from "../components/store/halalFood/HalalMostPopularProduct";
import HalalChooseUs from "../components/store/halalFood/HalalChooseUs";
import HalalFeedback from "../components/store/halalFood/HalalFeedback";
import HalalOnSaleProduct from "../components/store/halalFood/HalalOnSaleProduct";
import HalalFoodNews from "../components/store/halalFood/HalalFoodNews";
import { useMainContextStore } from "../components/store/provider/MainContextStore";
import FurnitureHero from "components/store/furniture/FurnitureHero";
import FurnitureCategory from "components/store/furniture/FurnitureCategory";
import FurnitureProductBanner from "components/store/furniture/FurnitureProductBanner";
import FurnitureFeature from "components/store/furniture/FurnitureFeature";
import FurnitureBlog from "components/store/furniture/FurnitureBlog";
import FurnitureFeatureBrand from "components/store/furniture/FurnitureFeatureBrand";
import useProducts from "components/store/dataFetching/useProducts";
import MedicineHero from "components/store/medicineStore/MedicineHero";
import MedicineSearchFilter from "components/store/medicineStore/MedicineSearchFilter";
import MedicineProductBanner from "components/store/medicineStore/MedicineProductBanner";
import MedicineCategorys from "components/store/medicineStore/MedicineCategorys";
import MedicineProducts from "components/store/medicineStore/MedicineProducts";
import MedicineFeedback from "components/store/medicineStore/MedicnineFeedback";
import MedicineAppDownload from "components/store/medicineStore/MedicineAppDownload";
import MedicineCta from "components/store/medicineStore/MedicineCta";
import usebrands from "components/store/dataFetching/useBrand";
import HalalMeatHero from "components/store/halalMeat/HalalMeatHero";
import HalalMeatFeature from "components/store/halalMeat/HalalMeatFeature";
import HalalMeatCategory from "components/store/halalMeat/HalalMeatCategory";
import HalalMeatAbout from "components/store/halalMeat/HalalMeatAbout";
import HalalMeatCounter from "components/store/halalMeat/HalalMeatCounter";
import HalalMeatBestSellers from "components/store/halalMeat/HalalMeatBestSellers";
import HalalMeatBanner from "components/store/halalMeat/HalalMeatBanner";
import HalalMeatWhyChooseUs from "components/store/halalMeat/HalalMeatWhyChooseUs";
import HalalMeatPopularPartner from "components/store/halalMeat/HalalMeatPopularPartner";
import HalalMeatFeedback from "components/store/halalMeat/HalalMeatFeedback";
import HalalMeatLocation from "components/store/halalMeat/HalalMeatLocation";

const Page = () => {
  const { brands } = usebrands();
  const { setting, settingLoading } = useTheme();
  const { products, productsLoading } = useProducts();
  const { categorys, categoryLoading } = useCategory();
  const { blogs, blogLoading } = useBlog();
  const { demo } = useMainContextStore();
  // console.log(
  //   "productsLoading",
  //   productloading,
  //   settingLoading,
  //   categoryLoading
  // );
  // console.log("setting", setting);
  return (
    <>
      {settingLoading || categoryLoading || productsLoading ? (
        <PreLoader />
      ) : (
        <div>
          {demo === "Halal Food" && (
            <>
              <HalalFoodHero setting={setting} />
              <HalalCounter setting={setting} />
              <HalalFoodCategory categorys={categorys} setting={setting} />
              <HalalAboutUs setting={setting} />
              <HalalMostPopularProduct setting={setting} products={products} />
              <HalalChooseUs setting={setting} />
              <HalalFeedback setting={setting} />
              <HalalOnSaleProduct setting={setting} products={products} />
              <HalalFoodNews blogs={blogs} setting={setting} />
            </>
          )}
          {demo === "Grocery" && (
            <>
              <Hero setting={setting} />
              <Category categorys={categorys} products={products} />
              <FeatureProduct products={products} setting={setting} />
              <TrendingProducts products={products} setting={setting} />
              <BannerOne setting={setting} />
              <WeeklyBestDeals products={products} setting={setting} />
              <BannerTwo setting={setting} />
              <FeedbackSection setting={setting} />
              <Blog blogs={blogs} />
            </>
          )}
          {demo === "Furniture" && (
            <div className="main-wrapper clr-scheme clr-scheme--home-seven">
              <FurnitureHero setting={setting} />
              <FurnitureCategory
                setting={setting}
                categorys={categorys}
                products={products}
              />
              <FurnitureProductBanner setting={setting} />
              <FurnitureFeature
                setting={setting}
                categorys={categorys}
                products={products}
              />
              <FurnitureFeatureBrand setting={setting} products={products} />
              <FurnitureBlog blogs={blogs} />
            </div>
          )}

          {demo === "Medicine" && (
            <div className="clr-scheme">
              <MedicineHero setting={setting?.home4 as any} />
              <MedicineSearchFilter
                products={products}
                categorys={categorys}
                brands={brands}
              />
              <MedicineProductBanner setting={setting?.home4 as any} />
              <MedicineCategorys
                categorys={categorys}
                setting={setting?.home4 as any}
              />
              <MedicineProducts setting={setting?.home4 as any} products={products} />
              <MedicineFeedback setting={setting?.home4 as any} />
              <MedicineAppDownload setting={setting?.home4 as any} />
              <MedicineCta setting={setting?.home4 as any} />
            </div>
          )}

          {demo === "Halal Meat" && (
            <>
              <HalalMeatHero setting={setting?.home5 as any} />
              <HalalMeatFeature setting={setting?.home5 as any} />
              <HalalMeatCategory
                setting={setting?.home5 as any}
                categorys={categorys}
              />
              <HalalMeatAbout setting={setting?.home5 as any} />
              <HalalMeatCounter setting={setting?.home5 as any} />
              <HalalMeatBestSellers
                setting={setting?.home5 as any}
                products={products}
              />
              <HalalMeatBanner setting={setting?.home5 as any} />
              <HalalMeatWhyChooseUs setting={setting?.home5 as any} />
              <HalalMeatPopularPartner
                setting={setting?.home5 as any}
                products={products}
              />
              <HalalMeatFeedback setting={setting?.home5 as any} />
              <HalalMeatLocation setting={setting?.home5 as any} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
