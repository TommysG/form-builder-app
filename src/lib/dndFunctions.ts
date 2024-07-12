import { FormWidgetInstance, WidgetsType } from "@/components/FormWidgets";
import { Active, DragEndEvent, Over } from "@dnd-kit/core";

export const isMoving = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) {
    return false;
  }

  return (
    active.data.current?.isBuilderWidget && over.data.current?.isBuilderWidget
  );
};

export const isCopying = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) {
    return false;
  }

  return (
    active.data.current?.isSidebarWidget && over.id === "designer-droppable"
  );
};

export const isAdding = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) {
    return false;
  }

  return (
    active.data.current?.isSidebarWidget && over.data.current?.isBuilderWidget
  );
};

export const isAddingBlur = (event: DragEndEvent) => {
  const { active, over } = event;

  const overId = over?.id;

  return !over?.id;
};
