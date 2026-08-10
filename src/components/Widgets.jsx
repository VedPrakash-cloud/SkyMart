import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyLoginStore } from "../context/AppStore";
import { ShoppingBag, ArrowRight, Laptop, Package, Star, Zap, Lamp, Apple, ChefHat, Rose, Wind } from "lucide-react";

const Widgets = () => {
  const navigate = useNavigate();
  const { filteredList = [], categoryList = [], setSelectedCategory, addToCart } = useContext(MyLoginStore);



  const getCategoryIcon = (categoryName = "") => {
  const name = categoryName.toLowerCase();
  
  if (name.includes("beauty")) return <Rose fill="lightblue" className="w-8 h-8 text-blue-500" />;
  if (name.includes("fragrances")) return <Wind className="w-8 h-8 text-gray-300" />;
  if (name.includes("furniture")) return <Package className="w-8 h-8 text-amber-700/50" />;
  if (name.includes("groceries")) return <Apple fill="lightgreen" className="w-8 h-8 text-green-700" />;
  if (name.includes("decoration")) return <Lamp fill="lightblue" className="w-8 h-8 text-sky-700" />;
  if (name.includes("accessori") || name.includes("jewelery")) return <ChefHat fill="lightgray" className="w-8 h-8 text-gray-700/70" />;
};

  
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate("/products");
  };

  
  const topRatedProducts = filteredList
    .filter((item) => {
      const rate = typeof item.rating === "object" ? item.rating.rate : item.rating;
      return rate >= 4.0;
    })
    .slice(0, 5);

  
  const newArrivals = filteredList.slice().reverse().slice(0, 5);

  
  const getProductImg = (item) => {
    if (Array.isArray(item.images)) return item.images[0];
    return item.images || item.thumbnail || item.image;
  };

  return (
    <div className="bg-black text-white p-6 md:p-10 space-y-12">
  
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              navigate("/products");
            }}
            className="text-[#c8f400] text-sm font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryList.map((cat, idx) => {
  
            const itemCount = filteredList.filter(
              (item) => item.category?.toLowerCase() === cat.toLowerCase()
            ).length;

            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-white text-black rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
              >
                <div className="mb-3">{getCategoryIcon(cat)}</div>
                <h3 className="font-semibold text-lg text-gray-900 capitalize">{cat}</h3>
                <p className="text-xs text-gray-500 mt-1">{itemCount} items</p>
              </div>
            );
          })}
        </div>
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
  
        <div className="bg-[#111111] border border-gray-800/80 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Star className="text-amber-400 fill-amber-400" size={20} /> Top Rated
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                navigate("/products");
              }}
              className="text-[#c8f400] text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              See all <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {topRatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white text-black rounded-2xl p-3 flex items-center justify-between shadow-sm hover:border-[#c8f400] border border-transparent transition"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={getProductImg(item)}
                    alt={item.title}
                    className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1"
                  />
                  <span className="font-bold text-sm text-gray-900">${item.price}</span>
                </div>

  
                <button
                  onClick={() => addToCart(item)}
                  title="Add to Cart"
                  className="bg-[#e2ff54] hover:bg-[#c8f400] text-black p-2.5 rounded-xl transition cursor-pointer active:scale-95"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

  
        <div className="bg-[#111111] border border-gray-800/80 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap className="text-[#c8f400] fill-[#c8f400]" size={20} /> New Arrivals
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                navigate("/products");
              }}
              className="text-[#c8f400] text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              See all <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="bg-white text-black rounded-2xl p-3 flex items-center justify-between shadow-sm hover:border-[#c8f400] border border-transparent transition"
              >
                <div
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={getProductImg(item)}
                    alt={item.title}
                    className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1"
                  />
                  <span className="font-bold text-sm text-gray-900">${item.price}</span>
                </div>

  
                <button
                  onClick={() => addToCart(item)}
                  title="Add to Cart"
                  className="bg-[#e2ff54] hover:bg-[#c8f400] text-black p-2.5 rounded-xl transition cursor-pointer active:scale-95"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Widgets;