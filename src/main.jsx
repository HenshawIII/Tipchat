import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import {Link , BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx';
import Chat from './Pages/Chat.jsx';
import './index.css'
import {Toaster} from 'react-hot-toast'
import { UserProvider } from './UserContext.jsx';
import SetAvatar from './Pages/SetAvatars.jsx';
import Upload from './Pages/Upload.jsx';
import EthProvider from './EthProv.tsx'
import Profile from './Pages/Profile..jsx'
import Landing from './Pages/Landing.jsx'





const Main = () =>{
  return (
    <BrowserRouter>
    <EthProvider>
    <UserProvider>
    
    <Toaster position='top-right'  toastOptions={{duration:3000,pauseOnHover:true,autoClose:5000,theme:"dark"}} />
   <Routes>
           <Route path='/' element={<Landing/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/register' element={<Register/>}/>
           <Route path='/chat' element={<App/>}/>
           <Route path='/setavatar' element={<SetAvatar/>}/>
           <Route path='/upload' element={<Upload/>}/>
           <Route path='/profile' element={<Profile/>}/>
    
    </Routes> 
    </UserProvider>
    </EthProvider>
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
