import BlogListingBody from "components/store/blogListing/BlogListingBody";
import Breadcrumb from "components/store/common/others/Breadcrumb";

export default function BlogPage() {
  return (
    <>
      <Breadcrumb title="Blog Listing" />
      <BlogListingBody />
    </>
  );
}

