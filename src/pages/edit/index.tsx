import { Suspense } from "react";
import { Redirect, useRoute } from "wouter";

import { Layout } from "~/components/layout";
import { useAuth } from "~/contexts/auth";
import { EditReview } from "./edit";

import type { FC } from "react";

export const Edit: FC = () => {
  const [match, params] = useRoute("/edit/:id");
  const { authenticated } = useAuth();
  if (!authenticated) return <Redirect to="/login" />;

  return (
    <Layout>
      <Suspense fallback="Loading...">{match ? <EditReview id={params.id} /> : "404, Not Found"}</Suspense>
    </Layout>
  );
};
