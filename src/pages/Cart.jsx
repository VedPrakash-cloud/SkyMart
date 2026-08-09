import React, { useContext } from "react";
import { MyLoginStore } from "../context/AppStore";
import { PackageOpen, ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isCartOpen, setIsCartOpen, cartItem, clearCart, grandTotal, handleCheckout } = useContext(MyLoginStore);

  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen w-[20%] md:w-full backdrop-blur-md transition-transform duration-600 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute top-0 right-0 min-w-80 h-screen bg-[#111111] border-l border-gray-800 text-white flex flex-col justify-between">
        <div className="h-[75%]">
          <div className="flex w-100 md:w-full justify-between items-center-safe p-5 border-b border-gray-800">
          <div className="flex items-center-safe gap-2">
            <ShoppingBag size={18} className="text-[#c8f400]" />
            <h1 className="font-semibold text-lg">Cart</h1>
          </div>
          <X
            size={12}
            className="cursor-pointer active:scale-95"
            onClick={() => setIsCartOpen(false)}
          />
        </div>
        <div className="h-[90%] w-120 overflow-auto scrollbar-none">
        {cartItem.length > 0 ? (
          <div>
            {cartItem.map((item) => (
              <div key={item.id} className="flex flex-col m-5 border border-gray-300 rounded-xl w-92 md:w-[90%]">
                <CartProduct cart={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center-safe justify-center-safe h-110 w-105 md:w-full">
            <PackageOpen
              size={80}
              className="border border-[#3e3e3e] text-[#3e3e3e] p-5 rounded-3xl bg-[#1d1d1d]"
            />
            <p className="mt-3 text-xl text-gray-400/70">Cart is empty</p>
            <p className="text-sm text-gray-600/50">Go shop something cool</p>
            <button
              className="bg-[#c8f400] text-black my-5 px-5 py-2 font-semibold cursor-pointer active:scale-95 rounded-2xl"
              onClick={() => {
                navigate("/products");
                setIsCartOpen(false);
              }}
            >
              Browse Products
            </button>
          </div>
        )}
        </div>
        </div>
        <div className="flex flex-col w-100 md:w-full px-5 border-t border-t-gray-300 bg-[#111111] font-semibold my-5 py-2">
          <div className="flex text-2xl justify-between items-center-safe my-3">
            <h1>Total</h1>
            <p className="text-[#c8f400]">${grandTotal}</p>
          </div>
          <button onClick={handleCheckout} className={`bg-[#c8f400] rounded-2xl text-black py-3 ${cartItem.length > 0 ? "cursor-pointer active:scale-95 transition-all duration-300" : "cursor-not-allowed"}`}>
            Checkout{" "}
          </button>
          <button className="text-sm text-gray-400/40 my-1 cursor-pointer" onClick={clearCart}>Clear cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
