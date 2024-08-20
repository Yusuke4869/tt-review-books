import { useCookies } from "react-cookie";
import useSWR from "swr";

import { fetchWithToken } from "~/utils/fetcher";

import type { FC } from "react";
import type { Review } from "~/types/api";

type Props = {
  id: string;
};

export const DetailReview: FC<Props> = ({ id }) => {
  const [cookies] = useCookies(["token"]);
  const { data } = useSWR<Review>(
    [`${import.meta.env.VITE_API_URL}/books/${id}`],
    ([url]) => fetchWithToken(url, cookies.token),
    { suspense: true }
  );

  return data ? (
    <div className="flex flex-col gap-y-2 mt-10 mx-10 md:mx-20">
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-3">{data.title}</h2>
        <a href={data.url} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600">
          {data.url}
        </a>
        <p>{data.detail}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mt-6 mb-3">Review</h3>
        <p>{data.review}</p>
        <p className="mt-2 text-xs">Reviewed by {data.reviewer}</p>
      </div>
    </div>
  ) : (
    <p>404, Not Found</p>
  );
};
