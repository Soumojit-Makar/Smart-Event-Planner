import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full flex justify-center align-middle h-[100vh]  '>
      <div className=" p-8 bg-gradient-to-r to-indigo-500 via-gray-400-500 from-pink-500 text-white rounded-2xl shadow-lg  max-w-[800px] self-center  text-center">
       <h1 className="text-4xl font-extrabold mb-3">Welcome to Smart Expense Tracker 💰</h1>
        <p className="text-lg mb-2">Track your expenses, manage your budget, and gain insights with ease.</p>
        <p className="text-lg font-medium">Now with <span class="">AI-powered recommendations</span> to help you save smarter! 🤖</p>
    </div>
    </div>
  )
}

export default Welcome