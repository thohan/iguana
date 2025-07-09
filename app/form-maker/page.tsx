"use client";
import React from "react";
import FormMaker from "./form-maker";
import { testConfigFile } from "./test-config-file";

export default function FormMakerPage() {
  const [formOutput, setFormOutput] = React.useState<string | undefined>("");

  return (
    <div className="">
      <div className="fluff-copy">
        <h1 className="">Welcome to the FormMaker!</h1>
        <p className="">
          After building many forms for different markets/countries/languages
          with complex logic to handle each country&apos;s special requirements, I wanted
          to see if there was a way to let a single component generate forms, relying on a JSON config object.
          The FormMaker allows one to create any form, using a single component, feeding a JSON config object
          to the component.
        </p>
        <p>
          The goal is to have components that take care of their own validation rules and display without
          relying on an external validation library (even though there are some really good ones out there,
          but hey, one less thing, and less complexity). Also, the changes to a given form field should not
          require a re-render of any other parts of the form.
        </p>
        <p>
          Here is the JSON that is used to generate this form. It has two parts: The <code className="pre">meta</code>
          section, which contains form-wide information, and the <code className="pre">fields</code> section, which contains
          the configuration of the fields and structure elements that make up the form.
        </p>
        <p className="code-snippet">
          <code className="pre">
            {testConfigFile.config}
          </code>
        </p>
        <p>
          And here is our form, generated from the above JSON config object.
        </p>
        <FormMaker config="" setFormOutputAction={setFormOutput} />
        <p>
          Here is the submitted form data:
        </p>
        <code className="pre">
          {formOutput || "No form output yet."}
        </code>
      </div>
    </div>
  )
}
