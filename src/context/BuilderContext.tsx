"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { FormWidgetInstance } from "@/components/FormWidgets";

type BuilderContextType = {
  elements: FormWidgetInstance[];
  setElements: Dispatch<SetStateAction<FormWidgetInstance[]>>;
  addElement: (index: number, element: FormWidgetInstance) => void;
  removeElement: (id: string) => void;
  removeElementByIndex: (index: number) => void;

  selectedElement: FormWidgetInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormWidgetInstance | null>>;

  updateElement: (id: string, element: FormWidgetInstance) => void;

  reorder: (sourceIndex: number, destIndex: number) => void;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormWidgetInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormWidgetInstance | null>(null);

  const addElement = (index: number, element: FormWidgetInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const removeElementByIndex = (index: number) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 1);
      return newElements;
    });
  };

  const updateElement = (id: string, element: FormWidgetInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  // a little function to help us with reordering the result
  const reorder = (sourceIndex: number, destinationIndex: number) => {
    setElements((prev) => {
      const newElements = [...prev];
      const [removedIndex] = newElements.splice(sourceIndex, 1);

      newElements.splice(destinationIndex, 0, removedIndex);

      return newElements;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        addElement,

        removeElement,
        removeElementByIndex,

        selectedElement,
        setSelectedElement,

        updateElement,
        reorder,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
