import { ReactElement } from "react";

const FormSectionWrapper = ({
  title,
  children,
}: Props): ReactElement => {
  return (
    <div className="relative border border-2 border-mediumGray h-max rounded p-5 relative">
      <div className="absolute -top-3.5 bg-white px-2">
        <span className="text-veryDarkBlue">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};

interface Props {
  title: string;
  children: ReactElement;
}

export default FormSectionWrapper;
