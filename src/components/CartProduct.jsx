import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { MyLoginStore } from "../context/AppStore";

const CartProduct = ({ cart }) => {
  const {increaseCount,
        decreaseCount,
        removeFromCart} = useContext(MyLoginStore);


  return (
    <div className=" border-white rounded-xl p-3 flex gap-3">
      <div className="h-20 w-20 bg-white rounded-xl">
        <img
          src={cart.images[0]}
          alt={cart.title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="w-full">
        <div>
          <h1 className="md:text-xl font-bold">{cart.title}</h1>
          <p className="text-[#c8f400] font-bold md:text-lg">${cart.price *cart.quantity}</p>
          <p className="text-gray-400/40 text-sm">${cart.price} each</p>
        </div>
        <div className="flex justify-between items-center-safe">
          <div className="flex items-center-safe gap-2">
            <span className="cursor-pointer border border-gray-200 px-1 rounded text-sm/4" onClick={()=>decreaseCount(cart.id)}>-</span>
            <p className="font-semibold text-lg">{cart.quantity}</p>
            <span className="cursor-pointer border border-gray-200 px-1 rounded text-sm/4" onClick={()=>increaseCount(cart.id)}>+</span>
          </div>
          <Trash2 size={12} className="text-red-400 cursor-pointer" onClick={()=>removeFromCart(cart.id)}/>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
