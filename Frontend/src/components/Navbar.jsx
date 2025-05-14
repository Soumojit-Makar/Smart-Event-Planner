import React, { useContext } from 'react'
import { Link } from 'react-router'
import AuthContest from '../context/AuthContext'
import { isUserLoggedIn } from '../helper/Auth'
const Navbar = () => {
  const{ logout}=useContext(AuthContest)
  
  return (
    <nav className='flex justify-between p-3  align-baseline sticky w-full bg-linear-to-r from-purple-500 to-pink-500 text-white '>
      <h1 className='text-4xl sm:text-2xl  font-extralight'>Expense Tracker</h1>
      <div className='h-full  flex  align-middle justify-end  gap-2 w-1/2 md:w-2/3 '>
        <Link className='p-2' to={"/"} >Home</Link>
        {(isUserLoggedIn())?(
          <>
          <Link className='p-2' to={"/home"} >Expances</Link>
          <Link className='p-2' to={"/ai"}>Recommandation</Link>
          <button className='p-2' onClick={logout} >Logout</button>
          
          </>
        ):(
          <>
          
        <Link className='p-2' to={"/login"} >Login</Link>
        <Link className='p-2' to={"/register"} >Register</Link>
          </>
        )}
        
        
      </div>
      </nav>
  )
}

export default Navbar