import { Link, Redirect } from "wouter";

import { Layout } from "~/components/layout";
import { useAuth } from "~/contexts/auth";
import { SignUpForm } from "./form";

import type { FC } from "react";

export const SignUp: FC = () => {
  const { authenticated } = useAuth();
  if (authenticated) return <Redirect to="/" />;

  return (
    <Layout>
      <div className="mx-auto ml-20">
        <h2 className="text-xl font-semibold mt-6 mb-3">新規登録</h2>
        <SignUpForm />
        <Link href="/login" className="inline-block text-blue-700 underline my-3">
          既にアカウントをお持ちの方はログイン
        </Link>
      </div>
    </Layout>
  );
};
