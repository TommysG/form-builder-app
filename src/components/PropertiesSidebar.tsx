import React from "react";
import { FormWidgets, WidgetsType } from "./FormWidgets";
import useBuilder from "@/hooks/useBuilder";
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "./ui/separator";

function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useBuilder();

  if (!selectedElement) {
    return null;
  }

  const PropertiesForm =
    FormWidgets[selectedElement?.type as WidgetsType].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesSidebar;
