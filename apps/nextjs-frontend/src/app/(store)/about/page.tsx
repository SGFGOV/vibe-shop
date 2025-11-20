"use client";
import AboutBrandSlider from "components/store/about/AboutBrandSlider";
import AboutTop from "components/store/about/AboutTop";
import AboutUs from "components/store/about/AboutUs";
import Breadcrumb from "components/store/common/others/Breadcrumb";
import OurWorkingAbility from "components/store/common/others/OurWorkingAbility";
import usebrands from "components/store/dataFetching/useBrand";
import useProducts from "components/store/dataFetching/useProducts";
import useUsers from "components/store/dataFetching/useUsers";
import useOrders from "components/store/dataFetching/useOrders";
import PreLoader from "components/store/common/others/PreLoader";

export default function AboutPage() {
  // Setting removed - using empty object
  const setting: Record<string, unknown> = {};
  const settingLoading = false;
  const { brands, brandLoading } = usebrands();
  const { orders, ordersLoading } = useOrders();
  const { products, productsLoading } = useProducts();
  const { users, usersLoading } = useUsers();

  const isLoading = settingLoading || brandLoading || ordersLoading || productsLoading || usersLoading;

  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <Breadcrumb title="About Us" />
          <AboutTop setting={setting?.about as Record<string, unknown>} />
          <AboutBrandSlider brands={brands} setting={setting?.about as Record<string, unknown>} />
          <OurWorkingAbility
            orders={orders}
            products={products}
            users={users}
          />
          <AboutUs setting={setting?.about as Record<string, unknown>} />
        </>
      )}
    </>
  );
}

