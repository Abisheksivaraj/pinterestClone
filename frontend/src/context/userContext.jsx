import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user); // Optionally set user data if available
      setIsAuth(true); // Set auth state as true if login is successful
      setBtnLoading(false);
      navigate("/"); // Optionally navigate to dashboard after login
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setBtnLoading(false);
    }
  }

  return (
    <userContext.Provider value={{ user, isAuth, btnLoading, loginUser }}>
      {children}
      <Toaster />
    </userContext.Provider>
  );
};

export const UserData = () => useContext(userContext);
