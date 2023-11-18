import React, { Fragment, ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { FormWidgets, FormWidget, WidgetsType } from "../FormWidgets";
import { Separator } from "../ui/separator";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableStyle,
  Droppable,
} from "@hello-pangea/dnd";
import { idGenerator } from "@/lib/idGenerator";
import useBuilder from "@/hooks/useBuilder";
import PropertiesSidebar from "../PropertiesSidebar";

const Widgets = [
  FormWidgets.Label,
  FormWidgets.Text,
  FormWidgets.Number,
  FormWidgets.Checkbox,
  FormWidgets.Date,
];

function BuilderSidebar() {
  const { selectedElement } = useBuilder();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormWidgetsSidebar />}
      {selectedElement && <PropertiesSidebar />}
    </aside>
  );
}

function FormWidgetsSidebar() {
  return (
    <>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center  ">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        {Widgets.map((widget, index) => (
          <FormWidgetSidebarElement key={index} widget={widget} index={index} />
        ))}
      </div>
    </>
  );
}

function getStyle(
  style: DraggableStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}

function FormWidgetSidebarElement({
  widget,
  index,
}: {
  widget: FormWidget;
  index: number;
}) {
  const {
    designerBtnElement: { label, icon: Icon },
    formComponent: FormComponent,

    type,
  } = widget;
  return (
    <Droppable droppableId={`widget-${type}`} isDropDisabled={true}>
      {(droppableProvided) => (
        <>
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            <Draggable draggableId={`widget-${type}`} index={index}>
              {(provided, snapshot) => (
                <>
                  <BuilderElement
                    {...{ provided, snapshot, label, type, Icon }}
                  />
                  {snapshot.isDragging && (
                    <div className="bg-background flex flex-col items-center justify-center gap-2 h-[120px] w-[120px] cursor-grab border border-border rounded-s">
                      <Icon className="h-8 w-8 text-primary cursor-grab" />
                      <p className="text-xs">{label}</p>
                    </div>
                  )}
                </>
              )}
            </Draggable>
          </div>
          <span className="hidden">{droppableProvided.placeholder}</span>
        </>
      )}
    </Droppable>
  );
}

const BuilderElement = ({
  provided,
  snapshot,
  label,
  type,
  Icon,
}: {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  label: string;
  type: string;
  Icon: React.ElementType;
}) => {
  // if (snapshot.draggingOver === "builder-1") {
  //   const newElement = FormWidgets[type as WidgetsType].construct(
  //     idGenerator()
  //   );
  //   const DesignerElement = FormWidgets[type as WidgetsType].builderComponent;
  //   return (
  //     <div
  //       ref={provided.innerRef}
  //       {...provided.draggableProps}
  //       {...provided.dragHandleProps}
  //       // style={getStyle(provided.draggableProps.style, snapshot)}
  //       className="w-full flex flex-1"
  //     >
  //       <DesignerElement elementInstance={newElement} />
  //     </div>
  //   );
  // }

  if (snapshot.isDropAnimating) {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided.draggableProps.style, snapshot)}
      ></div>
    );
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided.draggableProps.style, snapshot)}
    >
      <div className="bg-background flex flex-col items-center justify-center gap-2 h-[120px] w-[120px] cursor-grab border border-border rounded-s">
        <Icon className="h-8 w-8 text-primary cursor-grab" />
        <p className="text-xs">{label}</p>
      </div>
    </div>
  );
};

export default BuilderSidebar;
