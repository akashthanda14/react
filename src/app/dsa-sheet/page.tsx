import { Metadata } from "next";
import { DsaSheetProvider } from "./context/DsaSheetContext";
import { DsaDashboardLayout } from "./components/DsaDashboardLayout";

export const metadata: Metadata = {
  title: "DSA Sheet | Akash Code Official",
  description: "Track your progress and solve the most frequent Data Structures and Algorithms problems.",
};

export default function DsaSheetPage() {
  return (
    <DsaSheetProvider>
      <DsaDashboardLayout />
    </DsaSheetProvider>
  );
}
