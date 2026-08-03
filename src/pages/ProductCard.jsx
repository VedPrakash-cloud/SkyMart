import { ShoppingCart } from "lucide-react";
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="border flex flex-col justify-between border-white overflow-hidden rounded-4xl h-96 md:w-64">
        <div className="inset-shadow-sm inset-shadow-white shadow-sm shadow-white bg-white/10 rounded-t-4xl p-5 h-55 md:w-64">
          <span className="capitalize bg-black/50 font-semibold px-5 py-1 rounded-full text-xs">
            {product.category}
          </span>
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-contain hover:scale-115 duration-300 delay-300 ease-in-out"
          />
        </div>
        <div className="px-5 md:h-24">
          <div className="border-b pt-3 pb-1 h-full flex flex-col justify-between border-b-gray-300/60">
            <p className="capitalize text-xs text-gray-200/30 font-semibold">
              {product.category}
            </p>
            <p className="text-2xl md:text-base font-semibold">{product.title}</p>
            <span className="text-xs text-gray-200/30 font-semibold">
              ( {product.rating} )
            </span>
          </div>
        </div>
        <div className="px-5 h-16 flex items-center-safe justify-between">
          <p className="text-[#c8f400] font-bold text-2xl">${product.price}</p>
          <button className="bg-[#c8f400] cursor-pointer active:scale-95 transition-scale delay-100 duration-200 ease-in-out flex gap-2 items-center-safe text-black font-semibold text-sm px-3 py-1 rounded-full"><ShoppingCart size={12}/> Add </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
