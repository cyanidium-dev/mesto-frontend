import { Suspense } from "react";
import Main from "@/components/mainPage/Main";

export default function MainPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}
