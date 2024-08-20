import { useCookies } from "react-cookie";
import useSWR from "swr";

import { ReviewForm } from "~/components/reviewForm";
import { fetchWithToken } from "~/utils/fetcher";

import type { FC } from "react";
import type { Review } from "~/types/api";

type Props = {
  id: string;
};

export const EditReview: FC<Props> = ({ id }) => {
  const [cookie] = useCookies(["token"]);
  const { data } = useSWR<Review>(
    [`${import.meta.env.VITE_API_URL}/books/${id}`],
    ([url]) => fetchWithToken(url, cookie.token),
    { suspense: true }
  );

  return (
    <div className="mx-auto ml-20">
      <h2 className="text-xl font-semibold mt-6 mb-3">レビュー編集</h2>
      {data ? <ReviewForm review={data} /> : "Loading..."}
    </div>
  );
};
