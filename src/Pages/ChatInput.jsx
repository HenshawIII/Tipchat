import React,{useState,useEffect,useRef} from 'react'
import EmojiPicker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

function ChatInput({handleSendMsg,cuurentChat}) {
    const [showEMoji,setShowEmoj] = useState(false)
    const [msg,setMsg] = useState("")
    const pickerRef = useRef(null)

    useEffect(()=>{
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowEmoj(false);
            }
        };
        if (showEMoji) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[showEMoji])

    const handleEmojiPicker = ()=>{
        setShowEmoj(emoj=>!emoj)
    }

    const handleEmojiClic =(emoji,event)=>{
            let msgs = msg
            msgs += emoji.emoji
            setMsg(msgs)
    }

    const sendChat = (e)=>{
        e.preventDefault()
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg("")
        }
    }

  return (
    <div>
    <div className='flex flex-row items-center'>
        <div id='pick' className='picker p-2' ref={pickerRef}>
            <BsEmojiSmileFill className='picker' onClick={handleEmojiPicker}/>
            {showEMoji && <div id='picks'><EmojiPicker className='emoji-picker-react' onEmojiClick={handleEmojiClic}/></div>}
        </div>
        <form  className='relative flex-grow ml-1 mr-0 items-center gap-0' onSubmit={e=>sendChat(e)}>
            <input value={msg} onChange={e=>setMsg(e.target.value)} className='p-1 border-2 border-slate-700 rounded-md w-[95%] mx-auto ' placeholder='Type your messages here' type="text" />
                <div className='absolute right-[5%] px-2 hover:p-3 hover:top-[-5%] hover:rounded-md  hover:bg-slate-100 top-[30%] text-lime-300'>
                    <IoMdSend onClick={sendChat} type='submit' className='scale-150'/>
                </div>
    
        </form>
        
    </div>
    </div>
  )
}

export default ChatInput