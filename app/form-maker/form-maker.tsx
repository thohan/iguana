"use client"
import React, { useState } from "react"
import FormField from "./form-field"
import { FormMetaObject, FormFieldObject, FormConfigObject } from "./form-maker-models"

// Move to utility file?
function parseFormConfig(config: string): FormConfigObject {
  if (config) {
    try {
      const parsedConfig = JSON.parse(config)

      const meta = new FormMetaObject(
        parsedConfig.meta.name,
        parsedConfig.meta.description,
        parsedConfig.meta.version,
        parsedConfig.meta.eagerErrorDisplay,
        parsedConfig.meta.submitButtonText
      )

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
          field.options
            ? field.options.map((option: { label?: string; value: string; checked: boolean }) => ({
                label: option.label,
                value: option.value,
                checked: option.checked || false,
              }))
            : []
        )
      })

      return new FormConfigObject(meta, fields)
    } catch (error) {
      console.error("Error parsing form config:", error)
      throw new Error("Invalid form configuration")
    }
  } else {
    return new FormConfigObject(new FormMetaObject("Default Form"), [])
  }
}

// Move to utility file?
function getDefaultFormConfig(): string {
  return `{
    "meta": {
      "name": "Default Form",
      "description": "This is a default form configuration.",
      "version": "1.0.0",
      "eagerErrorDisplay": false,
      "submitButtonText": "Submit"
    },
    "fields": [
      {
        "type": "text",
        "name": "firstName",
        "id": "firstName",
        "label": "First Name",
        "placeholder": "Enter your first name",
        "required": true,
        "disabled": false,
        "minLength": 2,
        "maxLength": 20,
        "regex": "",
        "dataTest": "first-name-textbox"
      },
      {
        "type": "checkbox",
        "name": "agreeToTerms",
        "id": "agreeToTerms",
        "label": "Agree To Terms",
        "placeholder": "Enter your first name",
        "disabled": false,
        "dataTest": "agree-to-terms-checkbox"
      },
      {
        "type": "radio",
        "name": "gender",
        "id": "gender",
        "label": "Gender",
        "disabled": false,
        "dataTest": "gender-radio",
        "options": [{
          "label": "male", "value": "male"
        },{
          "label":"female", "value": "female"
        },{
          "label": "prefer not to say", "value": "prefer-not-to-say"
        }]
      }
    ]
  }`
}

// Might make more sense to pass in the config info some other way than as a prop.
export default function FormMaker({ config }: { config: string }) {
  const [isValid, setIsValid] = useState(true)

  function onValueChanged(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    if (event.target.checkValidity()) {
      setIsValid(true)
    } else {
      console.log("Invalid input:", event.target.validationMessage)
      setIsValid(false)
    }

    updateFormState(event.target.name, event.target.value)
  }

  function updateFormState(name: string, value: string) {
    setFormState((prevState: any[]) => {
      const updatedState = prevState.map((field) => {
        if (field.fieldName === name) {
          return { ...field, fieldValue: value }
        }
        return field
      })
      return updatedState
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted with state:", formState)
  }

  // Our JSON is now an object we can work with.
  const configObject: FormConfigObject = parseFormConfig(getDefaultFormConfig())
  let formFieldNames: any[] = []

  // Build state objects/form context
  configObject.fields.map((field) => {
    formFieldNames.push({ fieldName: field.name, fieldValue: field.value || "" })
  })

  const [formState, setFormState] = useState<any[]>(formFieldNames)

  const form = (
    <form method="post" onSubmit={handleSubmit}>
      {configObject.fields.map((field) => (
        <FormField
          fieldObject={field}
          key={field.id}
          fieldValue={(formState.find((x) => x.fieldName === field.name) || {}).fieldValue}
          onChange={onValueChanged}
          isValid={isValid}
        />
      ))}
      <button type="submit">Submit form</button>
    </form>
  )

  return form
}
