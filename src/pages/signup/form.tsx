import Compressor from "compressorjs";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

import { useAuth } from "~/contexts/auth";

import type { ChangeEvent, FC } from "react";
import type { SubmitHandler } from "react-hook-form";

import type { APIError, CreateUserResponse } from "~/types/api";

type Inputs = {
  name: string;
  email: string;
  password: string;
  icon: FileList;
};

export const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [, setCookie] = useCookies();
  const [, navigate] = useLocation();
  const [image, setImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setAuthenticated } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const r = (await res.json()) as APIError;
      setErrorMessage(r.ErrorMessageJP);
      return;
    }

    const r = (await res.json()) as CreateUserResponse;

    const icon = data.icon[0];
    if (!icon) return;
    new Compressor(icon, {
      quality: 0,
      success(result) {
        const formData = new FormData();
        formData.append("icon", result, icon.name);

        fetch(`${import.meta.env.VITE_API_URL}/uploads`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${r.token}`,
          },
          body: formData,
        });
      },
    });

    setCookie("token", r.token);
    setAuthenticated(true);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-2 mb-3 w-3/5 lg:w-2/5 xl:w-1/4">
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="name">ユーザー名</label>
          <input
            id="name"
            type="text"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("name", {
              required: true,
              pattern: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">ユーザー名を入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm">正しいメールアドレスを入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            className="rounded-md border-2 border-gray-300 outline-none text-gray-900 p-1.5 focus:border-indigo-600"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-red-500 text-sm">パスワードを入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label>アイコン</label>
          {image && !errors.icon && <img src={image} className="w-20 h-20" />}
          <input
            type="file"
            className="rounded-md outline-none text-gray-900 p-1.5"
            {...register("icon", {
              required: true,
              onChange(e: ChangeEvent<HTMLInputElement>) {
                const files = e.target.files;
                if (!files || files.length <= 0) return;
                const reader = new FileReader();
                reader.onload = () => setImage(reader.result as string);
                reader.readAsDataURL(files[0]);
              },
            })}
            accept="image/png, image/jpeg"
          />
          {errors.icon && <p className="text-red-500 text-sm">画像を選択してください</p>}
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-sm my-4">{errorMessage}</p>}
      <input
        type="submit"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        value="ユーザー登録"
      />
    </form>
  );
};
