import { ReactElement } from "react";

const DateField = ({
  title,
  date,
  placeholder,
  onDateField,
  disabled,
  buttonId,
}: Props): ReactElement => {
  return (
    <div>
      <div className="mb-2">
        <span className="text-sm text-veryDarkBlue">
          {title}
        </span>
      </div>
      <button
        className={`
          rounded-full
          flex
          flex-row
          items-center
          justify-center
          w-full
          px-3
          py-2
          ${disabled ? 'opacity-20 cursor-default' : 'cursor-pointer hover:border hover:border-2 hover:border-veryDarkBlue'}
          ${date ? 'bg-veryDarkBlue border border-2 border-veryDarkBlue' : 'bg-veryLightGray border border-2 border-veryLightGray'}
        `}
        onClick={!disabled ? onDateField : () => {}}
        aria-label="dateFieldButton"
        id={buttonId}
        type="button"
        disabled={disabled}
      >
        <span className={`
          text-xs
          ${date ? 'text-white' : 'italic text-placeholderGray'}
          `}>
          {date ? new Date(date).toLocaleDateString() : placeholder}
        </span>
      </button>
    </div>
  );
};

interface Props {
  title: string;
  placeholder: string;
  date?: Date;
  onDateField: () => void;
  disabled?: boolean;
  buttonId: string;
}

export default DateField;