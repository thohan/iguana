export class FormMetaObject {
  name: string
  description?: string
  version?: string

  eagerErrorDisplay?: boolean // Aggressiveness of showing error messsages, probably a boolean.
  // Maybe some top-level style information...
  submitButtonText?: string

  constructor(
    name: string,
    description: string = "",
    version: string = "1.0.0",
    eagerErrorDisplay: boolean = false,
    submitButtonText: string = "Submit"
  ) {
    this.name = name
    this.description = description
    this.version = version
    this.eagerErrorDisplay = eagerErrorDisplay
    this.submitButtonText = submitButtonText
  }
}

export class FormFieldObject {
  name: string
  id?: string
  label?: string
  placeholder?: string
  type: string // e.g., text, number, email, etc.
  value: string
  required?: boolean
  disabled?: boolean
  minLength?: number
  maxLength?: number
  regex?: string
  dataTest?: string // TODO: We may want to just generate this from the name/id rather than have it as a separate field.
  className?: string
  options?: Array<{ label?: string; value: string; id: string; checked: boolean; dataTest?: string; }> // For select or radio fields

  constructor(
    name: string,
    id?: string,
    label?: string,
    placeholder: string = "",
    type: string = "text",
    value: string = "",
    required: boolean = false,
    disabled: boolean = false,
    minLength: number = 0,
    maxLength: number = 255,
    regex: string = "",
    dataTest: string = "",
    className: string = "",
    options?: Array<{ value: string; label?: string; id: string; checked: boolean; dataTest?: string; }>  // Used by select and radio
  ) {
    this.name = name;
    this.id = id; // Default to name if id is not provided
    this.label = label;
    this.placeholder = placeholder;
    this.type = type;
    this.value = value;
    this.required = required;
    this.disabled = disabled;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.regex = regex;
    this.dataTest = dataTest;
    this.className = className;
    this.options = options || [];
  }
}

export class FormConfigObject {
  meta: FormMetaObject;
  fields: Array<FormFieldObject>;
  // Maybe some top-level style information

  constructor(meta: FormMetaObject, fields: Array<FormFieldObject>) {
    this.meta = meta;
    this.fields = fields;
  }
}

export interface FormFieldProps {
  fieldObject: FormFieldObject;
  fieldValue?: string | number | readonly string[] | undefined;
  isValid: boolean;
  fieldChecked?: boolean; // For checkbox and radio fields
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; // do validation and whatnot
}
