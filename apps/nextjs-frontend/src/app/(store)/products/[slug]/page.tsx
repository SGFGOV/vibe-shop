import Breadcrumb from "components/store/common/others/Breadcrumb";
import ShopGridBody from "components/store/shopGrid/ShopGridBody";

function extractValue(encodedString: string): string[] {
  const decodedString = decodeURIComponent(encodedString);
  const parts = decodedString.split("=");
  return parts;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductsSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const values = extractValue(slug);
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody categoryOrBrand={values[1]} />
    </>
  );
}

