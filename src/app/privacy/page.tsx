import type { Metadata } from "next";
import PrivacyPageView from "@/views/PrivacyPage";

export const metadata: Metadata = {
  title: "Data Privacy Notice | OpenPlan",
};

export default function Page() {
  return <PrivacyPageView />;
}
