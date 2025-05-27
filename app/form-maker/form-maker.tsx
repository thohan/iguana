import React from 'react';

class FormMetaObject {
    name: string;
    description?: string;
    version?: string;

    eagerErrorDisplay?: boolean;    // Aggressiveness of showing error messsages, probably a boolean.
    // Maybe some top-level style information...
    submitButtonText?: string;

    constructor(
        name: string,
        description: string = "",
        version: string = "1.0.0",
        eagerErrorDisplay: boolean = false,
        submitButtonText: string = "Submit"
    ) {
        this.name = name;
        this.description = description;
        this.version = version;
        this.eagerErrorDisplay = eagerErrorDisplay;
        this.submitButtonText = submitButtonText;
    }
}

class FormFieldObject {
    name: string;
    id?: string;
    label?: string;
    placeholder?: string;
    type?: string; // e.g., text, number, email, etc.
    required?: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: string;
    dataTest?: string;

    constructor(
        name: string,
        id?: string,
        label?: string,
        placeholder: string = "",
        type: string = "text",
        required: boolean = false,
        disabled: boolean = false,
        minLength: number = 0,
        maxLength: number = 255,
        regex: string = "",
        dataTest: string = ""
    ) {
        this.name = name;
        this.id = id; // Default to name if id is not provided
        this.label = label;
        this.placeholder = placeholder;
        this.type = type;
        this.required = required;
        this.disabled = disabled;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.regex = regex;
        this.dataTest = dataTest;
    }
}

class FormConfigObject {
    meta: FormMetaObject;
    fields: Array<FormFieldObject>;
    // Maybe some top-level style information

    constructor(meta: FormMetaObject, fields: Array<FormFieldObject>) {
        this.meta = meta;
        this.fields = fields;
    }
}

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
                    field.required,
                    field.disabled,
                    field.minLength,
                    field.maxLength,
                    field.regex,
                    field.dataTest
                );
            });

            return new FormConfigObject(meta, fields);

        } catch (error) {
            console.error("Error parsing form config:", error);
            throw new Error("Invalid form configuration");
        }
    } else {
        return new FormConfigObject(
            new FormMetaObject("Default Form"),
            []
        );
    }
}



// Might make more sense to pass in the config info some other way than as a prop.
export default function FormMaker({
    config,
}: {
    config: string;
}) {
    const defaultJsonConfig = `{
        "meta": {
            "name": "Default Form",
            "description": "This is a default form configuration.",
            "version": "1.0.0",
            "eagerErrorDisplay": false,
            "submitButtonText": "Submit"
        },
        "fields": []
    }`;

    // Build state objects/form context

    // Our JSON is now an object we can work with.
    const configObject: FormConfigObject = parseFormConfig(defaultJsonConfig);
    

    const form = (
        <form>
            
        </form>
    );

    return form;
}