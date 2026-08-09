import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { MyLoginStore } from "../context/AppStore";
import { MoveRight, Package, Shield, Star, Tag, TrendingUp, Zap } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from "react-router";

const Home = () => {
  const now = new Date().getHours();
  const { currentUser, grandTotal, cartItem, categoryList } = useContext(MyLoginStore);
  const navigate = useNavigate()

  const greet = () => {
    if (now >= "5" && now < "12") {
      return <h1>good morning ☕</h1>;
    } else if (now >= "12" && now < "17") {
      return <h1>good afternoon 🌤️</h1>;
    } else {
      return <h1>good evening 🍹</h1>;
    }
  };
  const showMessage = greet();
  return (
    <div className="bg-[#0d0d0d] z-0 h-full overflow-hidden">
    <div className="relative top-20 h-full text-white px-5 py-5 border-b mb-20">

      
      {/* Hero area */}

      <div className="border rounded-3xl p-10 md:flex items-center-safe justify-between">
        <div className="flex flex-col md:w-[35%] mb-5">
          <span className="text-[#c8f400] uppercase text-sm">
            {showMessage}
          </span>
          <span className="font-semibold text-5xl mt-4">Welcome back,</span>
          <span className="text-[#c8f400] font-semibold mb-5 text-5xl capitalize">
            {currentUser?.UserName}!
          </span>
          <p className="text-gray-300/40 mb-5">
            Discover today's picks — hand-curated products across electronics,
            fashion, and more.
          </p>
          <div className="grid md:flex gap-5 items-center-safe">
            <button onClick={()=>navigate("/products")} className="capitalize flex gap-2 cursor-pointer active:scale-95 items-center-safe bg-[#c8f400] rounded-xl px-5 py-3 text-black font-semibold justify-center-safe">
              shop now <MoveRight />
            </button>
            <button onClick={()=>navigate("/products")} className="border border-gray-400/30 px-5 py-3 cursor-pointer active:scale-95 rounded-xl capitalize">
              view all products
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center-safe items-center-safe capitalize border border-[#c8f400]/20 p-5 rounded-2xl bg-[#c8f400]/20 mb-3">
            <h1 className="font-bold text-2xl text-[#c8f400]">20+</h1>
            <p className="text-gray-500/70 text-sm font-semibold">
              products available
            </p>
          </div>
          <div className="flex flex-col justify-center-safe items-center-safe capitalize border border-gray-400 p-5 rounded-2xl mb-3">
            <h1 className="font-bold text-2xl">free</h1>
            <p className="text-gray-500/70 text-sm font-semibold">
              Delivery on ₹999+
            </p>
          </div>
        </div>
      </div>

      {/* summary- cards */}

      <div className="grid md:flex items-center-safe md:justify-evenly gap-5 my-10">
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Package className="text-[#c8f400] rounded-2xl p-2 bg-[#c8f400]/20" size={42}/>
          <div>
            <span className="font-bold text-xl">{cartItem.length}</span>
            <h4 className="capitalize text-gray-300/70 text-sm">cart items</h4>
            <p className="text-gray-400/40 text-xs">in your bag</p>
          </div>
        </div>
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <TrendingUp className="text-[#5fa5fa] rounded-2xl p-2 bg-[#5fa5fa]/20" size={42}/>
          <div>
            <span className="font-bold text-xl">${grandTotal}</span>
            <h4 className="capitalize text-gray-300/70 text-sm">cart value</h4>
            <p className="text-gray-400/40 text-xs">ready to checkout</p>
          </div>
        </div>
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Star className="text-[#fbbf24] rounded-2xl p-2 bg-[#fbbf24]/20" size={42}/>
          <div>
            <span className="font-bold text-xl">5</span>
            <h4 className="capitalize text-gray-300/70 text-sm">top products</h4>
            <p className="text-gray-400/40 text-xs">highly rated</p>
          </div>
        </div>
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Tag className="text-[#c084fc] rounded-2xl p-2 bg-[#c084fc]/20" size={42}/>
          <div>
            <span className="font-bold text-xl">{categoryList.length}</span>
            <h4 className="capitalize text-gray-300/70 text-sm">categories</h4>
            <p className="text-gray-400/40 text-xs">to explore</p>
          </div>
        </div>
      </div>

      {/* footer-cards */}

      <div className="grid md:flex md:items-center-safe md:justify-evenly gap-5 my-10">
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Zap className="text-[#c8f400]"/>
          <div>
            <h4 className="capitalize text-gray-300/70 text-sm">fast delivery</h4>
            <p className="text-gray-400/40 text-xs">sam-day on select items</p>
          </div>
        </div>
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Shield className="text-[#5fa5fa]"/>
          <div>
            <h4 className="capitalize text-gray-300/70 text-sm">secure payments</h4>
            <p className="text-gray-400/40 text-xs">100% encrypted checkouts</p>
          </div>
        </div>
        <div className="flex gap-5 justify-self-start border w-full p-5 rounded-2xl">
          <Tag className="text-[#4ade80]"/>
          <div>
            <h4 className="capitalize text-gray-300/70 text-sm">best prices</h4>
            <p className="text-gray-400/40 text-xs">price-match guarantee</p>
          </div>
        </div>
      </div>

      </div>
      {/* footer area */}

      <Footer />
    </div>
  );
};

export default Home;
