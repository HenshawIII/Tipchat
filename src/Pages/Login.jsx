import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Squares from '../Squares'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import logo from '../../public/TipC.png'

function Login() {
  const [name, setName] = useState("");
  const [showP, setShowP] = useState(false);
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);


  function LoginNavbar() {
    const user = JSON.parse(sessionStorage.getItem('chat-user'));
    return (
      <nav className="w-full bg-transparent fixed top-0 left-0 px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-cyan-600">TIPChat</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/chat" className="text-cyan-600 font-semibold hover:underline">Chat</Link>
          ) : (
            <>
              <Link to="/login" className="text-cyan-600 font-semibold hover:underline">Login</Link>
              <Link to="/register" className="text-white font-semibold hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isConnected) {
        toast.error("Please connect your wallet before submitting.");
        setLoading(false);
        return;
      }
      if (!name) {
        toast.error("Please enter your name.");
        setLoading(false);
        return;
      }
      const payload = {
        name,
        wallet: address,
      };
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/login", payload);
      const data = response.data;
      if (data.error) {
        toast.error(data.error);
      } else if (data.user) {
        sessionStorage.setItem("chat-user", JSON.stringify(data.user));
        navigate("/chat");
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Network error or server unavailable. Please try again later.");
      }
    }
    setName("");
    setLoading(false);
  }

  return (
    <div className='bg-slate-900 relative flex h-screen items-center justify-center'>
      <LoginNavbar />
      <div className='absolute top-0 left-0 w-full h-full inset-0'>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='right'
          borderColor='#1c3c9e'
          hoverFillColor='#1c3c9e'
        />
      </div>
      <div className='flex flex-col h-3/4 bg-transparent text-white w-full max-w-md rounded-xl p-4 items-center justify-center mx-auto z-10'>
        <div className='flex flex-col items-center mb-10'>
          <img className='w-32 mx-2 ' src={logo} alt="Loggo" onClick={() => setShowP(p => !p)} />
          <h1 className='text-3xl font-semibold'>TIPChat</h1>
        </div>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input className="p-1 text-gray-900 rounded-md mb-5 " value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Enter your Name' id='name' />
          <input
            className='w-1/2 text-gray-900 rounded-md mx-auto mb-7 bg-lime-200'
            type="submit"
            value={loading ? "Submitting..." : "Submit"}
            disabled={loading}
          />
        </form>
        <ConnectButton label="Connect Wallet" chainStatus="none" />
      </div>
    </div>
  )
}

export default Login