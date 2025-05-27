import React from 'react';
import FormMaker from './form-maker';



export default function FormMakerPage() {



    return (
        <div className="font-sans rid rid-rows-[20px] min-h-screen p-8 pb-20 gap-2 sm:p-20">
            <h1 className="">
                Welcome to the FormMaker page!
            </h1>
            <p className="max-w-120">
                The idea here is to define your form and we build it for you.
                After building many forms for different markets/countries/languages,
                I wanted to see if there was a way to let a single component generate forms,
                relying on a JSON config object.
            </p>
            <p className="max-w-120">
                Stretch goal: Build a handy tool that&apos;ll generate the JSON config object!
            </p>
            <FormMaker config="" />
        </div>
    );
}
