import React from 'react';
import { Link} from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(sessionStorage.getItem('chat-user'));
//   const navigate = useNavigate();

  return (
    <nav className="w-full z-40 bg-transparent fixed top-0 left-0 shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-cyan-700">TIPChat</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Link to= "/chat" className="text-cyan-600 font-semibold hover:underline p-3 z-10">Chat</Link>
        ) : (
          <>
            <Link to="/login" className="text-cyan-600 font-semibold hover:underline">Login</Link>
            <Link to="/register" className="text-cyan-600 font-semibold hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
