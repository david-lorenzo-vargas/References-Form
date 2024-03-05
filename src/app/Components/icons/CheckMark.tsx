import { ReactElement } from "react";

const CheckMark = ({
  size
}: Props): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : '24'}
      height={size ? size : '24'}
      viewBox="0 0 24 24"
      fillRule="evenodd"
      fill="currentColor"
    >
      <path
        d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"
      />
    </svg>
  );
};

interface Props {
  size?: string;
}

export default CheckMark;
