import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const inputRef = useRef(null);

  // Auto-focus when component loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Fetch mock API data on first load
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1") // mock API
      .then((res) => res.json())
      .then(() =>
        setExpenses([
          { id: 1, title: "Groceries", amount: 300 },
          { id: 2, title: "Mobile Recharge", amount: 199 },
        ])
      );
  }, []);

  // Add Expense Handler (useCallback)
  const addExpense = useCallback(() => {
    if (!title.trim() || !amount.trim()) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setTitle("");
    setAmount("");
    inputRef.current.focus();
  }, [title, amount]);

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Total using useMemo (optimized)
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="input-box">
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense title"
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <button onClick={addExpense}>Add</button>
      </div>

      <h2>Total: ₹{totalAmount}</h2>

      <ul className="expense-list">
        {expenses.map((exp) => (
          <li key={exp.id}>
            <span>
              {exp.title} — <strong>₹{exp.amount}</strong>
            </span>
            <button className="delete" onClick={() => deleteExpense(exp.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
