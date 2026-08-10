import { Check, Star, ShoppingCart } from "lucide-react";
import {useContext} from 'react';
import { MyLoginStore } from '../context/AppStore'

const ProductCard = ({ product }) => {
  const {cartItem, addToCart} = useContext(MyLoginStore);

  const isAdded = cartItem.some((item)=> item.id === product.id)

  return (
      <div className="border flex flex-col justify-between border-white overflow-hidden rounded-4xl h-96 md:w-64">
        <div className="inset-shadow-sm inset-shadow-white shadow-sm shadow-white bg-white/10 rounded-t-4xl p-5 h-55 md:w-64">
          <span className="capitalize bg-black/50 font-semibold px-5 py-1 rounded-full text-xs">
            {product?.category}
          </span>
          <img
            src={product.images[0]}
            alt={product.title}
            crossOrigin="anonymous"
            className="h-full w-full object-contain hover:scale-115 duration-300 delay-300 ease-in-out p-5"
          />
        </div>
        <div className="px-5 md:h-24">
          <div className="border-b pt-3 pb-1 h-full flex flex-col justify-between border-b-gray-300/60">
            <p className="capitalize truncate text-xs text-gray-200/30 font-semibold">
              {product.category}
            </p>
            <p className="text-2xl truncate md:text-base font-semibold">
              {product.title}
            </p>
            <span className="flex items-center-safe gap-1 text-xs truncate text-gray-200/30 font-semibold">
              <Star size={14} fill="#facc15" className="text-amber-400"/>({product.rating})
            </span>
          </div>
        </div>
        <div className="px-5 h-16 flex items-center-safe justify-between">
          <p className="text-[#c8f400] font-bold text-2xl">${product.price}</p>
          <button 
          onClick={()=>addToCart(product)}
          className={`cursor-pointer active:scale-95 transition-scale delay-100 duration-200 ease-in-out flex gap-2 items-center-safe font-semibold text-sm px-3 py-1 rounded-full ${isAdded ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-[#c8f400] text-black hover:bg-[#b0d800]"}`}>
            {isAdded ? <>
              <Check size={12}/> Added
            </> : <>
              <ShoppingCart size={12} /> Add{" "}
            </>}
          </button>
        </div>
      </div>
  );
};

export default ProductCard;
