import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MyLoginStore = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const active = localStorage.getItem("activeUser");
    return active ? JSON.parse(active) : null;
  });

  const [searchInput, setSearchInput] = useState("");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [isFeaturedOpen, setIsFeaturedOpen] = useState(false);
  const [selectedFeatured, setSelectedFeatured] = useState("Featured");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState(() => {
    const savedItem = localStorage.getItem("cart");
    return savedItem ? JSON.parse(savedItem) : [];
  });

  const fetchApi = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=50",
      );
      setData(response.data.products);
    } catch (err) {
      console.error("Unable to get the response", err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    setCartItem((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseCount = (id) => {
    setCartItem((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseCount = (id)=>{
    setCartItem((prev)=>
    prev.map((item)=>
    item.id === id ? {...item, quantity: item.quantity -1 }: item
  ).filter((item)=> item.quantity > 0)
)
  }

  const removeFromCart = (id)=>{
    setCartItem((prev)=> prev.filter((item)=> item.id !== id ))
  }


  const clearCart =()=>{
    setCartItem([]);
  }

  const handleCheckout =()=>{
    if(cartItem.length > 0){
      setCartItem([]);
      toast.success("Order placed successfully!!!")
    } else{
      toast.error("add some item to place order...")
    }
    
  }

  const grandTotal = cartItem.reduce((acc,item)=>acc+ item.price * item.quantity, 0).toFixed(2);


  const filteredList = data

    .filter((item) => {
      if (!selectedCategory || selectedCategory === "All Categories")
        return true;
      return item.category?.toLowerCase() === selectedCategory.toLowerCase();
    })

    .filter((item) => {
      if (!searchInput.trim()) return true;
      return Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchInput.toLowerCase().trim());
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

    const categoryList = filteredList.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []);

  return (
    <MyLoginStore.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchApi,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        searchInput,
        setSearchInput,
        filteredList,
        isCategoryOpen,
        setIsCategoryOpen,
        selectedCategory,
        setSelectedCategory,
        isFeaturedOpen,
        setIsFeaturedOpen,
        selectedFeatured,
        setSelectedFeatured,
        isCartOpen,
        setIsCartOpen,
        cartItem,
        setCartItem,
        addToCart,
        increaseCount,
        decreaseCount,
        removeFromCart,
        clearCart,
        grandTotal,
        categoryList,
        handleCheckout,
        
      }}
    >
      {children}
    </MyLoginStore.Provider>
  );
};
