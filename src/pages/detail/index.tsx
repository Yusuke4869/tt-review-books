import { Suspense } from "react";
import { Redirect, useRoute } from "wouter";

import { Layout } from "~/components/layout";
import { useAuth } from "~/contexts/auth";
import { DetailReview } from "./review";

import type { FC } from "react";

export const Detail: FC = () => {
  const [match, params] = useRoute("/detail/:id");
  const { authenticated } = useAuth();
  if (!authenticated) return <Redirect to="/login" />;

  return (
    <Layout>
      <Suspense fallback="Loading...">{match ? <DetailReview id={params.id} /> : "404, Not Found"}</Suspense>
    </Layout>
  );
};
