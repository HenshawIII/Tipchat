

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Squares from '../Squares'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'


axios.defaults.withCredentials = true

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
            <Link to="/register" className="text-cyan-600 font-semibold hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}


function Register() {

  const [values,setValue] = useState({
    name: "",
  })
  const [image, setImage] = useState(""); // base64 image string
  const [showP,setShowP] = useState(false)
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false);

  console.log(address,isConnected)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    if (!isConnected) {
      toast.error("Please connect your wallet before submitting.");
      setLoading(false);
      return;
    }
    const { name } = values;
    if (!name || !image) {
      toast.error("Please fill in all fields and upload an image.");
      setLoading(false);
      return;
    }
    const payload = {
      name,
      image, // base64 string
      wallet: address,
    };
    await axios.post("http://localhost:8224/register", payload)
      .then(data => {
        if (data.data.error) {
          toast.error(data.data.error);
        } else {
          sessionStorage.setItem("chat-user", JSON.stringify(data.data.user));
          navigate("/chat");
        }
      });
    setValue({ name: "" });
    setImage("");
    setLoading(false);
  }


  return (
    <div className='bg-slate-900 relative flex h-screen items-center justify-center'>
      <div className='absolute top-0 left-0 w-full h-full inset-0 z-20'>
        <LoginNavbar />
      </div>
      <div className='absolute top-0 left-0 w-full h-full inset-0 '>
      <Squares 
speed={0.5} 
squareSize={40}
direction='right' // up, down, left, right, diagonal
borderColor='#1c3c9e'
hoverFillColor='#1c3c9e'
/>
</div>
         <div className='flex flex-col h-3/4 bg-transparent text-white w-full max-w-md rounded-xl p-4 items-center justify-center mx-auto z-50'>
            <div className='flex flex-col items-center mb-10'>
              <img className='w-32 mx-2 ' src="../../public/Tipc.png" alt="Loggo" onClick={()=>setShowP(p=>!p)} />
              <h1 className='text-3xl font-semibold'>TIPChat</h1>
            </div>
            <form className='flex flex-col z-50' onSubmit={e=>handleSubmit(e)}>
          
            <label htmlFor="name">Name</label>
            <input className="p-1 text-gray-900 rounded-md mb-5 " value={values.name} onChange={e=>setValue({...values,name:e.target.value})} type="text" placeholder='Enter your Name' id='name' />

            <label htmlFor="image">Profile Image(max 10MB)</label>
            <input className="p-1 text-gray-200 rounded-md mb-5 " type="file" accept="image/*" id="image" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                if (file.size > 20 * 1024 * 1024) {
                  toast.error("Image size must be less than 20MB");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }} />
            
           
            <input
  className='w-1/2 text-gray-900 rounded-md mx-auto mb-7 bg-lime-200'
  type="submit"
  value={loading ? "Submitting..." : "Submit"}
  disabled={loading}
/>
            </form>
         { image && <img className='w-1/2 text-gray-900 rounded-md mx-auto' src={image} alt="Loggo" />}
            <ConnectButton label="Connect Wallet" chainStatus="none"  />
         </div>
    </div>    
  )
}

export default Register