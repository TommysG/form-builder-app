import {
  Active,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  useDndMonitor,
} from "@dnd-kit/core";
import React, { useMemo, useState } from "react";
import { SidebarBtnElementDragOverlay } from "./builder/BuilderSiderbar";
import { FormWidgets, WidgetsType } from "./FormWidgets";
import useBuilder from "@/hooks/useBuilder";

function DragOverlayWrapper() {
  const { elements } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  let node = <></>;
  const isSidebarWidget = draggedItem.data.current?.isSidebarWidget;
  const isBuilderWidget = draggedItem.data.current?.isBuilderWidget;

  if (isSidebarWidget) {
    const type = draggedItem.id.toString().split("-")[2] as WidgetsType;
    node = <SidebarBtnElementDragOverlay widget={FormWidgets[type]} />;
  }

  // if (isBuilderWidget) {
  //   const elementId = draggedItem.id.toString().split("-")[0];
  //   const element = elements.find((el) => el.id === elementId);
  //   if (!element) {
  //     node = <div>Element not found!</div>;
  //   } else {
  //     const DesignerElementComponent =
  //       FormWidgets[element.type].builderComponent;
  //     node = (
  //       <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
  //         <DesignerElementComponent elementInstance={element} />
  //       </div>
  //     );
  //   }
  // }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
