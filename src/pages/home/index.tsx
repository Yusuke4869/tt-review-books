import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useSWR from "swr";
import { Link } from "wouter";

import { Layout } from "~/components/layout";
import { useAuth } from "~/contexts/auth";
import { fetchWithToken } from "~/utils/fetcher";
import { Book } from "./book";
import { Pagination } from "./pagination";

import type { FC } from "react";
import type { Review } from "~/types/api";

export const Home: FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [cookies] = useCookies(["token"]);
  const { authenticated } = useAuth();

  const { data } = useSWR<Review[]>(
    authenticated
      ? [`${import.meta.env.VITE_API_URL}/books?offset=${(page > 1 ? (page - 1) * 10 : 0).toString()}`, cookies.token]
      : [`${import.meta.env.VITE_API_URL}/public/books?offset=${(page > 1 ? (page - 1) * 10 : 0).toString()}`, ""],
    ([url, token]) => fetchWithToken(url, token as string)
  );

  useEffect(() => {
    if (page <= 1) window.history.replaceState(null, "", "/");
    else window.history.replaceState(null, "", `/?page=${page.toString()}`);
  }, [page]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center py-10">レビュー一覧</h1>
      <div className="mx-[5%] md:mx-[20%] lg:mx-[25%]">
        {authenticated && (
          <div className="flex justify-end">
            <Link href="/new">
              <button className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2">
                レビューを投稿する
              </button>
            </Link>
          </div>
        )}
        <Pagination changePage={setPage} currentPage={page} />
        {data && data.length > 0 && (
          <>
            <div>
              {data.map((book) => (
                <Book key={book.id} data={book} />
              ))}
            </div>
            <Pagination changePage={setPage} currentPage={page} />
          </>
        )}
      </div>
    </Layout>
  );
};
