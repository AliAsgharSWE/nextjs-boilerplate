"use client";

import { Suspense } from "react";
import { LayoutScripts } from "./LayoutScripts";

const LayoutScriptsWrapper = () => {
  return (
    <Suspense fallback={<></>}>
      <LayoutScripts />
    </Suspense>
  );
};

export default LayoutScriptsWrapper;
