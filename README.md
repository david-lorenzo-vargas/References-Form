# References-Form

## Getting Started

First, install node modules:

```bash
npm install
```

Add `.env` file to the root of the project and declare `POST_URL` (the url provided in the task), 

Then, run the development server:

```bash
npm run dev
```

Required Node.js 18.17.0 or later.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description

Form that collects information from a tenant for checking references.
<br><br>
All the fields are required and the validation patterns need to be met in order to be able to send the information. Once the validation is passed the "Send" button gets enabled and the form can be submitted.
<br><br>
Validation:
<br>
  <ul>
    <li>Inputs: name fields can only accept letters, if the user types a number or a special character a warning text gets rendered</li>
    <li>Dates: the end date needs to be after the start date, if the user selects a date that is before the start date a warning text gets rendered and the "Send" button is disabled.</li>
  </ul>

### Reference Form

![Mar-05-2024 23-19-05](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/2a2b0053-070d-43b2-86a6-139e7ba25573)

### Form fields

![Mar-05-2024 23-32-52](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/04d831af-5d82-45b2-b4dd-7e8a81aa3dd2)

### Name validation

![Mar-05-2024 23-23-01](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/c282bc2f-b248-4e1d-a994-34a8cdfdb554)

### Date validation

![Mar-05-2024 23-25-38](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/031c2cc0-493f-43d5-a2a1-9a2ad86c2fff)

### Currently working

![Mar-05-2024 23-26-25](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/5f5b5d1b-b2f2-46a0-9630-97538f9f4405)

### Reset form

![Mar-05-2024 23-27-12](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/fa0cbf30-aa00-4485-acb7-54a494be9a48)

## Stack

<ul>
  <li>Next.js</li>
  <li>Typescript</li>
  <li>Tailwind</li>
  <li>React Hook Form</li>
  <li>Jest</li>
  <li>React Testing Library</li>
  <li>React-datepicker</li>
</ul>

## React Hook Form

React Hook Form used for managing the form. All the inputs are wrapped in a `<form>` tag and registered to the form by passing `register` function as prop. Atom components receive register prop and it is spread to have the input registered in the form. Form Submit button does not accept onClick as it receives `type='submit'` and the submit functionality of the form is handled by passing `onSubmit={handleSubmit(submit)}` that comes from `useForm`.
<br><br>
Validation has been implemented via `register` by passing an object as a second argument where all the inputs are required and they have an specific pattern they need to meet in order to be valid eg:

  ```bash
  register={register("employerName", {required: true, validate: (value: string) => { if (!nameRegex.test(value)) { return "Sorry, numbers and special characters are not allowed"} return true; }})} errorMessage={formState.errors.employerName?.message}
```.

<br><br>
If the validation is not passed, a warning text gets rendered. The message is recevied from `formState.errors.inputName.message`.
<br><br>
For enabling the button `isValid` prop coming from `formState` is passed to the button component.
<br><br>
Once the form is validated and the submit button gets clicked, there is a check to see if the form has been submitted by using `isSubmitted` coming from `formState`. If `isSubmitted===true`, a 'Thank you!' message text gets rendered together with a 'Reset button' that handles `reset` method for reseting the form state.

## Form submission

A POST endpoint is called in a funcion abstracted into a utility inside Util/API/postReferencesForm.ts. The endpoint URL is declared in a `.env` file and accessed via dotenv library for security reasons. The URL is passed to fetch function as follows `process.env.POST_URL`.

To be able to run and test the code a `.env` would need to be created in the root of the project and declare the `POST_URL`.

## Types

All types and enums have been declared in a `Types/types.ts`

## Atomic approach

Atomic approach has been used for structuring and ordering the componets separated in 'atoms', 'molecules' and 'organisms'.

## Testing

Jest and React Testing Library have been used for testing. Testing has been added for some components but, as further implementation, it would be necessary to add more unit and integration testing for other functionalities and components.

For running tests: `npm run test`

## Accessibility

Native HTML tags with WAI-ARIA Roles have been used for accessibility which would allow screen readers to navigate through the page.

An 89 overall score achieved in Lighthouse tool

![Screenshot 2024-03-05 at 23 55 37](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/8b31256b-b35f-4e4d-bc33-3e1982f12f10)

## Responsiveness

The app is responsive and adjusts to desktop, tablet and mobile viewports, some media queries have been added via Tailwind for adjusting the design to the screen size.

![Mar-06-2024 00-20-08](https://github.com/david-lorenzo-vargas/References-Form/assets/72414745/112faa13-b53f-4479-8739-55d4d96c52c6)


