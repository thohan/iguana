This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## /form-maker - Working title: Form Maker

We'll get clever with the name later. Essentially, you feed in a config, and you get a form!

The problems I have encountered with forms:

A website that supports many countries, each with different data gathering requirements, will need a form customized for each country. This requires either having undesirable switch logic within components, or entirely separate components, or some combination of both, for each country supported. Adding new country support means creating new components or adding to switch logic.

The aim of this project is several-fold:

- Be able to create all of your forms via a single form-maker component.
- Creating a JSON config object representing a form is easier than creating a form.
- With tools that generate the JSON that generates the form, form creation becomes even easier.
- Each generated form field will have its own validation, labelling, styling, behavior, etc.
- Provide top-level behavior to set the form's action and so forth.


