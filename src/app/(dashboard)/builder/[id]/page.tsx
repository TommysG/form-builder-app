import Builder from "@/components/builder/Builder";

import React from "react";

const forms = [
  {
    id: 1,
    name: "My form ",
  },
  {
    id: 2,
    name: "Test form",
  },
];

const getFormById = (id: number) => {
  return forms.find((form) => form.id === id);
};

function Dashboard({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const form = getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <Builder form={form} />;
}

export default Dashboard;
