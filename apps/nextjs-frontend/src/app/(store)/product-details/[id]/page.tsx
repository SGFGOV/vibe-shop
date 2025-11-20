import RelatatedProduct from "components/store/productDetails/RelatatedProduct";
import Breadcrumb from "components/store/common/others/Breadcrumb";
import ProductDetailsBody from "components/store/productDetails/ProductDetailsBody";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <Breadcrumb title="Product Detailos" page="product details" />
      <ProductDetailsBody id={id} />
      <RelatatedProduct id={id} />
    </>
  );
}
