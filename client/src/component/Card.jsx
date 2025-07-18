import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { motion } from "motion/react";

function Card() {
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    async function getExpense() {
      try {
        const res = await api.get("/expense", {
          withCredentials: true,
        });
        console.log(res?.data?.data);
        setExpense(res.data?.data || []);
      } catch (error) {
        console.error("error", error);
      }
    }
    getExpense();
  }, []);
  return (
    <motion.div
      className="max-w-4xl mx-auto p-4"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Your Expenses</h2>
      {expense.length === 0 ? (
        <p className="text-center text-gray-600">No expenses found.</p>
      ) : (
        <div className="space-y-4">
          {expense.map((expense) => (
            <motion.div
              key={expense._id}
              className="p-4 shadow-xl rounded-xl bg-white flex justify-between items-center"
              whileHover={{
                scale: 0.97,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div>
                <h3 className="text-lg font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-500">{expense.category}</p>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`font-bold ${
                  expense.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {expense.type === "income" ? "+" : "-"} ₹{expense.amount}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Card;
