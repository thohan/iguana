export class testConfigFile {
    static config = `{
    "meta": {
      "name": "Example Form",
      "description": "This an example form.",
      "submitButtonText": "Submit"
    },
    "fields": [
      {
        "type": "header",
        "name": "formHeader",
        "label": "A JSON-Borne form (sorry)",
        "id": "formHeader"
      },
      {
        "type": "text",
        "name": "firstName",
        "label": "First Name",
        "placeholder": "Enter your first name",
        "minLength": 2,
        "maxLength": 20
      },
      {
        "type": "checkbox",
        "name": "agreeToTerms",
        "label": "Agree To Terms. I agree to the terms and conditions, including the privacy policy and other stuff as per local, state, and national laws as pertaining to blah blah."
      },
      {
        "type": "radio",
        "name": "gender",
        "id": "gender",
        "label": "Gender",
        "options": [{
          "label": "male", "value": "male", "id": "male"
        },{
          "label":"female", "value": "female", "id": "female"
        },{
          "label": "prefer not to say", "value": "prefer-not-to-say", "id": "prefer-not-to-say"
        }]
      }
    ]
  }`;
}