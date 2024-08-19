import React, { createContext, useContext, useEffect, useState } from "react";
import Input from "./Input.jsx";
import Skeleton from "react-loading-skeleton";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";

export const choice = createContext();

const Product = ({ product }) => {
  const [showButton, setShowButton] = useState(true);

  const [inputValue, setInputValue] = useState(1);
  const loading = useStore("loading");

  const isClicked = useStore("isClicked");
  const selectedProducts = useStore("selectedProducts");
  const isHomePage = useStore("isHomePage");
  const getAPI = useStore("getAPI");

  useEffect(() => {
    const selectedProduct = selectedProducts.find((p) => p.id === product.id);
    if (selectedProduct) {
      setInputValue(selectedProduct.quantity);
      setShowButton(false);
    } else {
      setInputValue(1);
      setShowButton(true);
    }
  }, [isHomePage, product.id, selectedProducts]);

  useEffect(() => {
    const fetchData = async () => {
      const timer = setTimeout(async () => {
        await store.dispatch("setLoading", false);
      }, 1000);

      return () => clearTimeout(timer);
    };
    fetchData();
  }, [getAPI]);

  const handleButtonClick = async () => {
    const fetchData = async () => {
      const newProduct = {
        id: product.id,
        image: product.image,
        detail: product.detail,
        price: product.price,
        quantity: inputValue,
      };
      await store.dispatch("setSelectedProducts", [
        ...selectedProducts,
        newProduct,
      ]);
      setShowButton(false);
    };
    fetchData();
  };

  return (
    <choice.Provider
      value={{ inputValue, setInputValue, setShowButton, selectedProducts }}
    >
      <div className={`product  ${isClicked ? "product-column" : ""}`}>
        {loading ? (
          <Skeleton
            height={200}
            width={175}
            className="flex items-center justify-center bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
          />
        ) : (
          <>
            <div className="product-image">
              <img src={product.image} alt="product" />
              <div className="product-promotion relative bottom-[7rem]  text-center float-right left-4">
                {product.promotion}
              </div>
            </div>
            <div
              className={`product-detail ${
                isClicked ? "product-detail-column" : ""
              }`}
            >
              <div
                className={`product-name text-[0.75rem] font-medium mb-1 w-36 m-auto h-10 overflow-hidden text-ellipsis object-cover ${
                  isClicked ? "product-name-column" : ""
                }`}
              >
                {product.detail}
              </div>
              <div className="font-bold">
                {product.price.toLocaleString()} đ
              </div>
              {showButton ? (
                <button
                  className="hover:bg-gree-800 text-xs"
                  onClick={handleButtonClick}
                >
                  CHỌN
                </button>
              ) : (
                <Input product={product} />
              )}
            </div>
          </>
        )}
      </div>
    </choice.Provider>
  );
};

export default Product;
