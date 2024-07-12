import { useMemo, useState, type PropsWithChildren } from "react";
import {
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDndMonitor,
} from "@dnd-kit/core";
import type { Active, DropAnimation } from "@dnd-kit/core";
import useBuilder from "@/hooks/useBuilder";
import { FormWidgets } from "./FormWidgets";
import { DesignerElementWrapper } from "./Designer";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface Props {}

export function SortableOverlay({ children }: PropsWithChildren<Props>) {
  const { elements } = useBuilder();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  const activeItem = useMemo(
    () => elements.find((item) => item.id === draggedItem?.id),
    [draggedItem, elements]
  );

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
  });

  let node = null;

  if (activeItem) {
    node = <DesignerElementWrapper element={activeItem} />;
  } else {
    node = null;
  }

  return <DragOverlay dropAnimation={dropAnimationConfig}>{node}</DragOverlay>;
}
