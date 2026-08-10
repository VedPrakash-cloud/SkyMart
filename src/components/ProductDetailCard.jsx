import React, { useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { MyLoginStore } from "../context/AppStore";
import ProductCard from "../components/ProductCard";

const ProductDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    filteredList = [],
    cartItem = [],
    addToCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
  } = useContext(MyLoginStore);

  const [isFavorite, setIsFavorite] = useState(false);

  
  const product = filteredList.find((item) => String(item.id) === String(id));
  console.log(product);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading product details...</p>
      </div>
    );
  }

  
  const currentIndex = filteredList.findIndex((item) => String(item.id) === String(id));
  const prevProduct = filteredList[currentIndex - 1];
  const nextProduct = filteredList[currentIndex + 1];

  
  const inCartItem = cartItem.find((item) => item.id === product.id);

  
  const relatedProducts = filteredList.filter(
    (item) => item.category === product.category && item.id !== product.id
  );


  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white pt-24 pb-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/products" className="hover:text-white">
            ← Products
          </Link>
          <span>/</span>
          <span className="capitalize">{product?.category}</span>
          <span>/</span>
          <span className="text-gray-200 truncate">{product?.title}</span>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-20">
          
          <div className="bg-white rounded-3xl p-8 flex items-center justify-center h-105">
            <img
              src={product.images[0]}
              alt={product?.title}
              className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          
          <div>
            <span className="bg-[#c8f400] text-black font-bold text-[10px] uppercase px-3 py-1 rounded-full inline-block mb-3">
              {product?.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{product?.title}</h1>

            <div className="flex items-center gap-2 mb-4">
              <Star fill="#facc15" size={16} className="text-amber-400" />
              <span className="font-semibold text-sm">
                {typeof product?.rating === "object" ? product?.rating?.rate : product?.rating || 4.2}
              </span>
              <span className="text-gray-500 text-xs">({product?.reviews.length})</span>
            </div>

            <hr className="border-gray-800 my-4" />

            <h2 className="text-3xl font-extrabold text-[#c8f400] mb-4">${product?.price}</h2>

            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              {product?.description ||
                "Advanced smartwatch with health monitoring, GPS, and water resistance. Stay connected and track your fitness goals."}
            </p>

            
            {!inCartItem ? (
              
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-[#c8f400] hover:bg-[#b0d800] text-black font-semibold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer text-sm"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-2xl border border-gray-800 transition active:scale-95 cursor-pointer ${
                    isFavorite
                      ? "bg-red-500/20 border-red-500/50 text-red-500"
                      : "bg-black/40 text-gray-400 hover:text-white"
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            ) : (
              
              <div className="space-y-3 mb-6">
              
                <div className="border border-gray-800 bg-[#141414] rounded-xl p-3 flex justify-between items-center text-xs text-gray-300">
                  <span>In cart:</span>
                  <div className="flex items-center gap-4 bg-black border border-gray-800 px-4 py-1.5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => decreaseCount(product.id)}
                      className="text-gray-400 hover:text-white font-bold cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold text-white">{inCartItem.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseCount(product.id)}
                      className="text-gray-400 hover:text-white font-bold cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                
                <div className="flex gap-3">
                  <div className="flex-1 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 text-sm">
                    <Check size={18} /> Added to Cart
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-xl border border-gray-800 transition active:scale-95 cursor-pointer ${
                      isFavorite
                        ? "bg-red-500/20 border-red-500/50 text-red-500"
                        : "bg-black/40 text-gray-400 hover:text-white"
                    }`}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>

                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full bg-[#181818] hover:bg-[#222222] border border-gray-800 text-gray-300 py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  View Cart →
                </button>
              </div>
            )}

            
            <div className="grid grid-cols-3 gap-2 my-6">
              <div className="border border-gray-800 bg-[#141414] p-3 rounded-xl text-center">
                <Truck size={18} className="text-[#c8f400] mx-auto mb-1" />
                <p className="text-[11px] font-semibold">Free Delivery</p>
                <p className="text-[9px] text-gray-500">On orders $50+</p>
              </div>
              <div className="border border-gray-800 bg-[#141414] p-3 rounded-xl text-center">
                <ShieldCheck size={18} className="text-[#c8f400] mx-auto mb-1" />
                <p className="text-[11px] font-semibold">Secure Pay</p>
                <p className="text-[9px] text-gray-500">256-bit SSL</p>
              </div>
              <div className="border border-gray-800 bg-[#141414] p-3 rounded-xl text-center">
                <RotateCcw size={18} className="text-[#c8f400] mx-auto mb-1" />
                <p className="text-[11px] font-semibold">Easy Returns</p>
                <p className="text-[9px] text-gray-500">30-day policy</p>
              </div>
            </div>

            
            <div className="flex gap-4 mt-6">
              <button
                disabled={!prevProduct}
                onClick={() => prevProduct && navigate(`/products/${prevProduct.id}`)}
                className="flex-1 bg-[#222222] hover:bg-[#2a2a2a] disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 text-xs transition cursor-pointer"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <button
                disabled={!nextProduct}
                onClick={() => nextProduct && navigate(`/products/${nextProduct.id}`)}
                className="flex-1 bg-[#c8f400] hover:bg-[#b5dc00] disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 text-xs transition cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 5).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailCard
