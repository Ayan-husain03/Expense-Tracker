import React, { useState } from "react";
import { motion } from "motion/react";
import Input from "./Input";
import { api } from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function AddExpense() {
  const [formData, setFormData] = useState({
    amount: "",
    title: "",
    category: "",
    type: "expense",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, title, category, type, date } = formData;

    if (!amount || !title || !category || !type || !date) {
      return Swal.fire({
        icon: "error",
        title: "All fields are required",
      });
    }

    try {
      const res = await api.post("/expense", formData);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Expense Added Successfully",
      }).then(() => navigate("/"));
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add expense",
      });
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center shadow-2xl">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Expense
        </h2>

        <Input
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Input
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Input
          label="Category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Type selection as select */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Date Field */}
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition mt-4"
          type="submit"
        >
          Add Expense
        </motion.button>
      </motion.form>
    </div>
  );
}

export default AddExpense;
