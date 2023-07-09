/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useEffect } from 'react';
// import Pagination from './Pagination';
import ProductCard from "./ProductCard";
import { usePagination, DOTS } from './usePagination';
import Pagination from 'react-bootstrap/Pagination';


// props: data(product[])
export default function ProductList(props) {
  const PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return props.data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, props.data]);

  const paginationRange = usePagination({
    currentPage,
    totalCount: props.data.length,
    siblingCount: 1,
    pageSize: PageSize
  });
  useEffect(() => {
    setCurrentPage(1)
  }, [props.data]);
  return (
    <div>
      <div className="flex-container" style={{ gap: "15px 20px" }}>
        {currentTableData.map((item, index) => (
          <ProductCard
            key={index}
            name={item.product_name}
            price={item.price}
            description={item.description}
            image={item.picture_source}
            product_id={item.product_id}
            rating={item.product_rating}
          />
        ))}
      </div>
      <Pagination>
        {paginationRange.map((page, idx) => {
          if (page === currentPage) return <Pagination.Item active key={idx}>{page}</Pagination.Item>
          else if (page === DOTS) return <Pagination.Ellipsis disabled key={idx} />
          else return <Pagination.Item onClick={() => { setCurrentPage(page) }} key={idx}>{page}</Pagination.Item>
        })}
      </Pagination>
    </div>
  );
}
