import React from 'react'


function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh] bg-blue-300/70 rounded-lg shadow-lg '>
        <img src="../../public/robot.gif" alt="" />
        <h1 className='text-2xl font-bold '>Welcome {JSON.parse(sessionStorage.getItem("chat-user"))?.name}</h1>
        <p>Please Select a Chat to start messaging</p>
    </div>
  )
}

export default Welcome