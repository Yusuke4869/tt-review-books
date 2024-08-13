import { useCookies } from "react-cookie";

import { useAuth } from "~/contexts/auth";

import type { FC } from "react";

const Header: FC = () => {
  const { user } = useAuth();
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "/login";
  };

  return (
    <header className="flex justify-between items-center bg-indigo-600 text-white p-6">
      <h1 className="text-2xl font-semibold">
        <a href="/">書籍レビュー</a>
      </h1>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user.iconUrl && <img src={user.iconUrl} alt={`${user.name}'s icon`} className="h-9 w-9 rounded-full" />}
            <p className="text-lg">{user.name}</p>
          </div>
          <a href="/profile" className="bg-white text-indigo-600 rounded-lg px-4 py-2 text-sm">
            ユーザー情報を編集
          </a>
          <button className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      ) : (
        <a href="/login" className="bg-white text-indigo-600 rounded-lg px-4 py-2 text-sm">
          ログイン
        </a>
      )}
    </header>
  );
};

export default Header;
