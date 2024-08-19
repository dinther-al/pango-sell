import React from "react";
import { useNavigate } from "react-router";
import store from "../store";
import RippleButton from "./RippleButton.jsx";

const NavigateToCheckoutSection = ({ text, route, label, inputRefs }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    let shouldNavigate = true;
    for (const ref of inputRefs) {
      if (ref.current.value === "") {
        ref.current.focus();
        shouldNavigate = false;
        break;
      }
    }
    if (shouldNavigate) {
      navigate("/result");
    }
  };

  const handleClick = () => {
    store.dispatch("setIsHomePage", route === "home");
    setTimeout(() => {
      if (route === "result") {
        handleSubmit();
      } else if (route === "home") {
        navigate("/", {
          replace: true,
        });
      } else {
        navigate(`${route}`);
      }
    }, 100);
  };

  return (
    <>
      <p className="flex font-normal">{text}</p>
      <RippleButton
        className="ripple-btn flex items-center text-xs my-1 px-6 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffff"
            d="M16.15 13H5q-.425 0-.712-.288T4 12q0-.425.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
          />
        </svg>
        <div className="font-medium">{label}</div>
      </RippleButton>
    </>
  );
};

export default NavigateToCheckoutSection;
