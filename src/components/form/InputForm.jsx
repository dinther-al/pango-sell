import React, { forwardRef } from "react";

const InputForm = ({ label, type, placeholder, name, value, onChange, handleBlur }, ref) => {
  const EmptyInput = () => {
    onChange({ target: { name, value: "" } });
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm mb-2" htmlFor={name}>
        {label}
        <span className="font-bold text-[#1f633c]">*</span>
      </label>
      <input
        ref={ref}
        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-[0_0px_2px_#0b3c20]"
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleBlur}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        className="absolute right-3 bottom-[0.6rem]"
        onClick={EmptyInput}
      >
        <path
          fill="#888888"
          d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21"
        />
      </svg>
    </div>
  );
};

export default forwardRef(InputForm);
