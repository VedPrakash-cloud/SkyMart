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

  const fetchApi = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data);
    } catch (err) {
      console.error("Unable to get the response", err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <MyLoginStore.Provider value={{ currentUser, setCurrentUser, data, fetchApi, showPassword,setShowPassword,showConfirmPassword, setShowConfirmPassword }}>
      {children}
    </MyLoginStore.Provider>
  );
};
