import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {FaPowerOff} from 'react-icons/fa'

function LogOut() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const HandleClick = () => {
        setShowModal(true);
    }

    const confirmLogout = () => {
        sessionStorage.removeItem("chat-user")
        setShowModal(false);
        navigate("/login")
    }

    const cancelLogout = () => {
        setShowModal(false);
    }

    return (
        <>
            <button className='p-1 m-2 rounded-md text-white bg-red-600' onClick={HandleClick}>
                <FaPowerOff/>
            </button>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="mb-4 text-gray-900">Are you sure you want to log out?</p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={confirmLogout}>Yes, log out</button>
                        <button className="bg-gray-300 text-gray-900 px-4 py-2 rounded" onClick={cancelLogout}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default LogOut