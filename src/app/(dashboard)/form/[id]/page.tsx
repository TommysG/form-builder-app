"use client";

import FillForm from "@/components/FillForm";
import { FormWidgetInstance } from "@/components/FormWidgets";
import Loading from "@/components/Loading";
import Builder from "@/components/builder/Builder";
import { useForm, useViewForm } from "@/features/forms/queries";
import { IForm } from "@/services/form.types";

import React from "react";

function Form({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const { data, isError, isLoading } = useViewForm(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    throw new Error("Form not found");
  }
  return <FillForm form={data as IForm} />;
}

export default Form;
