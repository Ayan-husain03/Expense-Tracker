import React, { useState } from "react";
import { motion } from "motion/react";
import Input from "../component/Input";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import Swal from "sweetalert2";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return alert("All fields are required");

    try {
      const res = await api.post("/auth/login", formData);
      // console.log(res);
      // console.log(res?.data?.data?.token);

      setFormData({
        email: "",
        password: "",
      });
      dispatch(
        setUser({
          user: res?.data?.data?.user,
        })
      );
      return Swal.fire({
        icon: "success",
        title: res.data?.message || "success",
      }).then(() => navigate("/"));
    } catch (error) {
      console.error("error in Login", error);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "something went wrong",
      });
    }
  };
  return (
    <div className="min-h-dvh flex items-center justify-center shadow-2xl px-4">
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <Input
            label="Email"
            name="email"
            placeholder="abc123@gmail.com"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition"
            type="submit"
          >
            Login
          </motion.button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
