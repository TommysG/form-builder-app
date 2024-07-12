"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormWidgets } from "./FormWidgets";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

import { ImSpinner2 } from "react-icons/im";
import { HiCursorClick } from "react-icons/hi";
import { IForm } from "@/services/form.types";

function FillForm({ form }: { form: IForm }) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [pending, startTransition] = useTransition();

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const validateForm: () => boolean = useCallback(() => {
    for (const field of form.fields) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormWidgets[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [form.fields]);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    console.log("Valid form:", validForm);
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "there is widget that not matches the validation criteria",
        variant: "destructive",
      });
      return;
    }

    console.log("send form");
    const jsonContent = JSON.stringify(formValues.current);
    console.log("FORM VALUES: ", formValues.current);

    formValues.current = {};
  };

  // return (
  //   <div className="bg-red-500 flex flex-col h-screen items-center justify-center">
  //     <div className="flex-1 w-2/3 mx-auto p-4 bg-green-300"></div>
  //   </div>
  // );

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border"
      >
        {form.fields.map((element) => {
          const FormWidget = FormWidgets[element.type].formComponent;
          return (
            <div key={element.id} className="mb-6">
              <FormWidget
                elementInstance={element}
                submitValue={submitValue}
                defaultValue={formValues.current[element.id]}
                isInvalid={formErrors.current[element.id]}
              />
            </div>
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FillForm;
