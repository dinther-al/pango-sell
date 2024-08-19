import { createStore } from "zmp-framework/core";
import axios from "axios";

const store = createStore({
    state: {
        user: {
            name: "",
            image: "https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/avatarreal.jpg?alt=media&token=1e85b77c-2034-476e-97ff-0e10f895e8be",
        },
        products: [],
        // currentSlide:0,
        // isDecreaseActive: false,
        showButton: true,
        // inputValue: 1,
        displayedProducts: [],
        isClicked: false,
        getAPI: false,
        searchProduct: "",
        isShowSearch: false,

        isHomePage: true,
        selectedProducts: [],
        info: {
            name: "",
            phone: "",
            address: "",
            city: "",
            paymentMethod: "COD",
            selectedPaymentMethod: {
                id: 1,
                value: "COD",
                label: "Thanh toán khi nhận hàng (COD)",
            },
            paymentMethods: [
                { id: 1, value: "COD", label: "Thanh toán khi nhận hàng (COD)" },
                { id: 2, value: "BankTransfer", label: "Chuyển khoản ngân hàng" },
                { id: 3, value: "CreditCard", label: "Thẻ tín dụng" },
            ],
        },
        discountAmount: 0,
        loading: true,
        footerAppear: true,
        discountCode: "",
        discountApplied: false,
        showClearButton: false,
        totalPrice: 0,
        countProduct: 0,
        sizeProduct: {
            from: 0,
            size: 4,
        },
    },
    getters: {
        user: ({ state }) => state.user,
        products: ({ state }) => state.products,
        // currentSlide: ({ state }) => state.currentSlide,
        // isDecreaseActive: ({ state }) => state.isDecreaseActive,
        showButton: ({ state }) => state.showButton,
        // inputValue: ({ state }) => state.inputValue,
        displayedProducts: ({ state }) => state.displayedProducts,
        isClicked: ({ state }) => state.isClicked,
        getAPI: ({ state }) => state.getAPI,

        searchProduct: ({ state }) => state.searchProduct,
        isShowSearch: ({ state }) => state.isShowSearch,
        isHomePage: ({ state }) => state.isHomePage,
        selectedProducts: ({ state }) => state.selectedProducts,
        info: ({ state }) => state.info,
        discountAmount: ({ state }) => state.discountAmount,
        loading: ({ state }) => state.loading,
        footerAppear: ({ state }) => state.footerAppear,
        discountCode: ({ state }) => state.discountCode,
        discountApplied: ({ state }) => state.discountApplied,
        showClearButton: ({ state }) => state.showClearButton,
        sizeProduct: ({ state }) => state.sizeProduct,

        totalPrice: ({ state }) => {
            return state.selectedProducts.reduce(
                (total, product) => total + product.price * product.quantity,
                0
            ) - state.discountAmount;
        },
        countProduct: ({ state }) => {
            return state.selectedProducts.reduce((total, product) => {
                return total + product.quantity;
            }, 0);
        },
    },
    actions: {
        async setProducts({ state }, data) {
            state.products = data;
        },
        // async setcurrentSlide({ state }, data) {
        //     state.currentSlide = data;
        // },
        // async setIsDecreaseActive({ state }, data) {
        //     state.isDecreaseActive = data;
        // },
        async setShowButton({ state }, data) {
            state.showButton = data;
        },
        // async setInputValue({ state }, data) {
        //     state.inputValue = data;
        // },
        async setDisplayedProducts({ state }, data) {
            state.displayedProducts = data;
        },
        async setIsClicked({ state }, data) {
            state.isClicked = data;
        },
        async setGetAPI({ state }, data) {
            state.getAPI = data;
        },
        async setSearchProduct({ state }, data) {
            state.searchProduct = data;
        },
        async setIsShowSearch({ state }, data) {
            state.isShowSearch = data;
        },
        async setIsHomePage({ state }, data) {
            state.isHomePage = data;
        },
        async setSelectedProducts({ state }, data) {
            state.selectedProducts = data;
        },
        async setInfo({ state }, data) {
            state.info = data;
        },
        async setDiscountAmount({ state }, data) {
            state.discountAmount = data;
        },
        async setLoading({ state }, data) {
            state.loading = data;
        },
        async setFooterAppear({ state }, data) {
            state.footerAppear = data;
        },
        async setDiscountCode({ state }, data) {
            state.discountCode = data;
        },
        async setDiscountApplied({ state }, data) {
            state.discountApplied = data;
        },
        async setShowClearButton({ state }, data) {
            state.showClearButton = data;
        },
        async setSizeProduct({ state }, data) {
            state.sizeProduct = data;
        },
        async getProducts({ state }, data) {
            await store.dispatch("setLoading", true);
            axios
                .get("https://api.jsonbin.io/v3/b/65bef366266cfc3fde857067")
                .then(async (response) => {
                    await store.dispatch("setProducts", response.data.record);
                    setTimeout(async () => {
                        await store.dispatch("setLoading", false);
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // async setTotalPrice({ state }, data) {
        //     state.totalPrice = data;
        // },
        // async setCountProduct({ state }, data) {
        //     state.countProduct = data;
        // },

    }
})
export default store;
