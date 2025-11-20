"use client";

import ShopGridProductTwo from "./ShopGridProductTwo";
import ShopGridSidebar from "./ShopGridSidebar";

const ShopGridBodyTwo = () => {
  return (
    <>
      <section className="gshop-gshop-grid ptb-120">
        <div className="container">
          <div className="row g-4">
            <ShopGridSidebar
              setFilterMinPrice={() => {}}
              setFilterMaxPrice={() => {}}
              resetFilters={() => {}}
              filterMaxPrice={0}
              filterMinPrice={0}
              setSearchText={() => {}}
              searchText=""
            />
            <ShopGridProductTwo />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopGridBodyTwo;

