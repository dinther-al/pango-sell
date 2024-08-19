import React, { forwardRef, useEffect } from "react";
import "../css/footer.css";
import NavigateToCheckoutSection from "./NavigateToCheckoutSection";
import Skeleton from "react-loading-skeleton";
import { useStore } from "zmp-framework/react";
import store from "../store";

const Footer = ({ inputRefs }, ref) => {
  const totalPrice = useStore("totalPrice");
  const countProduct = useStore("countProduct");

  const isHomePage = useStore("isHomePage");
  const loading = useStore("loading");

  return (
    <div className="footer">
      {loading ? (
        <div className="flex justify-center">
          <Skeleton
            height={40}
            width={350}
            className="flex items-center justify-center bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
          />
        </div>
      ) : (
        <div className="footer-button font-normal">
          {countProduct === 0 ? (
            <p className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 36 36"
              >
                <path
                  fill="#FFDC5D"
                  d="M35.809 15.672s.653-1.043-.454-1.558c-1.106-.515-1.482.657-1.482.657l-2.39 5.142c-.141-.164-.705-.516-.866-.671l3.315-7.136s.653-1.043-.455-1.558c-1.107-.514-1.483.657-1.483.657l-3.118 6.711c-.175-.099-.63-.327-.812-.423l3.616-7.781s.652-1.043-.455-1.558c-1.106-.515-1.482.657-1.482.657l-3.618 7.78c-.193-.078-.797-.335-.988-.404l3.38-7.272s.651-1.043-.455-1.558c-1.108-.515-1.483.657-1.483.657l-3.574 7.689l-.286.617l-.128.276c3.323 1.544 4.486 5.616 3.2 8.384c-.258.554-1.177.3-1.177.3c1.544-3.321.358-6.566-2.964-8.109l.144-4.545s.134-1.213-1.079-1.348c-1.215-.134-1.349 1.08-1.349 1.08l-.509 3.183c-.203 1.262-.431 2.525-.81 3.746a7.328 7.328 0 0 0 13.647 5.247l.257-.556z"
                />
                <path
                  fill="#FFDC5D"
                  d="M.192 15.672s-.654-1.043.453-1.558c1.107-.515 1.482.657 1.482.657l2.39 5.142c.141-.164.705-.516.866-.671l-3.315-7.136s-.654-1.043.455-1.558c1.105-.514 1.482.657 1.482.657l3.119 6.711c.175-.099.63-.327.812-.423l-3.615-7.78s-.653-1.043.455-1.558c1.107-.515 1.483.657 1.483.657l3.618 7.78c.193-.078.797-.335.988-.404l-3.38-7.272s-.651-1.043.455-1.558c1.107-.515 1.483.657 1.483.657l3.574 7.689l.286.617l.128.276c-3.323 1.544-4.486 5.616-3.2 8.384c.258.554 1.177.3 1.177.3c-1.544-3.321-.358-6.566 2.963-8.109l-.143-4.545s-.134-1.213 1.078-1.348c1.215-.134 1.35 1.08 1.35 1.08l.508 3.183c.203 1.262.432 2.525.811 3.746a7.328 7.328 0 0 1-13.648 5.247l-.256-.556z"
                />
              </svg>
              Bấm mua sản phẩm với giá ưu đãi ngay!
            </p>
          ) : (
            <>
              {isHomePage ? (
                <NavigateToCheckoutSection
                  text={`Bạn chọn ${countProduct} món | ${totalPrice.toLocaleString()}đ`}
                  route="form"
                  label="ĐẶT HÀNG"
                  inputRefs={inputRefs}
                  ref={ref}
                />
              ) : (
                <NavigateToCheckoutSection
                  text={`Tổng tiền đơn hàng ${totalPrice.toLocaleString()}đ`}
                  route="result"
                  label="ĐẶT HÀNG"
                  inputRefs={inputRefs}
                  ref={ref}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Footer);
