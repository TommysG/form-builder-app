import { useMutation } from "@tanstack/react-query";
import FormService from "@/services/form.service";

const service = new FormService();

export const useCreateForm = () =>
  useMutation({ mutationFn: service.createForm });

export const useUpdateForm = () =>
  useMutation({ mutationFn: service.updateForm });
