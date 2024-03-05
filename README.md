# References-Form

## Getting Started

First, install node modules:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Required Node.js 18.17.0 or later.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description

Form that collects information from a tenant for checking references.
<br><br>
All the fields are required and the validation patterns need to be fullfiled in order to be able to send the information. Once the validation is fullfiled the "Send" button gets enabled and the form can be sent.
<br><br>
Validation:
<br>
  <ul>
    <li>Inputs: name fields can only accept letters, if the user types a number or a special character a warning test gets rendered</li>
    <li>Dates: end date needs to be higer that start date, if the user selects a day that is in the past in relation to the start date a warning text gets rendered and the "Send" button wont be enabled.</li>
  </ul>

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

React Hook Form used for managing the form. All the input are wrapped in a `<form>` tag and registered to the form by passing `register` as props. Atom components receive register prop and it is spread to have the input registered in the form. Button component doesnt accept onClick as it receives `type='submit'` and the submit is handle by passing `onSubmit={handleSubmit(submit)}` that comes from `useForm`.
<br><br>
Validation has been implemented via `register` by passing an object as a second argument where all the inputs are required and they have an specific pattern they need to full fill in order to be valid eg: 
  `register={register("employerName", {
      required: true,
      validate: (value: string) => {
        if (!nameRegex.test(value)) {
          return "Sorry, numbers and special characters are not allowed"
        }

        return true;
      }
    })}
    errorMessage={formState.errors.employerName?.message}`.
<br><br>
If the validation does not pass, a warning text gets rendered. The message is recevied from `formState.errors.inputName.message`.
<br><br>
For enabling the button we pass `isValid` that comes from `formState` as prop to the button component.
<br><br>
Once the form is validated and the submit button gets clicked, we check if the form has been submited by using `isSubmited` coming from `formState` and if `isSubmited===true` a 'Thank you!' text gets rendered together with a 'Reset button' that handles `reset` method for reseting the form state.

## Form submition

The API call gets called in a funcion abstracted into a utility inside Util/API/postReferencesForm.ts. The end point URL is declared in a `.env` file and access it via dotenv library for security reasons. The URL is passed to fetch function as follows `process.env.POST_URL`.

## Types

All types and enums have been declared in a `Types/types.ts`

## Atomic approach

Atomic approach has been used for structuring and ordering the componets separated in 'atoms', 'molecules' and 'organisms'.

## Testing

Jest and React Testing Library have been used for testing. I have added testing to some components but, as further implementation, it would be necessary to add more unit and integration testing for other functionalities and components.

For running tests: `npm run test`