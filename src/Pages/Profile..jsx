import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { useBalance } from 'wagmi'
import { parseEther } from 'viem'

function Profile() {
  const user = JSON.parse(sessionStorage.getItem('chat-user'));
  const [image, setImage] = useState(user.image || "");
  const [preview, setPreview] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useBalance({
    address: user.wallet,
  });
  // console.log(balance)
  // useEffect(() => {
  //   console.log(parseEther(balance.formatted))
  // }, [balance])
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      // Replace with your actual API endpoint
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + `/update-image/${user._id}`, { image });
      if (res.data && res.data.success) {
        setSuccess("Image updated successfully!");
        // Optionally update sessionStorage
        user.image = image;
        sessionStorage.setItem('chat-user', JSON.stringify({ user }));
      } else {
        setError(res.data.error || "Failed to update image");
      }
    } catch (e) {
      setError("Failed to update image");
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200/70">
      <div className="bg-white p-8 rounded-lg  w-full shadow-2xl max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <img
          src={preview || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-blue-400"
        />
        <p className="mb-2 text-lg font-semibold">{user.name}</p>
        <p className="mb-4 text-gray-600 break-all text-sm">{user.wallet}</p>
        {balanceLoading ? (
          <p className="text-gray-500 text-sm mb-2">Loading balance...</p>
        ) : balanceError ? (
          <p className="text-red-500 text-sm mb-2">{balanceError}</p>
        ) : (
          <p className="text-gray-700 text-lg font-semibold mb-2">Balance: <span className='text-blue-700'>{Number(balance?.formatted).toFixed(4)} {balance?.symbol}</span></p>
        )}
        <label className="mb-2 font-medium">Change Image</label>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleImageChange}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSave}
          disabled={loading || !image || image === user.image}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
    </div>
    </>
    );
}

export default Profile;
