import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  axios.defaults.baseURL = "http://localhost:4000";

  const navigate = useNavigate();
  const login = async (data) => {
    try {
      const result = await axios.post("/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken, error: null });
      navigate("/");
    } catch (error) {
      setState({ ...state, error: "Invalid credentials" });
      // Handle other error scenarios as needed
    }
  };
  
  const register = async (data) => {
    try {
      await axios.post("/auth/register", data);
      navigate("/login");
    } catch (error) {
      setState({ ...state, error: "Registration failed" });
      // Handle other error scenarios as needed
    }
  };
  

  const logout = async () => {
    // 🐨 Todo: Exercise #7
    //  ให้เขียน Logic ของ Function `logout` ตรงนี้
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };