"use client";

import useBuilder from "@/hooks/useBuilder";
import { cn } from "@/lib/utils";
import { Draggable, Droppable, useMouseSensor } from "@hello-pangea/dnd";
import { FormWidgetInstance, FormWidgets } from "./FormWidgets";
import { useState } from "react";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

function Designer() {
  const { elements } = useBuilder();

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl ">
          <Droppable droppableId="designer">
            {(provided, snapshot) => (
              <div
                className={cn(
                  "w-full h-full flex flex-col flex-grow items-center justify-start flex-1 rounded-xl overflow-y-auto",
                  snapshot.isDraggingOver && "ring"
                )}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex flex-col w-full p-4">
                  {elements.map((element, index) => (
                    <DesignerElementWrapper
                      key={element.id}
                      element={element}
                      index={index}
                    />
                  ))}
                </div>
                {provided.placeholder}
                {elements.length <= 0 && (
                  <div className="flex items-center justify-center flex-grow">
                    <p className="text-3xl font-bold text-gray-500 animate-pulse">
                      DROP HERE
                    </p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
}

const DesignerElementWrapper = ({
  element,
  index,
}: {
  element: FormWidgetInstance;

  index: number;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useBuilder();

  const DesignerElement = FormWidgets[element.type].builderComponent;
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  return (
    <Draggable
      key={element.id}
      draggableId={`widget-${element.id}`}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
          className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset mb-2"
        >
          {mouseIsOver && (
            <>
              <div className="absolute right-0 h-full z-[1]">
                <Button
                  className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
                  variant="outline"
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
              "flex w-full h-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100",
              mouseIsOver && "opacity-30"
            )}
          >
            <DesignerElement elementInstance={element} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const MyCustomPlaceHolder = () => {
  return <div>GHOST</div>;
};

export default Designer;
