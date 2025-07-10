import { useState , useContext, useEffect,useRef} from 'react'
import { UserContext } from './UserContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Welcome from './Pages/Welcome.jsx'
import ChatBox from './Pages/ChatBox.jsx'
import {io} from "socket.io-client"
import { useAccount } from 'wagmi'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logout from './LogOut.jsx'

function App() {
  const [users, setUsers] = useState([])
  const [selcha,setSelcha] = useState(null)
  const [cuurentChat,setCurrentChat] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const socket = useRef()
  const { address, isConnected } = useAccount()
  const [search, setSearch] = useState("");

  let User = JSON.parse(sessionStorage.getItem("chat-user"))

  useEffect(()=>{
    if(!sessionStorage.getItem("chat-user")){
      navigate("/login")
    }
  })

  useEffect(()=>{
    if(sessionStorage.getItem("chat-user")){
      socket.current = io(import.meta.env.VITE_BACKEND_URL)
      socket.current.emit("add-user",User?._id)
    }
  },[])

  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + `/getusers/${User?._id}`)
    .then(dat=>{
      setUsers(dat)
  })},[])

  return (
    <>
    <div className='grid grid-cols-3 h-screen'>
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow-lg"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={24} />
      </button>
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-200/70 shadow-lg z-50 transform transition-transform duration-300 md:static md:col-span-1 md:w-auto  md:shadow-none md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex md:hidden justify-end p-4">
          <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <FaTimes size={24} />
          </button>
        </div>
        <div className='flex flex-col gap-3 mt-3 mb-3 ml-2'>
          <div className='flex flex-row items-center justify-start gap-0 mb-10'>
            <img className='w-32 p-0 m-0' src="../../public/TipC.png" alt="Loggo"  />
            <h1 className='text-3xl m-0 p-0 text-cyan-700 font-extrabold'>TIPChat</h1>
           <div className='absolute top-0 right-0'>
            <Logout/>
           </div>
            
          </div>
          {/* Search bar */}
          <input
            type="text"
            className="mb-4 p-2 border w-11/12 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {(users && users.data && users.data.users) ? (
            <div className='flex flex-col h-4/6 overflow-auto'>
              {users.data.users
                .filter(user => !search ? true : user?.name?.toLowerCase().includes(search.toLowerCase()))
                .map((user,i)=>{
                  return (
                    <div
                      onClick={() => {
                        setCurrentChat(user)
                        setSelcha(i)
                        setSidebarOpen(false) // close sidebar on mobile after selecting
                      }}
                      key={i}
                      className={`flex flex-row p-2 hover:bg-slate-100 transition rounded-md duration-150 ease-out items-center gap-2 ${selcha === i? "border-1 border-emerald-800 bg-slate-300":""}`}
                    >
                      <img className=' w-16 rounded-full'  src={`${user?.image}`} alt="Bitv" />
                      <p>{user?.name}</p>
                    </div>
                  )
                })}
               
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500 font-semibold text-lg">
              Loading users...
            </div>
          )}
          {User ? (
            <Link to='/profile' className='w-10 flex fixed bottom-0 left-2 flex-row gap-2 mt-6  '>
              {/* <p className='py-2 pl-2'>Welcomee</p> */}
              <p className=' py-2 font-bold text-lg'>Profile</p>
              <img src={`${User?.image}`} alt="d" />
            </Link>

          ) : <p>Out</p>}
        </div>
      </div>
      {/* Main chat area */}
      <div className='col-span-3 md:col-span-2'>
        {!(selcha === null)? <ChatBox cuurentChat={cuurentChat} socket={socket}/>:<Welcome/> }
      </div>
    </div>
    </>
  )
}

export default App
