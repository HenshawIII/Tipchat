import {useLayoutEffect,createContext,useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const UserContext = createContext()



function UserProvider({children}) {

    const [user,setUser] = useState(true)
    const locate = useLocation()
    // axios.defaults.withCredentials = true,
    
    // useLayoutEffect(()=>{
    //     axios.get("http://localhost:8224/profile")
    //     .then((data)=>{
    //       // console.log(data)
    //       setUser(data.data.user)
    //     })
    // },[locate.pathname])

  return (
   <UserContext.Provider value={{user,setUser}}>
    {children}
   </UserContext.Provider>
  )
}

export{ UserProvider,UserContext}