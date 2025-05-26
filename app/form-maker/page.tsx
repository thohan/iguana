import React from 'react';

// Might make more sense to pass in the config info some other way than as a prop.
function FormMaker({
    config,
}:{
    config: string
}) {
    return (
        <>
            <label className="text-sm text-white-700">
                formfield
            </label>
            <input name="formfield" type="text" className="border-1 max-w-100 max-h-12"></input>
        </>
    );
}


export default function FormMakerPage() {



    return (
        <div className="font-sans grid grid-rows-[20px] min-h-screen p-8 pb-20 gap-2 sm:p-20">
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
                Stretch goal: Build a handy tool that will generate the JSON config object!
            </p>
            <FormMaker config="" />
        </div>
    );
}
