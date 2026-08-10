import React, { useContext } from "react";
import { MyLoginStore } from "../context/AppStore";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { ChevronDown, Search, X } from "lucide-react";
import { useNavigate } from "react-router";


const Products = () => {
  const {
    filteredList,
    searchInput,
    selectedCategory,
    setSelectedCategory,
    setSearchInput,
    isCategoryOpen,
    setIsCategoryOpen,
    selectedFeatured,
    setSelectedFeatured,
    isFeaturedOpen,
    setIsFeaturedOpen,
    categoryList,
  } = useContext(MyLoginStore);

  const navigate = useNavigate();

  const handleInputClear = () => {
    setSearchInput("");
  };

  const handleCategoryClear = () => {
    setSelectedCategory("All Categories");
  };

  const handleFeaturedClear = () => {
    setSelectedFeatured("Featured");
  };

  const handleAllClear = () => {
    setSearchInput("");
    setSelectedCategory("All Categories");
    setSelectedFeatured("Featured");
  };

  const featuredOptions = [
    "Featured",
    "Price: Low → High",
    "Price: High → Low",
    "Top Rated",
    "Lowest Rated",
  ];

  const displayedProducts = filteredList
    .filter((item) => {
      if (!selectedCategory || selectedCategory === "All Categories")
        return true;
      return item.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .slice()
    .sort((a, b) => {
      if (selectedFeatured === "Price: Low → High") return a.price - b.price;
      if (selectedFeatured === "Price: High → Low") return b.price - a.price;
      if (selectedFeatured === "Top Rated")
        return (b.rating || 0) - (a.rating || 0);
      if (selectedFeatured === "Lowest Rated")
        return (a.rating || 0) - (b.rating || 0);
      return 0;
    });

  const isAnyFilterActive =
    searchInput ||
    selectedCategory !== "All Categories" ||
    selectedFeatured !== "Featured";

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white py-10">
      <div className="border-b border-b-gray-800/50 py-16 md:px-10">
        {/* Results Header */}
        <h1 className="text-5xl font-semibold">All Products</h1>
        <div className="flex items-baseline gap-1.5 mb-10">
          <p className="text-gray-400 text-sm">
            {displayedProducts?.length || 0} products found
          </p>
          {selectedCategory !== "All Categories" && (
            <p className="text-sm">
              in{" "}
              <span className="text-[#c8f400] font-medium capitalize">
                {selectedCategory}
              </span>
            </p>
          )}
        </div>

        {/* Main Filter Bar */}
        <div className="border border-gray-700/50 rounded-2xl bg-[#111111] p-4 mb-10">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="flex items-center gap-3 border border-gray-700 w-full rounded-full px-5 py-2.5 bg-[#1a1a1a] focus-within:border-[#c8f400]/50 transition">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none bg-transparent text-sm placeholder:text-gray-600"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              {/* 1. Category Dropdown */}
              <div className="relative text-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsFeaturedOpen(false);
                  }}
                  className={`flex items-center justify-between gap-3 px-5 py-2.5 rounded-full border border-gray-700 bg-[#1a1a1a] text-sm cursor-pointer transition ${
                    selectedCategory !== "All Categories"
                      ? "border-[#c8f400] text-[#c8f400]"
                      : "text-white"
                  }`}
                >
                  <span className="font-medium">{selectedCategory}</span>
                  <ChevronDown
                    size={16}
                    className={
                      selectedCategory !== "All Categories"
                        ? "text-[#c8f400]"
                        : "text-gray-500"
                    }
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 py-2 overflow-hidden">
                    {["All Categories", ...categoryList].map((item, idx) => {
                      const isSelected = selectedCategory === item;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedCategory(item);
                            setIsCategoryOpen(false);
                          }}
                          className={`px-5 py-2 text-sm cursor-pointer ${
                            isSelected
                              ? "bg-[#252525] text-[#c8f400]"
                              : "text-gray-300 hover:bg-[#252525] hover:text-white"
                          }`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. Featured Dropdown */}
              <div className="relative text-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    setIsFeaturedOpen(!isFeaturedOpen);
                    setIsCategoryOpen(false);
                  }}
                  className={`flex items-center justify-between gap-3 px-5 py-2.5 rounded-full border border-gray-700 bg-[#1a1a1a] text-sm cursor-pointer transition ${
                    selectedFeatured !== "Featured"
                      ? "border-[#c8f400] text-[#c8f400]"
                      : "text-white"
                  }`}
                >
                  <span className="font-medium">{selectedFeatured}</span>
                  <ChevronDown
                    size={16}
                    className={
                      selectedFeatured !== "Featured"
                        ? "text-[#c8f400]"
                        : "text-gray-500"
                    }
                  />
                </button>

                {isFeaturedOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl z-50 py-2 overflow-hidden">
                    {featuredOptions.map((item, idx) => {
                      const isSelected = selectedFeatured === item;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedFeatured(item);
                            setIsFeaturedOpen(false);
                          }}
                          className={`px-5 py-2 text-sm cursor-pointer ${
                            isSelected
                              ? "bg-[#252525] text-[#c8f400]"
                              : "text-gray-300 hover:bg-[#252525] hover:text-white"
                          }`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clear All Button */}
              {isAnyFilterActive && (
                <button
                  onClick={handleAllClear}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-red-500 bg-red-950/30 border border-red-800 hover:bg-red-950/50 transition text-sm cursor-pointer"
                >
                  <X size={16} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Tags */}
          {isAnyFilterActive && (
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-800 mt-4 pt-4">
              {selectedCategory !== "All Categories" && (
                <span className="flex items-center gap-1.5 text-[#c8f400] text-xs font-medium bg-[#c8f400]/10 px-3 py-1 rounded-full border border-[#c8f400]/20">
                  {selectedCategory}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={handleCategoryClear}
                  />
                </span>
              )}
              {selectedFeatured !== "Featured" && (
                <span className="flex items-center gap-1.5 text-[#c8f400] text-xs font-medium bg-[#c8f400]/10 px-3 py-1 rounded-full border border-[#c8f400]/20">
                  {selectedFeatured}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={handleFeaturedClear}
                  />
                </span>
              )}
              {searchInput && (
                <span className="flex items-center gap-1.5 text-[#c8f400] text-xs font-medium bg-[#c8f400]/10 px-3 py-1 rounded-full border border-[#c8f400]/20">
                  "{searchInput}"
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={handleInputClear}
                  />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((item) => (
              <div key={item.id} className="cursor-pointer" onClick={()=>{
                navigate(`/products/${item.id}`)
                }}>
                <ProductCard product={item} />
              </div>
            ))
          ) : (
            <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-20 text-center border border-gray-800 rounded-2xl bg-[#111111]">
              <Search size={48} className="text-gray-700 mb-4" />
              <h1 className="text-gray-500 text-xl font-semibold">
                No products found
              </h1>
              <p className="text-gray-600 text-sm mt-1 mb-5">
                {searchInput
                  ? `No results for "${searchInput}"`
                  : "Try adjusting your filters"}
              </p>
              <button
                className="border border-gray-700 px-5 py-2 text-gray-400 text-sm rounded-full cursor-pointer hover:border-gray-600 hover:text-white transition"
                onClick={handleAllClear}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
