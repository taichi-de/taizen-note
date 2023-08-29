import { Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  totalBlogs: number;
  setOffset: Dispatch<SetStateAction<number>>;
  perPage: number;
};

export const Pagination = ({ totalBlogs, setOffset, perPage }: Props) => {
  const handlePageChange = (data: { selected: number }) => {
    setOffset(data.selected * perPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={Math.ceil(totalBlogs / perPage)}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      className="flex justify-around w-[50%] mx-auto p-5 text-third text-[1rem]"
    />
  );
};

export default Pagination;
