"use client";

import Loading from "@/components/Loading";
import Builder from "@/components/builder/Builder";
import { useForm } from "@/features/forms/queries";
import useBuilder from "@/hooks/useBuilder";
import { IForm } from "@/services/form.types";

import React, { Suspense } from "react";
import { ImSpinner2 } from "react-icons/im";

function FormBuilder({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const { setElements } = useBuilder();

  const { data, isError, isLoading } = useForm(id, (data) => {
    setElements(data.fields);
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    throw new Error("Form not found");
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-full">
          <ImSpinner2 className="animate-spin h-12 w-12" />
        </div>
      }
    >
      <Builder form={data as IForm} />
    </Suspense>
  );
}

export default FormBuilder;
