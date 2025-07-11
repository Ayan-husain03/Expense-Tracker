import React from "react";
import Input from "../component/Input";
import { motion } from "framer-motion";
import { useState } from "react";

import { api } from "../api/axios";

function Register() {
  const [formData, setFormDate] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDate({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      console.log(res.data);
      setMessage(res.data.message);
      setFormDate({
        fullname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error while register", error);
      setMessage(error?.message || "something went wrong");
      setFormDate({
        fullname: "",
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 p-4">
      <motion.form
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-sm sm:max-w-md"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-semibold mb-5 text-center text-gray-800">
          Create Account
        </h2>
        {message && <p className="text-red-500 text-center">{message}</p>}

        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter a strong password"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 rounded-lg transition duration-300 flex items-center justify-center`}
        >
          {loading && (
            <svg
              className="mr-3 w-5 h-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Processing..." : "Register"}
        </button>
        <div className="text-center my-5">
          <p>
            Already have an account? <a className="text-blue-700" href="">sign in</a>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

export default Register;
