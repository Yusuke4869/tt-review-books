import { useEffect, useState } from "react";
import useSWR from "swr";

import { fetcher } from "~/utils/fetcher";
import Book from "./book";
import Pagination from "./pagination";

import type { FC } from "react";
import type { Review } from "~/types/api";

export const Home: FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);

  const { data } = useSWR<Review[]>(
    `${import.meta.env.VITE_API_URL}/public/books?offset=${(page > 1 ? (page - 1) * 10 : 0).toString()}`,
    fetcher
  );

  useEffect(() => {
    if (page <= 1) window.history.replaceState(null, "", "/");
    else window.history.replaceState(null, "", `/?page=${page.toString()}`);
  }, [page]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center py-10">レビュー一覧</h1>
      <div>
        <Pagination changePage={setPage} currentPage={page} />
      </div>
      {data && data.length > 0 && (
        <>
          <div className="mx-[5%] md:mx-[20%] lg:mx-[25%]">
            {data.map((book) => (
              <Book key={book.id} data={book} />
            ))}
          </div>
          <div>
            <Pagination changePage={setPage} currentPage={page} />
          </div>
        </>
      )}
    </>
  );
};
