import React from "react"
import { FormFieldObject } from "./form-maker-models"

export default function FormField({
  fieldObject,
  index,
}: {
  fieldObject: FormFieldObject
  index: number
}) {
  let field: React.ReactNode

  switch (fieldObject.type) {
    case "checkbox":
    case "cb":
      field = (
        <input
          type="checkbox"
          name={fieldObject.name}
          id={fieldObject.id}
          key={fieldObject.id}
          data-test={fieldObject.dataTest}
          className="form-field"
        />
      )
      break
    case "radio":
    case "rd":
      field = (
        <>
          {fieldObject.options?.map((option) => (
            <div key={option.label}>
              <input
                type="radio"
                name={fieldObject.name}
                id={option.label}
                key={option.label}
                data-test={`${fieldObject.dataTest}-${option.value}`}
                className="form-field"
                value={option.value} // Assuming options have a value property
              />
              <label htmlFor={option.label}>{option.label}</label>
            </div>
          ))}
        </>
      )
      break
    case "select":
    case "dropdown":
    case "sel":
      field = (
        <select
          name={fieldObject.name}
          id={fieldObject.id}
          data-test={fieldObject.dataTest}
          className="form-field"
        >
          {/* Add options here if available in config */}
        </select>
      )
      break
    case "textarea":
    case "txtarea":
      field = (
        <textarea
          name={fieldObject.name}
          id={fieldObject.id}
          data-test={fieldObject.dataTest}
          placeholder={fieldObject.placeholder}
          className="form-field"
        />
      )
      break
    default:
      field = (
        <input
          type={fieldObject.type || "text"}
          name={fieldObject.name}
          id={fieldObject.id}
          key={fieldObject.id}
          data-test={fieldObject.dataTest}
          placeholder={fieldObject.placeholder}
          className="form-field"
        />
      )
      break
  }

  return (
    <>
      <label htmlFor={fieldObject.id || fieldObject.name}>
        {fieldObject.label || fieldObject.name}
      </label>
      {field}
    </>
  )
}
