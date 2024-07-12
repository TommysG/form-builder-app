import React, { Fragment, ReactElement, ReactNode } from "react";
import { Button } from "../ui/button";
import { FormWidgets, FormWidget, WidgetsType } from "../FormWidgets";
import { Separator } from "../ui/separator";
import { idGenerator } from "@/lib/idGenerator";
import useBuilder from "@/hooks/useBuilder";
import PropertiesSidebar from "../PropertiesSidebar";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
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

  const draggable = useDraggable({
    id: `widget-sidebar-${type}`,
    data: {
      isSidebarWidget: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  widget,
}: {
  widget: FormWidget;
}) {
  const { label, icon: Icon } = widget.designerBtnElement;

  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default BuilderSidebar;
