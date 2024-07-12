import { useMutation, useQuery } from "@tanstack/react-query";
import FormService from "@/services/form.service";
import { IForm, IResponseData } from "@/services/form.types";

const service = new FormService();

export const useForms = () =>
  useQuery({
    queryKey: ["forms"],
    queryFn: service.getAllForms,
    select: (data) => data.data,
  });

async function onFormFetch(id: string, onSuccess?: (data: IForm) => void) {
  const response = await service.getForm(id);
  typeof onSuccess === "function" && onSuccess(response.data);
  return response.data;
}

export const useForm = (id: string, onSuccess?: (data: IForm) => void) =>
  useQuery({
    queryKey: ["form"],
    queryFn: () => {
      return onFormFetch(id, onSuccess);
    },
    refetchOnWindowFocus: false,
  });

export const useViewForm = (shareURL: string) =>
  useQuery({
    queryKey: ["form"],
    queryFn: () => service.getViewForm(shareURL),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
