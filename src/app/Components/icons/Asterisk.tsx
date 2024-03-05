import { ReactElement } from "react";

const Asterisk = ({
  size
}: Props): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : '800'}
      width={size ? size : '800'}
      version="1.1"
      id="Layer_1"
      viewBox="0 0 455 455"
      fillRule="evenodd"
      fill="currentColor"
    >
      <polygon
        points="347.49,227 454.5,165.212 394.508,61.288 287.5,123.077 287.5,0 167.5,0 167.5,123.077 60.492,61.288   0.499,165.212 107.51,227 0.5,288.788 60.492,392.712 167.5,330.923 167.5,455 287.5,455 287.5,330.923 394.508,392.712   454.501,288.788 "
      />
    </svg>
  );
};

interface Props {
  size?: string;
}

export default Asterisk;
