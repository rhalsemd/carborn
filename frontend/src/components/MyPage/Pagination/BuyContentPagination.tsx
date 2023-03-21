import { useState } from 'react';

export interface BuyContentPaginationProps {
  data: never[],
  itemsPerPage: number;
}

const BuyContentPagination = ({data, itemsPerPage}:BuyContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  if(data.length === 0) {
    return <div>No data Found!</div>
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>차량 모델</th>
            <th>차량 번호</th>
            <th>{`주행 거리(km)`}</th>
            <th>{`연식(년)`}</th>
            <th>구매가</th>
            <th>{'구매 완료일'}</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car: {
            model: string;
            number: string;
            mileage: string;
            year: string;
            registrationDate: string;
            buyprice: string;
          },
          index: number
          ) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.number}</td>
              <td>{car.mileage}</td>
              <td>{car.year}</td>
              <td>{car.registrationDate}</td>
              <td>{car.buyprice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 3) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
} 

export default BuyContentPagination;