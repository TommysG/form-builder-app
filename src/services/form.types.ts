import { FormWidgetInstance } from "@/components/FormWidgets";

export interface IResponseData<T> {
  status: number;
  data: T;
  message: string;
}

export interface IResponse {
  status: number;
  message: string;
}

export interface CreateFormRequestBody {
  name: string;
  description?: string;
}

export interface UpdateFormRequestBody {
  id: string;
  fields?: IFormField[];
  published?: boolean;
}

export interface IForm {
  id: string;
  name: string;
  description: string;
  fields: FormWidgetInstance[];
}

export interface IFormField {
  id: string;
  type: string;
  extraAttributes: {
    label: string;
    helperText?: string;
    required?: boolean;
    placeHolder?: string;
  };
}
