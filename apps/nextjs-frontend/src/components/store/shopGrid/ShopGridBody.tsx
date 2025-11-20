"use client";

import PreLoader from "../common/others/PreLoader";
import useProducts from "../dataFetching/useProducts";
import useProductFilter from "../hooks/useProductsFilter";
import ShopGridProduct from "./ShopGridProduct";
import ShopGridSidebar from "./ShopGridSidebar";

interface ShopGridBodyProps {
  categoryOrBrand?: string;
}

const ShopGridBody = ({ categoryOrBrand }: ShopGridBodyProps) => {
  const { products, productsLoading } = useProducts();
  const {
    setFilterMinPrice,
    setFilterMaxPrice,
    pageCount,
    handlePageChange,
    filteredProducts,
    itemsPerPage,
    currentPage,
    setSortValue,
    resetFilters,
    incrementItems,
    decrementItems,
    filterMaxPrice,
    filterMinPrice,
    sortedAndFilteredProducts,
    setSearchText,
    searchText,
  } = useProductFilter(products, categoryOrBrand);
  
  return (
    <>
      {productsLoading ? (
        <PreLoader />
      ) : (
        <section className="gshop-gshop-grid ptb-120">
          <div className="container">
            <div className="row g-4">
              <ShopGridSidebar
                products={products}
                setFilterMinPrice={setFilterMinPrice}
                setFilterMaxPrice={setFilterMaxPrice}
                resetFilters={resetFilters}
                filterMaxPrice={filterMaxPrice}
                filterMinPrice={filterMinPrice}
                setSearchText={setSearchText}
                searchText={searchText}
              />
              <ShopGridProduct
                pageCount={pageCount}
                handlePageChange={handlePageChange}
                filteredProducts={filteredProducts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setSortValue={setSortValue}
                incrementItems={incrementItems}
                decrementItems={decrementItems}
                sortedAndFilteredProducts={sortedAndFilteredProducts}
                productsLoading={productsLoading}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShopGridBody;

