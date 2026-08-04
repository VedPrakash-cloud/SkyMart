import React, { useContext } from "react";
import { MyLoginStore } from "../context/AppStore";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { ChevronDown, Search } from "lucide-react";

const Products = () => {
  const { filteredList,searchInput, setSearchInput } = useContext(MyLoginStore);

  const handleInputClear = ()=>{
    setSearchInput("")
  }

  const categoryList = filteredList.reduce((acc, curr)=>{
    if(!acc.includes(curr.category)){
      acc.push(curr.category);
    }
    return acc;
  },[])

  return (
    <div>
      <div className="border-b border-b-gray-300/50 py-20 px-5 md:px-10 bg-[#0d0d0d] text-white">
        <h1 className="text-5xl font-semibold">All Products</h1>
        <p className="text-sm text-gray-300/50 my-3">{filteredList?.length} products found</p>
        <div className="border w-[98%] border-white my-5 p-4 rounded-2xl">
          <div className="w-full grid md:flex gap-3 pb-2 mb-1">
            <div className="flex items-center-safe gap-2 border border-gray-600/30 focus:border focus:border-[#c8f400] w-full rounded-3xl px-5 py-2 bg-gray-600/20">
            <Search size={20} className="text-gray-300/30" />
            <input
              type="text"
              placeholder="Search products"
              className="w-full outline-none"
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
          <div className="flex items-center-safe gap-2">
            <div className="text-nowrap border border-gray-400/30 pl-4 pr-2 py-2 rounded-4xl">
              <div className="flex justify-between gap-5 items-center-safe">
                <p className="text-sm/3">All Categories</p>
                <ChevronDown size={14}/>
              </div>
              <div>
                {categoryList.map((item, idx)=>{
                  <div key={idx}>
                    {item}
                  </div>
                })}
              </div>
            </div>
            <div className="text-nowrap border border-gray-400/30 pl-4 pr-2 py-2 rounded-4xl">
              <div className="flex justify-between gap-5 items-center-safe">
                <p className="text-sm/3">Featured</p>
                <ChevronDown size={14}/>
              </div>
              <div></div>
            </div>
            {searchInput ? <span onClick={handleInputClear} className="cursor-pointer active:scale-95 flex gap-2 items-center-safe px-2 rounded-4xl text-white bg-red-600/50 border border-red-500 transition-colors text-nowrap">X Clear</span> : ""}
          </div>
          </div>
            {searchInput ? <div className="flex items-center-safe gap-5 border-t pt-3"> <span className="text-[#c8f400] text-sm pb-1 bg-[#c8f400]/10 px-4 rounded-full mx-1">"{searchInput}"<span onClick={handleInputClear} className="cursor-pointer ml-3">x</span></span> </div> : ""}
        </div>
        <div className="grid md:grid-cols-4 gap-5 w-[98%]">
          {filteredList.length > 1 ? (filteredList?.map((item) => (
            <div key={item.id}>
              <ProductCard product={item} />
            </div>
          ))) :
          (
            <div className="flex flex-col justify-center-safe items-center-safe relative top-12 left-102">
            <h1 className="text-gray-300/40 text-2xl font-semibold">No products found</h1>
          <p className="text-gray-300/30">No result for "{searchInput}"</p>
          <button className="border px-4 py-2 text-gray-300/30 rounded-2xl my-2 cursor-pointer" onClick={()=>setSearchInput("")}>Clear Filter</button>
          </div>
          )
        }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
