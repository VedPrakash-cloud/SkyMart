import React, { useContext } from "react";
import { MyLoginStore } from "../context/AppStore";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { Search } from "lucide-react";

const Products = () => {
  const { data } = useContext(MyLoginStore);

  const merchandise = data.products;

  return (
    <div>
      <div className="border-b border-b-gray-300/50 py-20 px-5 md:px-10 bg-[#0d0d0d] text-white">
        <h1 className="text-5xl font-semibold">All Products</h1>
        <p className="text-sm text-gray-300/50 my-3">{merchandise?.length} products found</p>
        <div className="border w-[98%] border-white my-5 p-4 rounded-2xl">
          <div className="border-b w-full grid md:flex gap-3 pb-2 mb-1">
            <div className="flex items-center-safe gap-2 border border-gray-600/30 focus:border focus:border-[#c8f400] w-full rounded-3xl px-5 py-2 bg-gray-600/20">
            <Search size={20} className="text-gray-300/30" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center-safe gap-2">
            <div className="text-nowrap border border-gray-400/30 px-4 py-2 rounded-4xl">
              <p>All Categories</p>
            </div>
            <div></div>
            <div className="text-nowrap border border-gray-400/30 px-4 py-2 rounded-4xl">
              <p>Featured</p>
            </div>
            <div></div>
            <span className="hidden">Clear</span>
          </div>
          </div>
          <span className="text-[#c8f400] text-sm pb-1 bg-[#c8f400]/10 px-4 rounded-full mx-1">"products"</span>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {merchandise?.map((item) => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
