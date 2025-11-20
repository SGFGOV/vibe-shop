"use client";

import ReactPaginate from 'react-paginate';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
  pageCount: number;
  handlePageChange: (data: { selected: number }) => void;
}

const Pagination = ({ pageCount, handlePageChange }: PaginationProps) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="pagination mt-7"
        pageLinkClassName="page-link"
        activeClassName="page-item active"
        previousClassName="page-link d-flex align-items-center"
        nextClassName="page-link d-flex align-items-center"
        previousLabel={<MdOutlineKeyboardArrowLeft />}
        nextLabel={<MdOutlineKeyboardArrowRight />}
      />
    </>
  );
};

export default Pagination;

