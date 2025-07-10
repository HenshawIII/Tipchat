import React,{useEffect, useState,useRef} from 'react'
import LogOut from '../LogOut.jsx'
import ChatInput from './ChatInput.jsx'
import Messages from './Messages.jsx'
import axios from 'axios'
import {useWalletClient} from 'wagmi'
import { parseEther } from 'viem'
// import { Address } from 'viem'

function ChatBox({cuurentChat,socket}) {

    const [messages,setMessages]= useState([])
    const [arrivalMsg,setArrivalMsg] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState("")
    const [sending, setSending] = useState(false)
    const [error, setError] = useState("")
    const User = JSON.parse(sessionStorage.getItem("chat-user"))
    const scrollRef = useRef(null)
    const {data:walletClient} = useWalletClient()

    useEffect(()=>{
      (async()=>{
       await axios.post(import.meta.env.VITE_BACKEND_URL + '/getallmess',{
          from:User._id,
          to:cuurentChat._id
        })
        .then(data=>{
          console.log(data)
          setMessages(data.data.projMess)
          })
      })()
    },[cuurentChat])

    const handleSendMsg = async(msg)=>{
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/addmessage",{
        from:User._id,
        to:cuurentChat._id,
        message:msg
      })
      socket.current.emit("send-message",{
        to:cuurentChat._id,
        from:User._id,
        message:msg
      })

      const msgs = [...messages]
      msgs.push({fromSelf:true,message:msg})
      setMessages(msgs)
    }

    useEffect(()=>{
     if(socket.current){
      socket.current.on("receive-message",(msg)=>{
        setArrivalMsg({fromSelf:false,message:msg})
      })
     }
    },[])

    useEffect(()=>{
      arrivalMsg && setMessages((prev)=>[...prev,arrivalMsg])
    },[arrivalMsg])

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    const handleSendEth = async(amountToSend)=>{
      setSending(true)
      setError("")
      try {
        const tx = await walletClient.sendTransaction({
          to:cuurentChat.wallet,
          value:parseEther(amountToSend)
        })
        // console.log(tx.hash)
        if (tx ) {
          const etherscanUrl = `https://etherscan.io/tx/${tx}`;
          const message = `I just sent you some ETH! View on ${etherscanUrl}`;
          handleSendMsg(message);
        }
        setShowModal(false)
        setAmount("")
      } catch (e) {
        setError("Failed to send ETH")
      }
      setSending(false)
    }

    return (
      <>
        <div className="flex flex-col h-[100vh] bg-blue-300/70 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-row justify-between p-4 bg-white/20">
            <div className="flex flex-row items-center gap-2">
              <h1 className='text-3xl hidden md:block font-bold'>{cuurentChat.name}</h1>
              <img src={`${cuurentChat.image}`} alt="" className="w-10 hidden md:block h-10 rounded-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <button className='p-1 m-2 rounded-md text-white bg-lime-500' onClick={()=>setShowModal(true)}>
                Send Eth
              </button>
             
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-white/5">
            {messages.length >0 ? messages.map((mess, i) => (
              <div className={`flex flex-row items-end ${mess.fromSelf ? "flex-row-reverse" : ""}`}>
                <img
                  src={`${mess.fromSelf ? User.image : cuurentChat.image}`}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover mx-2"
                />
                <div
                  key={i}
                  ref={scrollRef}
                  className={`w-fit max-w-[70%] px-4 py-2 rounded-lg shadow-md break-words ${mess.fromSelf ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 text-gray-900"}`}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {mess.message}
                </div>
              </div>
            )): <div className='text-center text-gray-500 flex justify-center items-center h-full'>Send a message to start the conversation</div>}
          </div>
          <div className="p-4 bg-white/20 sticky bottom-0">
            <ChatInput handleSendMsg={handleSendMsg} cuurentChat={cuurentChat}/>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-md text-center">
                <p className="mb-4 text-gray-900">Send ETH to <span className="font-bold">{cuurentChat.name}</span> at <span className="font-bold">{cuurentChat.wallet}</span></p>
                <input
                  className="p-2 border rounded mb-4 w-full"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Amount in ETH"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  disabled={sending}
                />
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <div className="flex justify-center gap-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={()=>handleSendEth(amount)} disabled={sending || !amount}>
                    {sending ? "Sending..." : "Send"}
                  </button>
                  <button className="bg-gray-300 text-gray-900 px-4 py-2 rounded" onClick={()=>setShowModal(false)} disabled={sending}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
}

export default ChatBox