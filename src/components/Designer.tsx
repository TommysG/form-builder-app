"use client";

import useBuilder from "@/hooks/useBuilder";
import { cn } from "@/lib/utils";
import { FormWidgetInstance, FormWidgets, WidgetsType } from "./FormWidgets";
import { CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";
import {
  Active,
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { idGenerator } from "@/lib/idGenerator";
import {
  SortableContext,
  defaultAnimateLayoutChanges,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import React from "react";
import { SortableOverlay } from "./SortableOverlay";
import { CSS } from "@dnd-kit/utilities";
import DragOverlayWrapper from "./DragOverlay";
import { isCopying, isMoving } from "@/lib/dndFunctions";
import useBuilderDnd from "@/hooks/useDnd";

function Designer() {
  const { elements, selectedElement, setSelectedElement } = useBuilder();

  const designerBottomRef = useRef<HTMLDivElement>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: "designer-droppable",
  });

  const scrollToBottom = useCallback(() => {
    setTimeout(
      () => designerBottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      250
    );
  }, []);

  useBuilderDnd({ scrollToBottom });

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            isOver && "ring"
          )}
        >
          {!isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          <SortableContext
            items={elements}
            strategy={verticalListSortingStrategy}
          >
            <div
              className={cn(
                "flex flex-col w-full p-4",
                elements.length > 0 && "pb-[150px]"
              )}
            >
              {elements.map((element, index) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  index={index}
                />
              ))}
              <div ref={designerBottomRef} />
            </div>
          </SortableContext>
          <SortableOverlay />
        </div>
      </div>
    </div>
  );
}

export const DesignerElementWrapper = ({
  element,
  index,
}: {
  element: FormWidgetInstance;
  index: number;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useBuilder();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: element.id,
    data: {
      isBuilderWidget: true,
      index,
    },
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const DesignerElement = FormWidgets[element.type].builderComponent;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset m-2"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 "
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
          element.id === "-1" && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};

export default Designer;
