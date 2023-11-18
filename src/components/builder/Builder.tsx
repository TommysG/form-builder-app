"use client";

import Designer from "../Designer";
import BuilderSidebar from "./BuilderSiderbar";
import { DragDropContext, DragUpdate, DropResult } from "@hello-pangea/dnd";
import useBuilder from "@/hooks/useBuilder";
import { FormWidgets, WidgetsType } from "../FormWidgets";
import { idGenerator } from "@/lib/idGenerator";
import BuilderContextProvider from "@/context/BuilderContext";
import { useEffect, useState } from "react";

const isMoving = (result: DropResult) => {
  const { source, destination } = result;

  if (!destination) {
    return false;
  }

  return (
    source.droppableId === "designer" && destination.droppableId === "designer"
  );
};

const isCopying = (result: DropResult) => {
  const { source, destination } = result;

  if (!destination) {
    return false;
  }

  return (
    source.droppableId.includes("widget") &&
    destination.droppableId === "designer"
  );
};

export type Form = {
  id: number;
  name: string;
};

const queryAttr = "data-rbd-drag-handle-draggable-id";

function Builder({ form }: { form: Form }) {
  const { elements, addElement, reorder } = useBuilder();
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // adding widgets to builder
    if (isCopying(result)) {
      const type = source.droppableId.split("-")[1];
      const newElement = FormWidgets[type as WidgetsType].construct(
        idGenerator()
      );
      addElement(destination.index, newElement);
    } else if (isMoving(result)) {
      reorder(source.index, destination.index);
    }
  };

  useEffect(() => {
    console.log("WIDGETS: ", elements);
  }, [elements]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            {/* <PreviewDialogBtn /> */}
            {/* {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )} */}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
          <BuilderSidebar />
        </div>
      </main>
    </DragDropContext>
  );
}

export default Builder;
