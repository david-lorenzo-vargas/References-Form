import { ReactElement } from "react";
import CheckMark from "../../icons/CheckMark";
import { UseFormRegisterReturn } from "react-hook-form";

const CheckBox = ({
  size,
  boxId,
  label,
  checked,
  onClick,
  register
}: Props): ReactElement => {
  return (
    <div className="relative">
      <div
        className={`
          rounded
          border
          flex
          flex-row
          items-center
          justify-center
          ${size ? size : 'h-10 w-10'}
          ${checked ? 'bg-veryDarkBlue border-veryDarkBlue' : 'bg-white border-veryDarkBlue'}
        `}
      >
        {label && (
          <span className={`${checked ? 'text-white' : ''}`}>
            {label}
          </span>
        )}
        {checked && !label && (
          <div className="text-white">
            <CheckMark size="12"/>
          </div>
        )}
      </div>
      <input
        type="checkbox"
        name={boxId}
        id={boxId}
        onClick={onClick}
        className={`absolute top-0 h-10 w-10 opacity-0 ${size ? size : 'h-10 w-10'}`}
        defaultChecked={checked}
        aria-label={`${boxId}-${label}`}
        {...register}
      />
    </div>
  );
};

interface Props {
  size?: string;
  boxId: string;
  label?: string;
  checked: boolean;
  onClick?: () => void;
  register?: UseFormRegisterReturn
}

export default CheckBox;
