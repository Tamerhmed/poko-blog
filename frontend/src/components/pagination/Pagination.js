import { useEffect } from "react";
import "./pagination.css";

const Pagination = ({pages, setCurrentPage, currentPage}) => {
  
  const generatedPages = [];
  
  for(let i = 1;i <= pages; i++) {
      generatedPages.push(i);
  }
  

  return (
    <div className="pagination">
      <button
      onClick={()=> setCurrentPage(current => current - 1)}
      disabled={currentPage === 1}
       className="page previous"
       >
        Previous
      </button>
      {generatedPages.map((page) => {
        return(
            <div 
            className={currentPage === page ? "page active" : "page"}
            key={page}
            onClick={()=> setCurrentPage(page)}
            >
              {page}
            </div>
          )}
        )}
      <button
       className="page next"
       onClick={()=> setCurrentPage(current => current + 1)}
       disabled={currentPage === pages}
       >
        Next
      </button>
    </div>
  );
};

export default Pagination;
