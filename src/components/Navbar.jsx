import React, { useContext, useState } from "react";
import { Zap, ShoppingCart, LogOut, Logs } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { MyLoginStore } from "../context/AppStore";
import Cart from "../pages/Cart";
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser, setCurrentUser,fetchApi, setIsCartOpen, cartItem } = useContext(MyLoginStore);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    setCurrentUser(null);
    toast.error("User Logout successfully!")
  };
  return (
    <div>
      <Cart />
      <nav className="fixed top-0 z-1 w-full flex backdrop-blur-xl text-white items-center-safe justify-between p-5">
        <div onClick={()=>navigate("/")} className="flex cursor-pointer items-center-safe gap-2">
          <div className="bg-[#c8f400] p-2 rounded-xl">
            <Zap className="text-black" size={16} />
          </div>
          <h1 className="font-semibold">
            Sky<span className="text-[#c8f400]">Mart</span>
          </h1>
        </div>
        <div className="md:hidden">
          <Logs onClick={()=>{setShowMenu(true)
            setShowProfile(false)}} className={showMenu ? "hidden": "block"}/>
        </div>
        <div className="hidden md:flex gap-4 font-semibold">
          <NavLink to={"/"} className={({isActive})=> isActive ? "text-[#c8f400]" : "text-gray-400 hover:text-white"}>Home</NavLink>
          <NavLink to={"/products"} className={({isActive})=> isActive ? "text-[#c8f400]" : "text-gray-400 hover:text-white"}onClick={fetchApi}>Shop</NavLink>
          <NavLink to={"/about"} className={({isActive})=> isActive ? "text-[#c8f400]" : "text-gray-400 hover:text-white"}>About</NavLink>
        </div>

        {/* mobile menu */}

        <div className={`md:hidde bg-black/80 h-screen fixed top-0 right-0 ${showMenu ? "translate-x-0" : "translate-x-full"} p-5 w-[60%] transition-transform duration-500 ease-in-out`}>
          <p onClick={()=>setShowMenu(false)} className="text-right cursor-pointer font-bold text-xl">X</p>
          <div className="relative top-10 grid md:flex gap-4 font-semibold">
          <NavLink to={"/"} className={({isActive})=> isActive ? "text-[#c8f400]"  : "text-gray-400"}>Home</NavLink>
          <NavLink to={"/products"} className={({isActive})=> isActive ? "text-[#c8f400]" : "text-gray-400"}onClick={fetchApi}>Shop</NavLink>
          <NavLink to={"/about"} className={({isActive})=> isActive ? "text-[#c8f400]" : "text-gray-400"}>About</NavLink>
          <p onClick={()=>{setShowProfile(true)
            setShowMenu(false)}} className="text-gray-400">Profile</p>
        </div>
        </div>



        <div className="hidden md:flex gap-4 font-semibold items-center">
          <div className="flex gap-2 cursor-pointer border border-gray-200/50 rounded-xl px-3 py-1 bg-[#272727]">
            <span className="px-2 py-.5 bg-[#c8f400] text-xs/6 rounded-full">
              {currentUser?.avatar}
            </span>
            <span className="text-white capitalize">
              {currentUser?.UserName}
            </span>
          </div>
          <span
          className="relative flex gap-2 cursor-pointer items-center-safe border border-gray-200/50 rounded-xl p-2 text-white">
            <ShoppingCart size={18} onClick={()=>setIsCartOpen(true)}/>
              {cartItem.length > 0 ? <sup className="absolute right-0 top-0 px-1 py-1 bg-red-600 rounded-full text-xs/2 animate-pulse">{cartItem.length}</sup> : ""}
          </span>
          <span
            className="cursor-pointer active:scale-95 flex gap-2 items-center-safe border border-gray-200/50 rounded-xl p-2 text-white hover:bg-red-600/50 hover:border-red-500 transition-colors"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18}/>
          </span>
        </div>

        {/* mobile hamburger */}

        <div className={`fixed top-0 left-0 h-screen ${showProfile ? "translate-x-0": "-translate-x-full"} transition-transform duration-500 ease-in-out bg-black/80 backdrop-blur-lg p-5 w-[60%]`}>
        <p onClick={()=>setShowProfile(false)} className="text-right my-2 text-lg font-semibold">X</p>
          <div className="grid md:flex gap-4 font-semibold md:items-center">
          <div className="flex gap-2 cursor-pointer border border-gray-200/50 rounded-xl px-3 py-1 bg-[#272727]">
            <span className="px-2 py-.5 bg-[#c8f400] text-xs/6 rounded-full">
              {currentUser?.avatar}
            </span>
            <span className="text-white capitalize">
              {currentUser?.UserName}
            </span>
          </div>
          <span
          onClick={()=>{
              setIsCartOpen(true);
              setShowProfile(false);
            }}
          className="flex gap-2 cursor-pointer items-center-safe border border-gray-200/50 rounded-xl p-2 text-white">
            <ShoppingCart size={18}/>
            Cart
          </span>
          <span
            className="cursor-pointer active:scale-95 flex gap-2 items-center-safe border border-gray-200/50 rounded-xl p-2 text-white hover:bg-red-600/50 hover:border-red-500 transition-colors"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18}/>
            Logout
          </span>
        </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
