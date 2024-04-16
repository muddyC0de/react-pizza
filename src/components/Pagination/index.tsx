import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (selected: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel={
        <svg
          className="feather feather-chevron-right"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      }
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      forcePage={currentPage - 1}
      pageCount={3}
      previousLabel={
        <svg
          className="feather feather-chevron-left"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      }
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
