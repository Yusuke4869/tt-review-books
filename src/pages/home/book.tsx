import { Link } from "wouter";

import type { FC } from "react";
import type { Review } from "~/types/api";

type Props = {
  data: Review;
};

const Book: FC<Props> = ({ data }) => {
  const { id, title, detail, reviewer } = data;

  return (
    <Link href={`/detail/${id}`}>
      <div className="bg-gray-100 shadow-sm rounded p-4 mb-4">
        <h2 className="text-xl font-semibold truncate">{title}</h2>
        <p className="truncate">{detail}</p>
        <p className="text-xs mt-1">Reviewed by {reviewer}</p>
      </div>
    </Link>
  );
};

export default Book;
