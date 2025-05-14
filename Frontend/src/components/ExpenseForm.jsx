import React, { useState } from 'react'
import { createExpense } from '../services/Expense.service';
import { toast } from 'react-toastify';

function ExpenseForm({ addExpense }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "General",
  });
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    createExpense(formData)
    .then((res)=>{
      console.log(res.data)
      toast.success("Successfully Expense Add");
      addExpense(res.data)

    })
    .catch((err)=>{
      console.log(err)
      toast.error("Expense not Add");
    })
    .finally(()=>{
      setLoading(false);
    })
    // addExpense(formData); 
    
  };

  const clearData = () => {
    setFormData({
      title: "",
      amount: 0,
      category: "General",
    });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-pink-600 via-gray-400 to-indigo-600 text-white rounded-2xl shadow-lg max-w-[600px] w-full text-center border-b-[5px] border-t-[5px] border-blue-700">
      <h2 className="text-2xl font-bold mb-3">Add Expense</h2>
      <hr className="mb-4" />
      <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex justify-around gap-2">
          <input
            className="border p-3 rounded-md text-black w-2/3"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            required
          />
          <input
            className="border p-3 rounded-md text-black w-1/3"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
          />
        </div>
        <select
          className="text-black p-2 rounded-md border"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="General">General</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
        <div className="flex justify-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl font-semibold"
          >
            Add
          </button>
          <button
          disabled={loading}
            onClick={clearData}
            type="reset"
            className="border border-red-600 text-red-600 px-6 py-2 rounded-2xl hover:bg-red-600 hover:text-white"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
