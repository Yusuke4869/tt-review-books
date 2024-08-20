import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

import type { APIError, Review } from "~/types/api";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

type Props = {
  review: Review | null;
};

export const ReviewForm: FC<Props> = ({ review }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: review?.title,
      url: review?.url,
      detail: review?.detail,
      review: review?.review,
    },
  });
  const [cookie] = useCookies(["token"]);
  const [, navigate] = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
      method: review === null ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        url: data.url,
        detail: data.detail,
        review: data.review,
      }),
    });

    if (!res.ok) {
      const r = (await res.json()) as APIError;
      setErrorMessage(r.ErrorMessageJP);
      return;
    }

    navigate("/");
  };

  const deleteReview = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${review?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });

    if (!res.ok) {
      const r = (await res.json()) as APIError;
      setErrorMessage(r.ErrorMessageJP);
      return;
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-2 mb-3 w-3/5 lg:w-2/5">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="title">タイトル</label>
          <input
            id="title"
            type="text"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">タイトルを入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="url"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("url", {
              required: true,
              pattern: /^https?:\/\/[\w!?/+\-_~=;.,*&@#$%()'[\]]+$/,
            })}
          />
          {errors.url && <p className="text-red-500 text-sm">URLを正しい形で入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="detail">詳細</label>
          <textarea
            id="detail"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("detail", {
              required: true,
            })}
          />
          {errors.detail && <p className="text-red-500 text-sm">詳細を入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="review">レビュー</label>
          <textarea
            id="review"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("review", {
              required: true,
            })}
          />
          {errors.review && <p className="text-red-500 text-sm">レビューを入力してください</p>}
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-sm my-4">{errorMessage}</p>}
      <div className="flex gap-x-2">
        <input
          type="submit"
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          value="レビューを投稿する"
        />
        {review && (
          <button
            type="button"
            onClick={deleteReview}
            className="cursor-pointer text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          >
            レビューを削除する
          </button>
        )}
      </div>
    </form>
  );
};
