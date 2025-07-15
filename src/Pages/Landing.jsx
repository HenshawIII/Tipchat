import React from 'react';
import Navbar from '../Navbar';
import robot from '../../public/robot.gif';
import { Link } from 'react-router-dom';
import Squares from '../Squares';

function Landing() {
  const user = JSON.parse(sessionStorage.getItem('chat-user'));
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      {/* Hero Section with Squares background */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden bg-cyan-600">
        {/* Squares background only for hero */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='down'
            borderColor='#1c3c9e'
            hoverFillColor='#1c3c9e'
          />
        </div>
        {/* Hero content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4 py-8 md:py-16 gap-8 md:gap-0">
          <div className="flex flex-col items-start w-full md:w-2/3 max-w-2xl">
            <h1 className="md:text-6xl text-3xl font-extrabold text-white mb-4 leading-tight">Welcome to <span className='text-[#CCF697]/80'>TIPChat</span></h1>
            <p className="md:text-2xl text-lg text-white mb-6">TIPChat is a modern chat platform where you can:</p>
            <div className="flex flex-col flex-wrap gap-4 w-full justify-between mb-8">
              <div className="flex-1 min-w-[160px] bg-gradient-to-r from-cyan-600 to-cyan-600/10 rounded-xl p-4 md:p-6 text-white text-base md:text-xl font-bold shadow-lg text-left">
                <span className='font-bold'>Chat</span> with friends in real time
              </div>
              <div className="flex-1 min-w-[160px] bg-gradient-to-r from-cyan-600 to-cyan-600/10 rounded-xl p-4 md:p-6 text-white text-base md:text-xl font-bold shadow-lg text-left">
                Tip your friends <span className='font-bold'>ETH</span> directly in the chat
              </div>
              <div className="flex-1 min-w-[160px] bg-gradient-to-r from-cyan-600 to-cyan-600/10 rounded-xl p-4 md:p-6 text-white text-base md:text-xl font-bold shadow-lg text-left">
                Secure, <span className='font-bold'>wallet</span>-based login
              </div>
            </div>
            {user ? (
              <Link to="/chat" className="mt-2 bg-gradient-to-r from-cyan-600 to-[#ccf697]/70 text-white px-4 py-2 rounded hover:bg-cyan-700 font-semibold">Go to Chat</Link>
            ) : (
              <Link to="/login" className="mt-2 bg-gradient-to-r from-cyan-600 to-[#ccf697]/70 text-white px-4 py-2 rounded hover:bg-cyan-700 font-semibold">Get Started</Link>
            )}
          </div>
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
            <img
              src={robot}
              alt="Robot"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain mx-auto md:mx-0"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="bg-[#121e42] bg-gradient-to-b from-[#121e42] to-cyan-600 shadow-lg w-full flex flex-col items-center justify-center md:mb-10 overflow-x-hidden py-12 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">Get <span className='text-cyan-200 font-bold'>Started</span></h2>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center items-stretch">
          <div className="flex-1 min-w-[220px] bg-white/10 rounded-xl p-6 md:p-8 text-white text-lg md:text-xl font-semibold shadow-lg text-center flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <span className='text-cyan-200 font-bold text-2xl mb-2'>1</span>
            Connect your <span className='text-cyan-200 font-bold'>Ethereum</span> wallet
          </div>
          <div className="flex-1 min-w-[220px] bg-white/10 rounded-xl p-6 md:p-8 text-white text-lg md:text-xl font-semibold shadow-lg text-center flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <span className='text-cyan-200 font-bold text-2xl mb-2'>2</span>
            Choose a <span className='text-cyan-200 font-bold'>unique</span> username
          </div>
          <div className="flex-1 min-w-[220px] bg-white/10 rounded-xl p-6 md:p-8 text-white text-lg md:text-xl font-semibold shadow-lg text-center flex flex-col items-center justify-center transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <span className='text-cyan-200 font-bold text-2xl mb-2'>3</span>
            Start chatting and tipping your friends <span className='text-cyan-200 font-bold'>ETH!</span>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="w-full flex flex-col items-center py-12 px-4 bg-white/80 overflow-x-hidden">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-700 mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl w-full space-y-6">
          <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-2">What is TIPChat?</h3>
            <p className="text-gray-700 text-base md:text-lg">TIPChat is a chat platform that lets you chat with friends and send ETH tips directly in the chat, all with secure wallet-based login.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-2">How do I tip someone ETH?</h3>
            <p className="text-gray-700 text-base md:text-lg">Simply open a chat with your friend, click the "Send Eth" button, enter the amount, and confirm the transaction with your wallet.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-2">Is my wallet information safe?</h3>
            <p className="text-gray-700 text-base md:text-lg">Yes! TIPChat never stores your private keys. All transactions are signed securely in your wallet extension (like MetaMask).</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-2">Can I use TIPChat on mobile?</h3>
            <p className="text-gray-700 text-base md:text-lg">Yes, TIPChat is fully responsive and works on both desktop and mobile browsers.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-cyan-400/30">
            <h3 className="text-xl md:text-2xl font-bold text-cyan-700 mb-2">What wallets are supported?</h3>
            <p className="text-gray-700 text-base md:text-lg">TIPChat supports any Ethereum wallet compatible with WalletConnect or MetaMask.</p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-[#121e42] to-cyan-700 text-center py-10 text-white font-medium shadow-inner mt-auto text-lg flex flex-col items-center justify-center min-h-[120px]">
        &copy; {new Date().getFullYear()} TIPChat. Built for chatting and Sending ETH.
        <div className='flex flex-row items-center justify-center gap-2 mt-2'>
          Made with ❤️ by <a href="https://X.com/devansa01" className='text-cyan-200 font-bold'target='_blank' rel='noopener noreferrer'>Inameti</a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
