import React, { useContext, useEffect, useState } from "react";
import { choice } from "./Product.jsx";
import { ThemeContext } from "./Sale.jsx";
import { useStore } from "zmp-framework/react";
import store from "../../store";

const Input = ({ product }) => {
  const [isDecreaseActive, setIsDecreaseActive] = useState(false);
  const selectedProducts = useStore("selectedProducts");
  const { inputValue, setInputValue, setShowButton } = useContext(choice);
  const isClicked = useStore("isClicked");
  const handleIncrease = () => {
    setInputValue(inputValue + 1);
  };

  const handleDecrease = async () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    }
    if (inputValue === 1) {
      setShowButton(true);
      const updatedSelectedProducts = selectedProducts.filter((p) => p.id !== product.id);
      await store.dispatch("setSelectedProducts", updatedSelectedProducts);
    }
  };

  useEffect(() => {
    const updateSelectedProducts = async () => {
      const existingProductIndex = selectedProducts.findIndex((p) => p.id === product.id);
      if (existingProductIndex !== -1 && selectedProducts[existingProductIndex].quantity !== inputValue) {
        const updatedProducts = [...selectedProducts];
        updatedProducts[existingProductIndex].quantity = inputValue;
        await store.dispatch("setSelectedProducts", updatedProducts);
      }
    };
    updateSelectedProducts();
  }, [inputValue]);

  useEffect(() => {
    setIsDecreaseActive(inputValue > 1);
  }, [inputValue]);

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setInputValue(newValue);
    }
  };

  return (
    <div className={`product-input  ${isClicked ? "product-input-column" : ""}`}>
      <span
        onClick={handleDecrease}
        className={isDecreaseActive ? "active" : ""}
      >
        {" "}
        -{" "}
      </span>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className=" focus:outline-none focus:shadow-[0_0px_2px_#1f633c]"
      />
      <span className="active" onClick={handleIncrease}>
        {" "}
        +{" "}
      </span>
    </div>
  );
};

export default Input;
