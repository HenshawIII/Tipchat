import React from 'react';
import Navbar from '../Navbar';
import robot from '../../public/robot.gif';
import { Link } from 'react-router-dom';
import  Squares  from '../Squares';

function Landing() {

    const user = JSON.parse(sessionStorage.getItem('chat-user'));
  return (
    <div className="min-h-screen bg-cyan-600 flex flex-col">
      <div className='absolute top-0 left-0 w-full h-full inset-0'>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='down'
          borderColor='#1c3c9e'
          hoverFillColor='#1c3c9e'
        />
        </div>
      <Navbar />
      {/* Main Content */}
      <div className=" pt-24 pb-8 z-10 overflow-x-hidden overflow-y-hidden">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-8 rounded-xl shadow-xl p-8 mb-8  w-full  ">
          
          <div className="flex flex-col items-start">
            <h1 className="md:text-7xl text-4xl font-extrabold text-white mb-4">Welcome to <span className='text-cyan-600'>TIPChat</span></h1>
            <p className="md:text-3xl text-2xl text-white mb-4">TIPChat is a modern chat platform where you can:</p>
            <ul className="list-disc list-inside text-white mb-11 md:text-2xl text-lg">
              <li><span className='text-cyan-600 font-bold ' >Chat</span> with friends in real time</li>
              <li>Tip your friends <span className='text-cyan-600 font-bold ' >ETH</span> directly in the chat</li>
              <li>Enjoy a secure, <span  className='md:text-cyan-600 font-bold ' >wallet</span>-based login experience</li>
            </ul>
            {user ? (
                <Link to="/chat" className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 font-semibold">Go to Chat</Link>
                ) : (
                <Link to="/login" className="mt-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 font-semibold">Get Started</Link>
            )}
          </div>
          <img src={robot} alt="Robot" className=" md:scale-150" />
        </div>
        {/* Login Process Section */}
        <div className="bg-[#121e42] bg-gradient-to-b pt-10 from-[#121e42] to-cyan-600 shadow-lg p-8 h-[50vh] w-[100vw] flex flex-col items-center justify-center md:mb-10">
          <h2 className="text-5xl font-extrabold text-white text-center mb-6"> Quick <span className='text-cyan-600 font-bold ' >Start</span></h2>
          <ol className="flex flex-col md:flex-row justify-around md:gap-4 text-white text-lg mb-4 w-full">
            <li className="mb-2 p-7 hover:shadow-md rounded-lg  ">Connect your <span className='text-cyan-600 font-bold ' >Ethereum</span> wallet</li>
            <li className="mb-2 p-7 hover:shadow-md rounded-lg ">Choose a <span className='text-cyan-600 font-bold ' >unique</span> username</li>
            <li className="mb-2 p-7 hover:shadow-md rounded-lg ">Start chatting and tipping your friends <span className='text-cyan-600 font-bold ' >ETH!</span></li>
          </ol>
          {/* <div className="flex gap-4 mt-2">
            <Link to="/login" className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 font-semibold">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">Register</Link>
          </div> */}
        </div>
        {/* FAQ Section */}
        <div className="w-full flex flex-col items-center py-12 px-4 bg-white/80">
          <h2 className="text-4xl font-extrabold text-cyan-700 mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl w-full space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">What is TIPChat?</h3>
              <p className="text-gray-700 text-lg">TIPChat is a chat platform that lets you chat with friends and send ETH tips directly in the chat, all with secure wallet-based login.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">How do I tip someone ETH?</h3>
              <p className="text-gray-700 text-lg">Simply open a chat with your friend, click the "Send Eth" button, enter the amount, and confirm the transaction with your wallet.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">Is my wallet information safe?</h3>
              <p className="text-gray-700 text-lg">Yes! TIPChat never stores your private keys. All transactions are signed securely in your wallet extension (like MetaMask).</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">Can I use TIPChat on mobile?</h3>
              <p className="text-gray-700 text-lg">Yes, TIPChat is fully responsive and works on both desktop and mobile browsers.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-2xl font-bold text-cyan-700 mb-2">What wallets are supported?</h3>
              <p className="text-gray-700 text-lg">TIPChat supports any Ethereum wallet compatible with WalletConnect or MetaMask.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-white/80 text-center h-[20vh] py-4 text-gray-600 font-medium shadow-inner">
        <div className='flex flex-col items-center justify-center h-full'>
          <p>&copy; {new Date().getFullYear()} TIPChat. Built for chatting and tipping with ETH.</p>
          <p>Made with ❤️ by <a href="https://X.com/devansa01" rel="noopener noreferrer" target='_blank' className="text-cyan-600 font-bold text-underline underline">Inameti</a></p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
