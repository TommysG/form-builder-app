"use client";

import Designer from "../Designer";
import BuilderSidebar from "./BuilderSiderbar";
import useBuilder from "@/hooks/useBuilder";
import { useEffect, useId, useTransition } from "react";
import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../DragOverlay";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Announcements from "../DndAnnouncements";
import { FormWidgetInstance } from "../FormWidgets";
import { IForm, IFormField } from "@/services/form.types";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import { useUpdateForm } from "@/features/forms/mutation";
import { useToast } from "../ui/use-toast";
import { FaSpinner } from "react-icons/fa";
import PublishForm from "../modals/PublishForm";

function Builder({ form }: { form: IForm }) {
  const { elements } = useBuilder();
  const updateForm = useUpdateForm();
  const { toast } = useToast();
  const id = useId();
  const [isPending, startTransition] = useTransition();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const updateFormContent = async () => {
    try {
      updateForm.mutate({
        id: form.id,
        fields: elements as IFormField[],
      });
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <DndContext id={id} sensors={sensors}>
      {/* <Announcements /> */}
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              className="gap-2"
              disabled={isPending}
              onClick={() => {
                startTransition(updateFormContent);
              }}
            >
              <HiSaveAs className="h-4 w-4" />
              Save
              {isPending && <FaSpinner className="animate-spin" />}
            </Button>
            <PublishForm id={form.id} />
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
          <BuilderSidebar />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default Builder;
