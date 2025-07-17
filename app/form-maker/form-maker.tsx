"use client";
import React, { useState } from "react";
import FormField from "./form-field";
import { testConfigFile } from "./test-config-file";
import { FormMetaObject, FormFieldObject, FormConfigObject, } from "./form-maker-models";

// Move to utility file?
function parseFormConfig(config: string): FormConfigObject {
  if (config) {
    try {
      const parsedConfig = JSON.parse(config);

      const meta = new FormMetaObject(
        parsedConfig.meta.name,
        parsedConfig.meta.description,
        parsedConfig.meta.version,
        parsedConfig.meta.eagerErrorDisplay,
        parsedConfig.meta.submitButtonText
      );

      const fields = parsedConfig.fields.map((field: FormFieldObject) => {
        return new FormFieldObject(
          field.name,
          field.id,
          field.label,
          field.placeholder,
          field.type,
          field.value,
          field.required,
          field.disabled,
          field.minLength,
          field.maxLength,
          field.regex,
          field.dataTest,
          field.className,
          field.options
            ? field.options.map((option: { label?: string; value: string; id: string; checked: boolean; dataTest?: string; }) => ({
              label: option.label,
              value: option.value,
              id: option.id,
              checked: option.checked || false,
              dataTest: option.dataTest || `${field.name}-${option.id}`
            }))
            : []
        );
      });

      return new FormConfigObject(meta, fields);
    } catch (error) {
      console.error("Error parsing form config:", error);
      throw new Error("Invalid form configuration");
    }
  } else {
    return new FormConfigObject(new FormMetaObject("Default Form"), []);
  }
}

function getDefaultFormConfig(): string {
  return testConfigFile.config;
}

type FormMakerProps = {
  config: string;
  setFormOutputAction: React.Dispatch<React.SetStateAction<string | undefined>>;
};

// Might make more sense to pass in the config info some other way than as a prop.
export default function FormMaker({
  config,
  setFormOutputAction
}: FormMakerProps
) {
  function onValueChanged(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any>
  ) {
    updateFormState(
      event.target.name,
      event.target.type,
      event.target.checkValidity(),
      event.target.value,
      event.target.checked
    );
  }

  function updateFormState(
    name: string,
    type: string,
    isValid: boolean,
    value?: string | number | readonly string[] | undefined,
    checked?: boolean,
  ) {
    setFormState(
      (
        prevState: {
          fieldName: string;
          fieldType: string;
          isValid: boolean;
          fieldValue: string | number | readonly string[] | undefined;
          fieldChecked?: boolean;
        }[]
      ) => {
        const updatedState = prevState.map((field) => {
          if (field.fieldName === name) {
            if (type === "checkbox") {
              return { ...field, fieldChecked: checked || false, isValid };
            }

            if (type === "radio") {
              return { ...field, fieldValue: value, fieldChecked: checked || false, isValid };
            }

            return { ...field, fieldValue: value, isValid };
          }
          return field;
        });
        return updatedState;
      }
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with state:", formState);
    setFormOutputAction(JSON.stringify(formState, null, 2));
  }

  // Our JSON is now an object we can work with.
  const configObject: FormConfigObject = parseFormConfig(getDefaultFormConfig());
  
  // TODO: Use a class for these state objects.
  const formFieldNames: {
    fieldName: string;
    fieldType: string;
    fieldValue: string | number | readonly string[] | undefined;
    fieldChecked?: boolean; // For checkbox and radio fields
    isValid: boolean;
  }[] = [];

  // Build state objects/form context
  configObject.fields.map((field) => {
    if (field.type !== "header") {
      formFieldNames.push({
        fieldName: field.name,
        fieldType: field.type,
        isValid: true,
        fieldValue: field.value || "",
        fieldChecked: field.value === "on" || false,
      });
    }
  });

  const [formState, setFormState] = useState<
    {
      fieldName: string;
      fieldType: string;
      isValid: boolean;
      fieldValue: string | number | readonly string[] | undefined;
      fieldChecked?: boolean; // For checkbox and radio fields
    }[]
  >(formFieldNames);

  const fieldStateMap = React.useMemo(() => {
    const map: Record<string, typeof formState[0]> = {};
    formState.forEach(f => { map[f.fieldName] = f; });
    return map;
  }, [formState]);

  const form = (
    <div className="form-wrapper">
      <form method="post" onSubmit={handleSubmit}>
        {configObject.fields.map((field) => (
          <FormField
            fieldObject={field}
            key={field.name || field.id}
            fieldValue={fieldStateMap[field.name]?.fieldValue}
            isValid={field.type === "header" || fieldStateMap[field.name]?.isValid}
            fieldChecked={fieldStateMap[field.name]?.fieldChecked}
            onChange={onValueChanged}
          />
        ))}
        <button type="submit">Submit form</button>
      </form>
    </div>
  );

  return form;
}
