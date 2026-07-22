import { Suspense } from "react";
import InquireForm from "./InquireForm";

export default function InquirePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm pt-28 text-center text-text-primary/30">Loading...</div>}>
      <InquireForm />
    </Suspense>
  );
}
