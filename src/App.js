import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  const inputRef = useRef(null);

  // Auto-focus when component loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Mock API fetch
  useEffect(() => {
    setExpenses([
      { id: 1, title: "Groceries", amount: 300, category: "Food" },
      { id: 2, title: "Bus Pass", amount: 120, category: "Travel" },
    ]);
  }, []);

  // Add Expense
  const addExpense = useCallback(() => {
    if (!title.trim() || !amount.trim()) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setAmount("");
    inputRef.current.focus();
  }, [title, amount, category]);

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Total Amount
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <div className="total-card">
        <h2>Total Spent</h2>
        <p>₹{totalAmount}</p>
      </div>

      <div className="input-box">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button onClick={addExpense} className="add-btn">
          ➕ Add
        </button>
      </div>

      <ul className="expense-list">
        {expenses.map((exp) => (
          <li className="expense-card" key={exp.id}>
            <div>
              <h3>{exp.title}</h3>
              <p className="amount">₹{exp.amount}</p>
            </div>
            <span className={`tag ${exp.category.toLowerCase()}`}>
              {exp.category}
            </span>
            <button className="delete-btn" onClick={() => deleteExpense(exp.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
