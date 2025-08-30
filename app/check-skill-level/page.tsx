import QuizPage from "@/components/ui/check-skill-quiz";
import { Suspense } from "react";

export default function QuizPageWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>}>
      <QuizPage />
    </Suspense>
  );
}
