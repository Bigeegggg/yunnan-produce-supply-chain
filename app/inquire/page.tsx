"use client";

import { Suspense } from "react";
import InquireForm from "./InquireForm";
import { useT } from "@/lib/i18n";

function LoadingFallback() {
  const { t } = useT();
  return <div className="min-h-screen bg-warm pt-28 text-center text-text-primary/30">{t.common_loading}</div>;
}

export default function InquirePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InquireForm />
    </Suspense>
  );
}
