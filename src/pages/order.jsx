import React, { createContext, useRef } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../components/Footer.jsx";
import InputForm from "../components/form/InputForm.jsx";
import { useStore } from "zmp-framework/react";
import store from "../store.js";
import RippleButton from "../components/RippleButton.jsx";

export const context = createContext();
export const footerAppearContext = createContext();

const OrderPage = () => {
  const navigate = useNavigate();

  const footerAppear = useStore("footerAppear");
  const discountCode = useStore("discountCode");
  const discountApplied = useStore("discountApplied");
  const showClearButton = useStore("showClearButton");
  const inputRefs = Array.from({ length: 4 }, () => useRef());

  const totalPrice = useStore("totalPrice");
  const discountAmount = useStore("discountAmount");
  const isHomePage = useStore("isHomePage");
  const selectedProducts = useStore("selectedProducts");
  const info = useStore("info");

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    await store.dispatch("setInfo", {
      ...info,
      [name]: value,
    });
  };

  const handleInputSelect = async (e) => {
    const selectedMethod = info.paymentMethods.find(
      (method) => method.value === e.target.value
    );
    const { value } = e.target;
    await store.dispatch("setInfo", {
      ...info,
      paymentMethod: value,
      selectedPaymentMethod: selectedMethod,
    });
  };

  const discountCodes = {
    VC10K: 10000,
    VC20K: 20000,
  };

  const handleSaleChange = async (event) => {
    const value = event.target.value;
    if (discountApplied) {
      toast.warning("Chỉ áp dụng 1 mã giảm giá!");
      return;
    }

    await store.dispatch("setDiscountCode", value);
    await store.dispatch("setShowClearButton", value !== "");
  };

  const clearDiscountCode = async () => {
    await store.dispatch("setDiscountCode", "");
    await store.dispatch("setShowClearButton", false);
  };

  const applyDiscount = async () => {
    if (discountApplied) {
      toast.warning("Bạn đã áp dụng mã giảm giá này!");
      return;
    }

    const discountValue = discountCodes[discountCode];
    if (discountValue !== undefined) {
      toast.success("Mã giảm giá được áp dụng thành công!");
      await store.dispatch("setDiscountAmount", discountValue);
      await store.dispatch("setDiscountApplied", true);
    } else {
      toast.error("Mã giảm giá không hợp lệ!");
    }
  };

  const handleBlur = async () => {
    await store.dispatch("setFooterAppear", !footerAppear);
  };

  return (
    <div className="page">
      <div className="flex items-center ml-4 mt-4">
        <RippleButton
          className="bg-green-700 hover:bg-green-800 text-white rounded-tr-lg rounded-br-lg px-2 py-1 mr-1 h-16 w-30 -mt-6 flex items-center justify-center relative right-4 top-2"
          onClick={() => {
            setTimeout(async () => {
              await store.dispatch("setIsHomePage", !isHomePage);
              navigate("/");
            }, 100);
          }}
        >
          <div className="flex flex-col items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="#fff" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="m13.5 9l-3 3l3 3" />
              </g>
            </svg>
            <p className="whitespace-nowrap uppercase mt-1">Chọn lại</p>
          </div>
        </RippleButton>
        <div className=" z-10 w-[17.8rem]">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={35}
            slidesPerView={2.7}
            navigation={{
              nextEl: "",
              prevEl: "",
            }}
            // className="w-[17.8rem]"
          >
            {selectedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-14 h-14 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex justify-center text-sm">
                    <p className="whitespace-nowrap mr-1">
                      {product.price.toLocaleString()} đ
                    </p>
                    {product.quantity > 1 && (
                      <p className="whitespace-nowrap">({product.quantity})</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {selectedProducts?.length > 2 && (
          <div className=" absolute right-[-1rem] opacity-70 animate-a infinite z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="#888888"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="m11 19l6-7l-6-7" />
                <path d="m7 19l6-7l-6-7" opacity=".5" />
              </g>
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 mb-[5.1rem]">
        <h1 className="text-xl font-bold mb-4">Thông tin giao hàng</h1>
        <InputForm
          label="Tên liên hệ "
          type="text"
          placeholder="Công Hậu"
          name="name"
          value={info.name}
          onChange={handleInputChange}
          ref={inputRefs[0]}
          handleBlur={handleBlur}
        />
        <InputForm
          label="Số điện thoại "
          type="number"
          placeholder="0987654321"
          name="phone"
          value={info.phone}
          onChange={handleInputChange}
          ref={inputRefs[1]}
          handleBlur={handleBlur}
        />
        <InputForm
          label="Địa chỉ "
          type="text"
          placeholder="201/20 Nguyễn Thái Sơn"
          name="address"
          value={info.address}
          onChange={handleInputChange}
          ref={inputRefs[2]}
          handleBlur={handleBlur}
        />
        <InputForm
          label="Thành phố "
          type="text"
          placeholder=" TP.Hồ Chí Minh"
          name="city"
          value={info.city}
          onChange={handleInputChange}
          ref={inputRefs[3]}
          handleBlur={handleBlur}
        />
        <div className="flex items-center justify-between mt-2 mb-4">
          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="sale">
              Mã giảm giá
            </label>
            <div className="relative">
              <input
                id="sale"
                type="text"
                placeholder="Nhập mã"
                value={discountCode}
                onChange={handleSaleChange}
                onBlur={handleBlur}
                onFocus={handleBlur}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-[0_0px_2px_#1f633c]"
              />
              {showClearButton && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  className="absolute right-3 bottom-[0.6rem]"
                  onClick={clearDiscountCode}
                >
                  <path
                    fill="#888888"
                    d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21"
                  />
                </svg>
              )}
            </div>
          </div>
          <RippleButton
            disabled={!discountCode}
            onClick={applyDiscount}
            className={` px-6 rounded-lg text-white h-[2.9rem] relative top-[.85rem] ${
              discountCode ? "bg-green-800" : "bg-gray-200"
            }`}
            children="Áp dụng"
          />
          <ToastContainer />
        </div>
        <div className="bg-gray-100 px-2 mb-4">
          <div className="flex justify-between py-1 font-medium">
            Tổng tiền hàng:{" "}
            <span className="font-bold">{totalPrice.toLocaleString()}đ</span>
          </div>
          {discountApplied && (
            <div className="flex justify-between py-1 font-medium border-t-2 border-solid border-slate-200">
              Tổng tiền giảm giá:
              <span className="font-bold text-green-500">
                -{discountAmount.toLocaleString().toString()}đ
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Phương thức thanh toán:</label>
          {info.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-4 mt-2">
              <input
                type="radio"
                id={method.value}
                name="paymentMethod"
                value={method.value}
                checked={info.paymentMethod === method.value}
                onChange={handleInputSelect}
                className="accent-green-600"
              />
              <label className="text-gray-500" htmlFor={method.value}>
                {method.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      {footerAppear && (
        <Footer discountAmount={discountAmount} inputRefs={inputRefs} />
      )}
    </div>
  );
};

export default OrderPage;
