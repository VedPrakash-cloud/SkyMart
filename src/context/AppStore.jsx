import axios from "axios";
import { createContext, useEffect, useState } from "react";

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

  const fetchApi = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
    } catch (err) {
      console.error("Unable to get the response", err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  console.log(searchInput)

  const filteredList = data.filter((val) => {
    if (!searchInput.trim().toLowerCase()) return true;

    return Object.values(val)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  });

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
        setSearchInput,
        searchInput,
        filteredList,
      }}
    >
      {children}
    </MyLoginStore.Provider>
  );
};
