import { axios } from "@/api/axios";
import type {
  CreateFormRequestBody,
  IForm,
  IResponse,
  IResponseData,
  UpdateFormRequestBody,
} from "./form.types";

class FormService {
  /**
   * Get all forms
   * @returns
   */
  async getAllForms() {
    const response = await axios.get<IResponseData<IForm[]>>(`/forms/get`);
    return response.data;
  }

  /**
   * Get form by id
   * @returns
   */
  async getForm(id: string) {
    const response = await axios.get<IResponseData<IForm>>(`/forms/get/${id}`);
    return response.data;
  }

  /**
   * Get form by id
   * @returns
   */
  async getViewForm(shareURL: string) {
    const response = await axios.get<IResponseData<IForm>>(
      `/forms/view/${shareURL}`
    );
    return response.data;
  }

  /**
   * Create new forms
   * @returns
   */
  createForm(payload: CreateFormRequestBody) {
    return axios.post<IResponseData<string>>(`/forms/create`, {
      ...payload,
    });
  }

  /**
   * Update form by id
   * @returns
   */
  updateForm(payload: UpdateFormRequestBody) {
    console.log(payload);
    return axios.put<IResponse>(`/forms/update`, {
      ...payload,
    });
  }
}

export default FormService;
