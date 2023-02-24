import React from "react";
import ReactDOM from "react-dom";

interface IProps {
  isShowing: boolean;
  hide: boolean | any;
  title: string;
  children: any;
}

const Modal = ({
  isShowing,
  hide,
  title,

  ...props
}: IProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="fixed top-0 left-0 w-full h-full z-50 ">
            <div className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto outline-none flex items-center bg-gray-600 bg-opacity-80  ">
              <div className=" relative -mt-[400px] mx-auto border border-black shadow-2xl rounded-md w-[80%] h-[200px] bg-primary p-5">
                <div className="flex justify-between">
                  <h4 className="m-auto text-2xl text-black">{title}</h4>
                  <button
                    type="button"
                    className="text-4xl -mt-10 -mr-4 cursor-pointer text-black"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="mt-5">{props.children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
