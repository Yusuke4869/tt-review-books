import { Redirect } from "wouter";

import { Layout } from "~/components/layout";
import { ReviewForm } from "~/components/reviewForm";
import { useAuth } from "~/contexts/auth";

import type { FC } from "react";

export const NewReview: FC = () => {
  const { authenticated } = useAuth();
  if (!authenticated) return <Redirect to="/login" />;

  return (
    <Layout>
      <div className="mx-auto ml-20">
        <h2 className="text-xl font-semibold mt-6 mb-3">新規レビュー</h2>
        <ReviewForm review={null} />
      </div>
    </Layout>
  );
};
