import { OfflineContent } from "./offline-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "You appear to be offline.",
  robots: { index: false },
};

export default function OfflinePage() {
  return <OfflineContent />;
}
