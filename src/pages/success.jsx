import React from "react";
import { useNavigate } from "react-router";
import { useStore } from "zmp-framework/react";
import store from "../store.js";
import RippleButton from "../components/RippleButton.jsx";

const SuccessPage = () => {
  const navigate = useNavigate();

  const selectedProducts = useStore("selectedProducts");
  const info = useStore("info");
  const totalPrice = useStore("totalPrice");
  const discountAmount = useStore("discountAmount");
  return (
    <div>
      <main className="p-4">
        <div className="text-black mb-2">
          <h1 className="text-xl font-bold mb-">Đặt hàng thành công! 🎉</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Cảm ơn bạn đã luôn tin dùng sản phẩm PangoCDP👏
          </p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md hover:rounded-md">
          {info.selectedPaymentMethod.label}
        </button>
        <div className="mb-4 mt-4 bg-slate-200 p-4">
          <h2 className="font-bold mb-2">THÔNG TIN GIAO HÀNG</h2>
          <div className="flex mb-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 448 512"
            >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
            <p className="ml-2 leading-none">
              {info.name} ({info.phone})
            </p>
          </div>
          <div className="flex mb-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            <p className="ml-2 leading-none">{info.address}</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 -960 960 960"
            >
              <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Zm400 360H600v80H360v-80H160v160h640v-160Zm-360 0h80v-80h-80v80Zm-280-80h200v-80h240v80h200v-200H160v200Zm320 40Z" />
            </svg>
            <p className="ml-2 leading-none">
              Dự kiến nhận kiện giao ngày 16/09/2023
            </p>
          </div>
        </div>
        <div className="relative overflow-x-auto flex flex-col">
          <table className="w-full text-xs text-left rtl:text-right text-black-500 dark:text-black-400">
            <thead className="text-sm text-black-700 border-b white:bg-gray-800 dark:border-gray-100">
              <tr className="whitespace-nowrap">
                <th scope="col" className=" py-3">
                  Sản phẩm
                </th>
                <th scope="col" className="pr-2 py-3 text-center">
                  Số lượng
                </th>
                <th scope="col" className=" py-3 text-center">
                  Thành tiền
                </th>
              </tr>
            </thead>
            {selectedProducts.map((product) => (
              <tbody key={product.id}>
                <tr className="bg-white border-b white:bg-gray-800 dark:border-gray-100">
                  <th
                    scope="row"
                    className=" py-3 font-light text-gray-900 whitespace-wrap max-w-xs truncate dark:text-black flex products-center items-start justify-start"
                  >
                    <img
                      src={product.image}
                      alt={product.detail}
                      className="w-10  mr-2 object-cover"
                    />
                    <p className="w-40 font-normal text-sm whitespace-normal h-10 overflow-hidden text-ellipsis object-cover">
                      {product.detail}
                    </p>
                  </th>
                  <td className="pr-2 py-3  text-center">{product.quantity}</td>
                  <td className=" py-3  text-right">
                    {(product.price * product.quantity).toLocaleString()}đ
                  </td>
                </tr>
              </tbody>
            ))}
            {discountAmount !== 0 ? (
              <tbody>
                <tr className="bg-white border-b white:bg-gray-800 dark:border-gray-100">
                  <th
                    scope="row"
                    className="items-center py-3 font-light text-gray-900 whitespace-wrap max-w-xs truncate dark:text-black flex products-center justify-start"
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/voucher.png?alt=media&token=f0d68537-3529-4ca6-82e7-234adeec510a"
                      alt="voucher"
                      className="w-10  mr-2 object-cover"
                    />
                    <p className="w-40 font-normal text-sm whitespace-normal h-10 overflow-hidden text-ellipsis text-center">
                      Voucher giảm giá
                    </p>
                  </th>
                  <td className="pr-2 py-3  text-center">1</td>
                  <td className=" py-3  text-right">
                    -{discountAmount.toLocaleString()}đ
                  </td>
                </tr>
              </tbody>
            ) : (
              ""
            )}
          </table>
          <div className="flex justify-end white:bg-gray-700 mt-2 font-medium dark:text-black">
            Tổng tiền {totalPrice.toLocaleString()}đ
          </div>
        </div>
        <div className="space-y-4 mt-4 flex-product-column ">
          <RippleButton
            className="bg-green-700 text-white rounded-lg px-4 py-2 flex items-center justify-center w-full"
            onClick={async () => {
              await store.dispatch("setSelectedProducts", []),
                await store.dispatch("setDiscountAmount", 0),
                await store.dispatch("setIsHomePage", true),
                await store.dispatch("setSizeProduct", {
                  start: 0,
                  end: 4,
                }),
                navigate("/");
            }}
            children="Tiếp tục mua sắm"
          />

          <button className="border border-green-700 text-green-600 rounded-lg px-4 py-2 flex items-center justify-center w-full">
            <span role="img" aria-label="envelope">
              ✉️
            </span>
            Nhắn tin cho Pango FMCG
            <span role="img" aria-label="heart">
              💛
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;
