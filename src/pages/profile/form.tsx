import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import type { ChangeEvent, FC } from "react";
import type { SubmitHandler } from "react-hook-form";

import type { APIError, UpdateUserResponse, UploadUserIconResponse, User } from "~/types/api";

type Props = {
  user: User;
  setUser: (user: User) => void;
};

type Inputs = {
  name: string;
  icon: FileList;
};

export const ProfileForm: FC<Props> = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: user.name,
    },
  });
  const [cookie] = useCookies(["token"]);
  const [image, setImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user.iconUrl) setImage(user.iconUrl);
  }, [user.iconUrl]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    if (!res.ok) {
      const r = (await res.json()) as APIError;
      setErrorMessage(r.ErrorMessageJP);
      return;
    }

    const r = (await res.json()) as UpdateUserResponse;
    setUser({ ...user, name: r.name });

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
            Authorization: `Bearer ${cookie.token}`,
          },
          body: formData,
        }).then(async (res) => {
          if (res.ok) {
            const r = (await res.json()) as UploadUserIconResponse;
            setUser({ ...user, iconUrl: r.iconUrl });
          }
        });
      },
    });
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
            })}
          />
          {errors.name && <p className="text-red-500 text-sm">ユーザー名を入力してください</p>}
        </div>
        <div className="flex flex-col gap-y-0.5">
          <label>アイコン</label>
          {image && !errors.icon && <img src={image} className="w-20 h-20" />}
          <input
            type="file"
            className="rounded-md outline-none text-gray-900 p-1.5"
            {...register("icon", {
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
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-sm my-4">{errorMessage}</p>}
      <input
        type="submit"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        value="登録情報更新"
      />
    </form>
  );
};
