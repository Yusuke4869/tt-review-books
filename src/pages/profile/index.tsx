import { Redirect } from "wouter";

import { useAuth } from "~/contexts/auth";
import { ProfileForm } from "./form";

import type { FC } from "react";

export const Profile: FC = () => {
  const { authenticated, user, setUser } = useAuth();
  if (!authenticated || !user) return <Redirect to="/login" />;

  return (
    <div className="mx-auto ml-20">
      <h2 className="text-xl font-semibold mt-6 mb-3">ユーザ情報編集</h2>
      <ProfileForm user={user} setUser={setUser} />
    </div>
  );
};
