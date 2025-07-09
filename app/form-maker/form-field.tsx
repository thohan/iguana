import React from "react";
import { FormFieldObject } from "./form-maker-models";

// TODO: Move markup to external file for react, that can be swapped out for,
// say, react that implements radix-ui, or angular, or vue, or whatever.
// This is completely customizable. Use your own markup and/or tweak this as needed.
// ALSO TODO: Implement behaviors for "eagerErrorDisplay" flag or switch that will determine
// how in-your-face we want to be with error messages and validation.
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
    case "header":
      field = (
        <h2 className="form-header" key={fieldObject.id}>
          {fieldObject.label || fieldObject.name}
        </h2>
      );
      break;
    case "checkbox":
    case "cb":
      field = (
        <label htmlFor={fieldObject.id || fieldObject.name}>
          <input
            type="checkbox"
            checked={fieldChecked}
            onChange={onChange}
            name={fieldObject.name}
            id={fieldObject.id || fieldObject.name}
            key={fieldObject.id}
            data-test={fieldObject.dataTest}
            className="form-field checkbox"
          />
          {fieldObject.label || fieldObject.name}
        </label>
      );
      break;
    case "radio":
    case "rd":
      field = (
        <label>
          {fieldObject.label || fieldObject.name}
          <div id={fieldObject.id || fieldObject.name}>
            {fieldObject.options?.map((option) => (
              <label
                htmlFor={`${fieldObject.id}-${option.id}`}
                style={{ display: "block" }}
                key={`label-${fieldObject.id}-${option.id}`}
              >
                <input
                  type="radio"
                  name={fieldObject.name}
                  id={`${fieldObject.id}-${option.id}`}
                  key={`radio-${fieldObject.id}-${option.id}`}
                  data-test={option.dataTest}
                  className="form-field radio"
                  value={option.value}
                  checked={fieldValue === option.value}
                  onChange={onChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </label>
      );
      break;
    case "select":
    case "dropdown":
    case "sel":
      field = (
        <>
          <label htmlFor={fieldObject.id || fieldObject.name}>
            {fieldObject.label || fieldObject.name}
          </label>
          <select
            name={fieldObject.name}
            id={fieldObject.id || fieldObject.name}
            key={fieldObject.id || fieldObject.name}
            data-test={fieldObject.dataTest}
            className="form-field"
            onChange={onChange}
          >
            {/* Add options here if available in config */}
          </select>
        </>
      );
      break;
    case "textarea":
    case "txtarea":
      field = (
        <>
          <label htmlFor={fieldObject.id || fieldObject.name}>
            {fieldObject.label || fieldObject.name}
          </label>
          <textarea
            name={fieldObject.name}
            id={fieldObject.id || fieldObject.name}
            key={fieldObject.id || fieldObject.name}
            data-test={fieldObject.dataTest}
            placeholder={fieldObject.placeholder}
            className="form-field"
            required={fieldObject.required || true}
            disabled={fieldObject.disabled || false}
            minLength={fieldObject.minLength}
            maxLength={fieldObject.maxLength}
            onChange={onChange}
          />
        </>
      );
      break;
    default:
      field = (
        <>
          <label htmlFor={fieldObject.id || fieldObject.name}>
            {fieldObject.label || fieldObject.name}
          </label>
          <input
            type={fieldObject.type || "text"}
            value={fieldValue}
            onChange={onChange}
            name={fieldObject.name}
            id={fieldObject.id || fieldObject.name}
            key={fieldObject.id}
            data-test={fieldObject.dataTest}
            placeholder={fieldObject.placeholder}
            className={
              "form-field" +
              (isValid ? " valid" : " invalid") +
              (` ${fieldObject.className || ""}`)
            }
            required={fieldObject.required || true}
            disabled={fieldObject.disabled || false}
            minLength={fieldObject.minLength}
            maxLength={fieldObject.maxLength}
          />
        </>
      );
      break;
  }

  return (
    <div className="form-field-wrapper">
      {field}
    </div>
  );
}
