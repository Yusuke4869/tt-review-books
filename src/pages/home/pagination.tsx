import type { FC } from "react";

type Props = {
  currentPage: number;
  changePage: (page: number) => void;
};

export const Pagination: FC<Props> = ({ currentPage, changePage }) => (
  <div className="flex justify-center items-center gap-3 my-6">
    <button
      className={`h-10 rounded-md px-2 hover:bg-gray-200 ${currentPage === 1 ? "text-gray-300" : "text-black"}`}
      disabled={currentPage === 1}
      onClick={() => {
        changePage(currentPage - 1);
      }}
      type="button"
    >
      Prev
    </button>
    <span className="flex items-center justify-center w-10 h-10 rounded-md text-center bg-gray-300">{currentPage}</span>
    <button
      className="h-10 rounded-md px-2 hover:bg-gray-200"
      onClick={() => {
        changePage(currentPage + 1);
      }}
      type="button"
    >
      Next
    </button>
  </div>
);
