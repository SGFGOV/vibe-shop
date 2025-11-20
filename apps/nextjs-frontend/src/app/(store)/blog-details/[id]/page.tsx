import BlogDetailsBody from "components/store/blogDetails/BlogDetailsBody";
import Breadcrumb from "components/store/common/others/Breadcrumb";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <Breadcrumb title="Blog Details" />
      <BlogDetailsBody id={id} />
    </>
  );
}

