import { FormWidgets, WidgetsType } from "@/components/FormWidgets";
import { isAdding, isCopying, isMoving } from "@/lib/dndFunctions";
import { idGenerator } from "@/lib/idGenerator";
import {
  useDndMonitor,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import useBuilder from "./useBuilder";
import { useRef } from "react";

interface DnDProps {
  scrollToBottom: () => void;
}

const useBuilderDnd = ({ scrollToBottom }: DnDProps) => {
  const { elements, addElement, removeElementByIndex, reorder } = useBuilder();

  const onDragOverAdded = useRef(false);
  const previousDragMoveIndex = useRef<number>(-1);

  const onDragStart = (event: DragStartEvent) => {
    onDragOverAdded.current = false;
    previousDragMoveIndex.current = -1;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    if (isAdding(event)) {
      const overIndex = over.data.current?.index;
      const type = active.id.toString().split("-")[2];
      const newElement = FormWidgets[type as WidgetsType].construct("-1");

      if (
        overIndex !== previousDragMoveIndex.current &&
        previousDragMoveIndex.current !== -1
      ) {
        removeElementByIndex(previousDragMoveIndex.current);
      }

      if (overIndex !== previousDragMoveIndex.current) {
        addElement(overIndex, newElement);
      }

      onDragOverAdded.current = true;
      previousDragMoveIndex.current = overIndex;
    }

    // if (isAddingBlur(event) && onDragOverAdded.current === true) {
    //   removeElementByIndex(previousDragMoveIndex.current);
    //   onDragOverAdded.current = false;
    // }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      if (onDragOverAdded.current === true) {
        removeElementByIndex(previousDragMoveIndex.current);
      }
      return;
    }

    if (isCopying(event)) {
      const type = active.id.toString().split("-")[2];
      const newElement = FormWidgets[type as WidgetsType].construct(
        idGenerator()
      );
      addElement(elements.length, newElement);
      scrollToBottom();
    } else if (isMoving(event)) {
      const activeIndex = elements.findIndex(
        (element) => active.id === element.id
      );

      const overIndex = elements.findIndex((element) => over.id === element.id);

      reorder(activeIndex, overIndex);
    }

    if (
      over.data.current?.isBuilderWidget &&
      onDragOverAdded.current === true
    ) {
      const ghostElementIndex = elements.findIndex(
        (element) => element.id === "-1"
      );

      if (ghostElementIndex === -1) {
        return;
      }

      const type = elements[ghostElementIndex].type;
      removeElementByIndex(ghostElementIndex);
      const newElement = FormWidgets[type as WidgetsType].construct(
        idGenerator()
      );
      addElement(ghostElementIndex, newElement);
    }

    if (
      over.id.toString() === "designer-droppable" &&
      onDragOverAdded.current === true
    ) {
      const ghostElementIndex = elements.findIndex(
        (element) => element.id === "-1"
      );
      if (ghostElementIndex === -1) {
        return;
      }
      removeElementByIndex(ghostElementIndex);
    }

    if (
      active.data.current?.isBuilderWidget &&
      over.id.toString() === "designer-droppable"
    ) {
      const activeIndex = elements.findIndex(
        (element) => element.id === active.id
      );
      reorder(activeIndex, elements.length);
    }

    onDragOverAdded.current = false;
  };

  useDndMonitor({
    onDragStart,
    onDragOver,
    onDragEnd,
  });
};

export default useBuilderDnd;
