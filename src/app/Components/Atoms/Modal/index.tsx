import { ReactElement } from "react";

import Close from "../../icons/Close";

const Modal = ({
  children,
  onClose,
  title,
}: Props): ReactElement => {
  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen bg-veryDarkBlue bg-opacity-40 flex flex-row items-center justify-center"
    >
      <div className="bg-white rounded p-5">
        <div className="w-full flex flex-row items-center justify-end mb-5">
          <span>
            {title}
          </span>
          <button
            className="w-5 h-5 text-veryDarkBlue cursor-pointer ml-5"
            onClick={onClose}
            aria-label="closeButton"
          >
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface Props {
  children: ReactElement;
  onClose: () => void;
  title?: string;
}

export default Modal;
