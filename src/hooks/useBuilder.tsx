"use client";

import { BuilderContext } from "@/context/BuilderContext";
import { useContext } from "react";

function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("useDesigner must be used within a DesignerContext");
  }

  return context;
}

export default useBuilder;
