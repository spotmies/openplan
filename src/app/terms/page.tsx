import type { Metadata } from "next";
import TermsPageView from "@/views/TermsPage";

export const metadata: Metadata = {
  title: "Terms of Use | OpenPlan",
};

export default function Page() {
  return <TermsPageView />;
}
