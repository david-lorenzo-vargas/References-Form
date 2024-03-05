"use client"

import { ReactElement } from "react";

const Button = ({
  children,
  size,
  bgColour,
  padding,
  rounded,
  border,
  onClick,
  disabled,
  type,
  id,
}: Props): ReactElement => {
  return (
    <button
      title={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      name={id}
      className={`
        ${size ? size : ''}
        ${bgColour ? bgColour : ''}
        ${padding ? padding : ''}
        ${rounded ? rounded : ''}
        ${border ? border : ''}
        ${disabled ? 'opacity-20' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
};

interface Props {
  children: ReactElement;
  size?: string;
  bgColour?: string;
  padding?: string;
  rounded?: string;
  border?: string;
  onClick?: () => void;
  disabled?: boolean;
  type: 'submit' | 'button';
  id: string;
}

export default Button;
