import { CheckboxWidget } from "./widgets/CheckboxWidget";
import { DateWidget } from "./widgets/DateWidget";
import { LabelWidget } from "./widgets/LabelWidget";
import { NumberWidget } from "./widgets/NumberWidget";
import { TextWidget } from "./widgets/TextWidget";

export type WidgetsType = "Checkbox" | "Date" | "Label" | "Text" | "Number";

export type SubmitFunction = (key: string, value: string) => void;

export type FormWidgetInstance = {
  id: string;
  type: WidgetsType;
  extraAttributes?: Record<string, any>;
};

export type FormWidget = {
  type: WidgetsType;
  construct: (id: string) => FormWidgetInstance;
  validate: (formElement: FormWidgetInstance, currentValue: string) => boolean;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  builderComponent: React.FC<{
    elementInstance: FormWidgetInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormWidgetInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormWidgetInstance;
  }>;
};

type FormWidgetsType = {
  [key in WidgetsType]: FormWidget;
};
export const FormWidgets: FormWidgetsType = {
  Text: TextWidget,
  Number: NumberWidget,
  Checkbox: CheckboxWidget,
  Date: DateWidget,
  Label: LabelWidget,
};
