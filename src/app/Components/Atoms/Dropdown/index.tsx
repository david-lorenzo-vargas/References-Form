import { HTMLInputTypeAttribute, ReactElement } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { DropdownOption } from "../../../../../Types/types";

const Dropdown = ({
  label,
  register,
  dropdownName,
  options,
}: Props): ReactElement => {
  return (
    <div>
      <div className="mb-2">
        <label
          htmlFor={dropdownName}
          className="text-sm text-veryDarkBlue"
          role="label"
        >
          {label}
        </label>
      </div>
      <select
        id={dropdownName}
        name={dropdownName}
        className="border border-2 border-veryDarkBlue rounded px-3 py-2 focused:bg-veryDarkBlue"
        {...register}
      >
        {options.map((o: DropdownOption) => (
          <option
            key={o.key}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface Props {
  label: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegisterReturn;
  dropdownName: string;
  options: DropdownOption[];
}

export default Dropdown;
