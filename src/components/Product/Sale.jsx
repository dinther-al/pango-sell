import React, { createContext, useEffect } from "react";
import "../../css/product.css";
import Products from "./Products.jsx";
import Skeleton from "react-loading-skeleton";
import { Input } from "zmp-ui";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import RippleButton from "../RippleButton.jsx";

export const ThemeContext = createContext();
export const SearchContext = createContext();

const Sale = () => {
  const isClicked = useStore("isClicked");
  const isShowSearch = useStore("isShowSearch");
  const sizeProduct = useStore("sizeProduct");
  const displayedProducts = useStore("displayedProducts");

  const loading = useStore("loading");

  const handleClick = async () => {
    await store.dispatch("setIsClicked", !isClicked);
  };
  return (
    <div id="myElement" className={`sale ${loading ? "Skeleton" : ""}`}>
      <div className="sale-header">
        {loading ? (
          <Skeleton
            height={55}
            width={385}
            className="flex items-center justify-center mt-3 bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
          />
        ) : (
          <>
            <div className="flex items-center">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#ff0000"
                  d="M8 16c3.314 0 6-2 6-5.5c0-1.5-.5-4-2.5-6c.25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6c-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75c0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5c-.179 1-.25 2 1 3c.625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"
                />
              </svg>
              <div className="text-xs mr-12">Sản phẩm ưu đãi dành cho bạn</div>
            </div>
            <div className="flex justify-around w-[20%]">
              {isClicked ? (
                <div className="border border-solid border-[#96c3a9] rounded-md ml-1 p-2 drop-shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 256 256"
                    onClick={handleClick}
                  >
                    <path
                      fill="#387552"
                      d="M104 40H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64H56V56h48zm96-64h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m0 64h-48V56h48zm-96 32H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64H56v-48h48zm96-64h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m0 64h-48v-48h48z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="border border-solid border-[#96c3a9] rounded-md ml-1 p-2 drop-shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    onClick={handleClick}
                  >
                    <path
                      fill="#387552"
                      d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5m0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5m0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5M7 19h14v-2H7zm0-6h14v-2H7zm0-8v2h14V5z"
                    />
                  </svg>
                </div>
              )}
              <div className="border border-solid border-[#96c3a9] rounded-md ml-1 p-2 drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  onClick={async () =>
                    await store.dispatch("setIsShowSearch", !isShowSearch)
                  }
                >
                  <path
                    fill="#387552"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      {isShowSearch && (
        <div className="flex justify-center items-center px-8">
          <Input.Search
            label="Label"
            helperText="Helper text"
            placeholder="Strawberry"
            clearable={{
              mode: "always",
            }}
            onSearch={async (value) => {
              await store.dispatch("setSearchProduct", value.toLowerCase());
            }}
          />
        </div>
      )}
      <Products />
      {!loading && displayedProducts.length > 0 && (
        <div className="flex justify-center mt-6">
          <RippleButton
            children="Xem thêm"
            className="bg-[#1f633c] px-5 py-2 rounded-3xl text-white font-normal"
            onClick={async () =>
              await store.dispatch("setSizeProduct", {
                ...sizeProduct,
                end: sizeProduct.end + 4,
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default Sale;
