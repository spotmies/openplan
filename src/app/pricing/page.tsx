import type { Metadata } from "next";
import PricingPageView from "@/views/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | OpenPlan",
  description:
    "OpenPlan is priced per active project per month, with AI, storage and users included. Compare Free, Starter, Pro and Enterprise.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return <PricingPageView />;
}
