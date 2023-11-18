import BuilderContextProvider from "@/context/BuilderContext";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <BuilderContextProvider>
      <div className="flex w-full flex-grow mx-auto">{children}</div>
    </BuilderContextProvider>
  );
}

export default Layout;
