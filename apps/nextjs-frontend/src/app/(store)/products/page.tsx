import Breadcrumb from "components/store/common/others/Breadcrumb";
import ShopGridBody from "components/store/shopGrid/ShopGridBody";

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody />
    </>
  );
}
