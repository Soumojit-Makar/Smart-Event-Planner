import React,{useState} from 'react'
import { registerUser } from '../services/Auth.service';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    salary: '',
    password: ''
  });
  const [loading,setLoading]=useState(false)
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    // console.log(formData)
    setLoading(true)
    registerUser(formData)
    .then((response)=>{
      console.log(response)
      toast.success("You are Successsfuly Registered");
    })
    .catch((err)=>{
      console.log(err)
      toast.error("You are not Registered ")
    })
    .finally(()=>{
      setLoading(false)
      clearData()
    })
    
  };
  const clearData=()=>{
    setFormData({
    fullname: '',
    email: '',
    salary: '',
    password: ''
  })
  }

  return (
    <div className='w-full flex justify-center items-center h-[100vh] '>
      <div className="p-8 bg-gradient-to-r from-pink-600 via-gray-400 to-indigo-600 text-white rounded-2xl shadow-lg max-w-[600px] w-full text-center border-b-[5px] border-t-[5px] border-blue-700">
        <h1 className="text-4xl font-extrabold mb-3">Smart Expense Tracker 💰</h1>
        <h2 className="text-2xl font-bold mb-3">Register</h2>
        <hr className='mb-4' />
         <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <input
            className='border p-3 rounded-md text-black'
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder='Enter Full Name'
            required
          />
          <input
            className='border p-3 rounded-md text-black'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
            required
          />
          <input
            className='border p-3 rounded-md text-black'
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder='Enter Salary'

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
              Register
            </button>
            <button
              onClick={clearData}
              type='reset'
              className='border border-red-600 text-red-600 px-6 py-2 rounded-2xl hover:bg-red-600 hover:text-white'
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register