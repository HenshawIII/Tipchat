import React,{useState,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import loader from './loader.gif'

function SetAvatar() {
  const [avatar,setAvatar] = useState([])
  const [loading,setLoading] = useState(true)
  const [selectedAvatar,setSelAvat] = useState(undefined)
  const navigate = useNavigate()
  const api = "https://robohash.org"

  const setProfilePic = async ()=>{
    console.log(selectedAvatar)
    
    if(selectedAvatar === undefined){
      toast.error("Please pick an Avatar")
    }else{
      const user = await JSON.parse(sessionStorage.getItem("chat-user"))
      axios.post(`http://localhost:8224/setavatar/${user.user._id}`,{
        image:avatar[selectedAvatar]
      })
      .then((data)=>{
        if(data.data.isSet){
          console.log(data)
          user.user.isAvatarSet = true;
          user.user.avatarImage = data.data.image;
          sessionStorage.setItem("chat-user",JSON.stringify(user));
          navigate("/")
        }else{
          toast.error("unable to add")
        }
      })
      .catch(e=>console.log(e))
    }
  } 

  useEffect(()=>{
    console.log(avatar)
  },[avatar])

  useEffect(()=>{ 
    if(!sessionStorage.getItem("chat-user")){
      navigate("/login")
    }
  },[])

  useEffect(()=>{
    if(JSON.parse(sessionStorage.getItem("chat-user")).user.avatarImg){
      navigate("/")
    }
  })

  useEffect(()=>{
    (async ()=>{
      try {
        const data = []
        for(let i=0;i < 4;i++){
          const randomId = Math.random().toString(36).substring(7);
          const avatarUrl = `${api}/${randomId}.svg?set=set${i+1}`;
          data.push(avatarUrl);
        }
        setAvatar(data)
        setLoading(false)
      } catch (error) {
        console.error("Error generating avatars:", error);
        toast.error("Failed to load avatars");
        setLoading(false)
      }
    })()
  },[])

  return (
    !loading?<div className='flex flex-col bg-slate-700 h-screen items-center justify-center gap-10'>
      <div>
        <h1 className='text-2xl text-white font-bold'>Pick an avatar as Profile Picture</h1>
      </div>
      <div className='flex flex-row gap-4'>
        {
          avatar.map((ava,index)=>{
            return (
              <div className={`w-24 h-24 ${selectedAvatar===index? "border-8 border-green-600 rounded-full ":""}`} key={index}>
                <img 
                  src={ava} 
                  alt='avatar' 
                  onClick={()=>{ setSelAvat(index)}}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )
          })
        }
      </div>
      <button className={`border-1 border-zinc-800 p-2 hover:scale-125 bg-slate-400 my-2 rounded-lg`} onClick={setProfilePic}>Select as Profile picture</button>
    </div>:<><img src={loader} alt="" /></>
  )
}

export default SetAvatar