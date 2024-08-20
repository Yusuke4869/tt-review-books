import { useCookies } from "react-cookie";
import { Link, useLocation } from "wouter";

import { useAuth } from "~/contexts/auth";

import type { FC } from "react";

export const Header: FC = () => {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white p-6">
      <h1 className="text-2xl font-semibold">
        <Link href="/">書籍レビュー</Link>
      </h1>
      {user ? (
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="flex items-center gap-2">
            {user.iconUrl && <img src={user.iconUrl} alt={`${user.name}'s icon`} className="h-9 w-9 rounded-full" />}
            <p className="text-lg">{user.name}</p>
          </div>
          <Link href="/profile" className="bg-white text-indigo-600 rounded-lg px-4 py-2 text-sm">
            ユーザー情報を編集
          </Link>
          <button className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      ) : (
        <Link href="/login" className="bg-white text-indigo-600 rounded-lg px-4 py-2 text-sm">
          ログイン
        </Link>
      )}
    </header>
  );
};
