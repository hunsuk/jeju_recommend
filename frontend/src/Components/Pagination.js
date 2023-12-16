// Pagination.jsx
import React from "react";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <li
          key={i}
          style={{
            display: "inline",
            margin: "0 5px",
            cursor: "pointer",
            fontWeight: i === currentPage + 1 ? "bold" : "normal",
          }}
          onClick={() => onPageChange(i - 1)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul style={{ listStyle: "none", padding: 0, textAlign: "center" }}>
      {renderPageNumbers()}
    </ul>
  );
};

export default Pagination;
