import { useCookies } from "react-cookie";
import { useLocation } from "wouter";

import { useAuth } from "~/contexts/auth";

import type { FC } from "react";
import type { Review } from "~/types/api";

type Props = {
  data: Review;
};

export const Book: FC<Props> = ({ data }) => {
  const { id, title, detail, reviewer, isMine } = data;
  const { authenticated } = useAuth();
  const [, navigate] = useLocation();
  const [cookies] = useCookies(["token"]);

  return (
    <div
      className={`bg-gray-100 shadow-sm rounded p-4 mb-4 ${authenticated && "cursor-pointer"}`}
      onClick={() => {
        if (!authenticated) return;
        if (isMine) {
          navigate(`/edit/${id}`);
          return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            selectBookId: id,
          }),
        });
        navigate(`/detail/${id}`);
      }}
    >
      <h2 className="text-xl font-semibold truncate">{title}</h2>
      <p className="truncate">{detail}</p>
      <p className={`text-xs mt-1 ${isMine && "text-red-500"}`}>
        {isMine ? "あなたのレビュー" : `Reviewed by ${reviewer}`}
      </p>
    </div>
  );
};
