import React from "react";
import { FormFieldObject } from "./form-maker-models";

export default function FormField({
  fieldObject,
  fieldValue,
  fieldChecked,
  onChange,
  isValid,
}: {
  fieldObject: FormFieldObject;
  fieldValue?: string | number | readonly string[] | undefined;
  fieldChecked?: boolean; // For checkbox and radio fields
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; // do validation and whatnot
  isValid: boolean;
}) {
  let field: React.ReactNode;

  switch (fieldObject.type) {
    case "checkbox":
    case "cb":
      field = (
        <input
          type="checkbox"
          checked={fieldChecked}
          onChange={onChange}
          name={fieldObject.name}
          id={fieldObject.id}
          key={fieldObject.id}
          data-test={fieldObject.dataTest}
          className="form-field"
        />
      );
      break;
    case "radio":
    case "rd":
      field = (
        <div>
          {fieldObject.options?.map((option) => (
            <div key={option.label}>
              <input
                type="radio"
                name={fieldObject.name}
                id={option.label}
                key={option.label}
                data-test={`${fieldObject.dataTest}-${option.value}`}
                className="form-field"
                checked={option.checked} // Assuming options have a value property
                onChange={onChange}
              />
              <label htmlFor={option.label}>{option.label}</label>
            </div>
          ))}
        </div>
      );
      break;
    case "select":
    case "dropdown":
    case "sel":
      field = (
        <select
          name={fieldObject.name}
          id={fieldObject.id}
          data-test={fieldObject.dataTest}
          className="form-field"
          onChange={onChange}
        >
          {/* Add options here if available in config */}
        </select>
      );
      break;
    case "textarea":
    case "txtarea":
      field = (
        <textarea
          name={fieldObject.name}
          id={fieldObject.id}
          data-test={fieldObject.dataTest}
          placeholder={fieldObject.placeholder}
          className="form-field"
          required={fieldObject.required}
          disabled={fieldObject.disabled}
          minLength={fieldObject.minLength}
          maxLength={fieldObject.maxLength}
          onChange={onChange}
        />
      );
      break;
    default:
      field = (
        <input
          type={fieldObject.type || "text"}
          value={fieldValue}
          onChange={onChange}
          name={fieldObject.name}
          id={fieldObject.id}
          key={fieldObject.id}
          data-test={fieldObject.dataTest}
          placeholder={fieldObject.placeholder}
          className={isValid ? "form-field valid" : "form-field invalid"}
          required={fieldObject.required}
          disabled={fieldObject.disabled}
          minLength={fieldObject.minLength}
          maxLength={fieldObject.maxLength}
        />
      );
      break;
  }

  return (
    <div>
      <label htmlFor={fieldObject.id || fieldObject.name}>
        {fieldObject.label || fieldObject.name}
      </label>
      {field}
    </div>
  );
}
