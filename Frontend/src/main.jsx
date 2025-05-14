
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, Routes, Route } from "react-router"
import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import {ToastContainer} from 'react-toastify'
import AuthProvider from './context/AuthProvider.jsx'
import AIAnalysis from './pages/AIAnalysis.jsx'
createRoot(document.getElementById('root')).render(
  <div className='bg-linear-to-tr from-blue-400 to-red-200 h-[100vh]  overflow-auto'>
    <ToastContainer
      theme='colored'
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
    
    />
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes >
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/ai' element={<AIAnalysis/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </div>
)
