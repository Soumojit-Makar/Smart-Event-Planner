import React, { useContext, useState } from 'react';
import AuthContest from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/Auth.service';
import { toast } from 'react-toastify';

function Login() {
  const redirect=useNavigate();
  const {login}=useContext(AuthContest);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading,setLoading]=useState(false);
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true);
    // console.log(formData)
    loginUser(formData)
    .then((response)=>{
      console.log(response)
      login(response.data)
      toast.success("You are successfully Logging")
      redirect("/home")

    })
    .catch((err)=>{
      // console.log(err)
      toast.error(err.response.data.detail)
    })
    .finally(()=>{
      setLoading(false)
      clearData()
    })


  }
  const clearData = () => {
    setFormData({
        username: "",
        password: "",
    });
    }
  return (
    <div className='w-full flex justify-center items-center h-[100vh] '>
      <div className="p-8 bg-gradient-to-r from-pink-600 via-gray-400 to-indigo-600 text-white rounded-2xl shadow-lg max-w-[600px] w-full text-center border-b-[5px] border-t-[5px] border-blue-700">
        <h1 className="text-4xl font-extrabold mb-3">Smart Expense Tracker 💰</h1>
        <h2 className="text-2xl font-bold mb-3">Login</h2>
        <hr className='mb-4' />
        <form method="post" onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <input
            className='border p-3 rounded-md text-black'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='Enter Username'
            required
          />
          <input
            className='border p-3 rounded-md text-black'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter Password'
            required
          />
          <div className='flex justify-around mt-4'>
            <button
              disabled={loading}
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl font-semibold'
            >
              
              Login
            </button>
            <button
              type='reset'
              onClick={clearData}
              className='border border-red-600 text-red-600 px-6 py-2 rounded-2xl hover:bg-red-600 hover:text-white'
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
