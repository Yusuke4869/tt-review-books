import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

import { useAuth } from "~/contexts/auth";

import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

import type { APIError, SignInResponse } from "~/types/api";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [, setCookie] = useCookies();
  const [, navigate] = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setAuthenticated } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const r = (await res.json()) as APIError;
      setErrorMessage(r.ErrorMessageJP);
      return;
    }

    const r = (await res.json()) as SignInResponse;
    setCookie("token", r.token);
    setAuthenticated(true);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-2 mb-3 w-3/5 lg:w-2/5 xl:w-1/4">
        <div className="flex flex-col gap-y-0.5">
          <label>メールアドレス</label>
          <input
            type="text"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm" data-error-message="email">
              正しいメールアドレスを入力してください
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label>パスワード</label>
          <input
            type="password"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm" data-error-message="password">
              パスワードを入力してください
            </p>
          )}
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-sm my-4">{errorMessage}</p>}
      <input
        type="submit"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        value="ログイン"
      />
    </form>
  );
};
