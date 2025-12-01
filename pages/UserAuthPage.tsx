import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, Download, LogOut, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserAuthPage: React.FC = () => {
  const { currentUser, loginUser, registerUser, logoutUser, t } = useApp();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginUser(loginData.email, loginData.password);
    if (success) {
      setError('');
    } else {
      setError('Wrong email or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.phone) {
      setError('All fields including Phone are required');
      return;
    }
    const success = registerUser(signupData);
    if (success) {
      setError('');
    } else {
      setError('User already exists');
    }
  };

  const handleDownloadProfile = () => {
    if (!currentUser) return;
    const textContent = `
      User Profile Download
      ---------------------
      Email: ${currentUser.email}
      Phone: ${currentUser.phone}
      Status: Verified
      Date: ${new Date().toLocaleDateString()}
    `;
    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `user-profile-${currentUser.phone}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-8 border border-gray-200 text-center">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
           <p className="text-gray-500 mb-6">{currentUser.email}</p>
           
           <div className="bg-gray-50 rounded p-4 mb-8 text-left border border-gray-100">
              <p className="text-sm font-bold text-gray-500 uppercase">Phone Number</p>
              <p className="text-lg font-mono text-gray-800">{currentUser.phone}</p>
           </div>

           <div className="space-y-4">
              <button 
                onClick={handleDownloadProfile}
                className="w-full flex justify-center items-center gap-2 py-3 bg-black text-white rounded font-bold hover:bg-gray-800 transition-colors"
              >
                  <Download className="w-5 h-5" /> Download Profile Text Form
              </button>
              <button 
                onClick={() => logoutUser()}
                className="w-full flex justify-center items-center gap-2 py-3 bg-white border border-red-500 text-red-600 rounded font-bold hover:bg-red-50 transition-colors"
              >
                  <LogOut className="w-5 h-5" /> Logout
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg overflow-hidden border border-gray-200">
         
         <div className="flex text-center border-b border-gray-200 bg-gray-50">
            <button 
               onClick={() => { setAuthMode('login'); setError(''); }}
               className={`flex-1 py-4 font-bold transition-colors ${authMode === 'login' ? 'bg-white text-black border-t-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
               User Login
            </button>
            <button 
               onClick={() => { setAuthMode('signup'); setError(''); }}
               className={`flex-1 py-4 font-bold transition-colors ${authMode === 'signup' ? 'bg-white text-black border-t-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
               Register (Sign Up)
            </button>
         </div>

         <div className="p-8">
            <div className="text-center mb-6">
               <div className="inline-block p-3 rounded-full bg-gray-100 mb-2">
                  <User className="w-8 h-8 text-gray-600" />
               </div>
               <h2 className="text-xl font-bold text-gray-800">
                   {authMode === 'login' ? 'Access Your Account' : 'Create New Account'}
               </h2>
            </div>

            {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input 
                          type="email" 
                          required
                          className="w-full border border-gray-300 rounded p-2 focus:ring-black focus:border-black"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                        <input 
                          type="password" 
                          required
                          className="w-full border border-gray-300 rounded p-2 focus:ring-black focus:border-black"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
                    <button type="submit" className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition-colors">
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input 
                          type="email" 
                          required
                          className="w-full border border-gray-300 rounded p-2 focus:ring-black focus:border-black"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+92..."
                          className="w-full border border-gray-300 rounded p-2 focus:ring-black focus:border-black"
                          value={signupData.phone}
                          onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                        <input 
                          type="password" 
                          required
                          className="w-full border border-gray-300 rounded p-2 focus:ring-black focus:border-black"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition-colors">
                        Sign Up & Save
                    </button>
                </form>
            )}
         </div>
      </div>
    </div>
  );
};

export default UserAuthPage;