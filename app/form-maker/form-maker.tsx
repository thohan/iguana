import React from "react"
import FormField from "./form-field"
import {
  FormMetaObject,
  FormFieldObject,
  FormConfigObject,
} from "./form-maker-models"

let index = 0;

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
          field.required,
          field.disabled,
          field.minLength,
          field.maxLength,
          field.regex,
          field.dataTest,
          field.options ? field.options.map((option: { label?: string; value: string }) => ({
            label: option.label,
            value: option.value
          })) : []
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
        "id": "first-name",
        "label": "First Name",
        "placeholder": "Enter your first name",
        "required": true,
        "disabled": false,
        "minLength": 2,
        "maxLength": 50,
        "regex": "",
        "dataTest": "first-name-textbox"
      },
      {
        "type": "checkbox",
        "name": "agreeToTerms",
        "id": "agree-to-terms",
        "label": "First Name",
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
  // Build state objects/form context

  // Our JSON is now an object we can work with.
  const configObject: FormConfigObject = parseFormConfig(getDefaultFormConfig())
  
  const form = (
    <form>
      {configObject.fields.map((field) => (
        <FormField fieldObject={field} index={index++} key={index++}/>
      ))}
    </form>
  )

  return form
}
