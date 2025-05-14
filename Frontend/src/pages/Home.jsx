import React from 'react'
import ExpenseList from '../components/ExpenseList'

const Home = () => {
  return (
    <div className='flex justify-center items-center align-middle flex-col w-full h-[100vh] '>
      
        <ExpenseList/>
        
    </div>
  )
}

export default Home