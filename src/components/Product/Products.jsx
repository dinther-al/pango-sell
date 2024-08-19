import Product from "./Product.jsx";
import React, { useEffect } from "react";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const searchProduct = useStore("searchProduct");
  const displayedProducts = useStore("displayedProducts");
  const loading = useStore("loading");
  const products = useStore("products");
  const isClicked = useStore("isClicked");
  const sizeProduct = useStore("sizeProduct");

  useEffect(() => {
    store.dispatch("getProducts");
  }, []);

  useEffect(() => {
    const filterProducts = async () => {
      if (searchProduct) {
        const filteredProducts = products.filter((product) =>
          product.detail.toLowerCase().includes(searchProduct)
        );
        await store.dispatch(
          "setDisplayedProducts",
          filteredProducts?.length > 0 ? filteredProducts : []
        );
      } else {
        await store.dispatch("setDisplayedProducts", products);
      }
    };

    filterProducts();
  }, [searchProduct, products]);

  return (
    <>
      {loading ? (
        <div className="flex flex-wrap justify-around items-center p-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              height={180}
              width={155}
              className="flex items-center justify-center bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
            />
          ))}
        </div>
      ) : displayedProducts?.length > 0 ? (
        <div className={`products ${isClicked ? "products-column" : ""}`}>
          {displayedProducts
            .slice(sizeProduct.from, sizeProduct.size)
            .map((product, index) => (
              <Product key={index} product={product} />
            ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center flex-col my-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/pango1touch-a5f78.appspot.com/o/no-products-found.png?alt=media&token=4e59a87d-82dd-4cfd-9c91-f6e313f21102"
              alt=""
              className="w-[50%] object-contain"
            />
            <button
              style={{ minWidth: 100 }}
              className="bg-[#1f633c] text-white font-semibold px-5 py-2 rounded-full mt-4"
              onClick={async () => await store.dispatch("setSearchProduct", "")}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
