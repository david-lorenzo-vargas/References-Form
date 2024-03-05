import { HTMLInputTypeAttribute, ReactElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const Input = ({
  placeholder,
  inputName,
  label,
  type ='text',
  register,
  rounded,
  errorMessage,
}: Props): ReactElement => {
  return (
    <div>
      <div className="mb-2">
        <span className="text-sm text-veryDarkBlue">
          {label}
        </span>
      </div>
      <div className={`${errorMessage ? 'mb-2' : ''}`}>
        <input
          className={`
            bg-veryLightGray
            w-full
            px-3
            py-2
            border
            border-veryLightGray
            focus:border
            focus:border-veryDarkBlue
            placeholder:text-xs
            placeholder:italic
            ${rounded ? rounded : 'rounded'}
          `}
          placeholder={placeholder}
          name={inputName}
          aria-label={inputName}
          type={type}
          {...register}
        />
      </div>
      {!!errorMessage && (
        <span className="text-sm text-cancelRed">{errorMessage}</span>
      )}
    </div>
  );
};

interface Props {
  placeholder: string;
  inputName: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegisterReturn;
  rounded?: string;
  errorMessage?: string;
}

export default Input;
