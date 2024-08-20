import { Link, Redirect } from "wouter";

import { Layout } from "~/components/layout";
import { useAuth } from "~/contexts/auth";
import { LoginForm } from "./form";

import type { FC } from "react";

export const Login: FC = () => {
  const { authenticated } = useAuth();
  if (authenticated) return <Redirect to="/" />;

  return (
    <Layout>
      <div className="mx-auto ml-20">
        <h2 className="text-xl font-semibold mt-6 mb-3">ログイン</h2>
        <LoginForm />
        <Link href="/signup" className="inline-block text-blue-700 underline my-3">
          アカウントをお持ちでない方は新規登録
        </Link>
      </div>
    </Layout>
  );
};
