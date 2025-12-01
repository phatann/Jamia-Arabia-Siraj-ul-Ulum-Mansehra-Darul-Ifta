import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Download, PlusCircle, Check, LogOut, FileCode, UserPlus, AlertTriangle } from 'lucide-react';
import { CATEGORIES } from '../constants';

const MuftiPanelPage: React.FC = () => {
  const { currentMufti, currentUser, loginMufti, registerMufti, logoutMufti, addFatwa, t } = useApp();
  const navigate = useNavigate();

  // Auth Mode: 'login' or 'signup'
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Form States
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', username: '', password: '' });
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard State (Add Fatwa)
  const [newFatwa, setNewFatwa] = useState({
    questionTitle: '',
    questionDetails: '',
    answer: '',
    category: CATEGORIES[1].labelUrdu,
  });

  // RESTRICTION CHECK:
  // If no User is logged in AND no Mufti is logged in, restrict access.
  if (!currentUser && !currentMufti) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-md w-full">
                <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Access Restricted</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-urdu">رسائی محدود ہے</h3>
                <p className="text-gray-600 mb-6">
                    This section is for Muftis only. To access the Mufti Login page, you must first be logged in as a registered user.
                    <br/><br/>
                    <span className="font-urdu">برائے مہربانی پہلے بطور صارف لاگ ان کریں۔</span>
                </p>
                <button 
                    onClick={() => navigate('/user-auth')}
                    className="w-full bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition-colors"
                >
                    Go to User Login
                </button>
            </div>
        </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginMufti(loginData.username, loginData.password);
    if (success) {
      setError('');
    } else {
      setError('Invalid username or password / غلط یوزرنیم یا پاسورڈ');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.username || !signupData.password) {
        setError('All fields are required');
        return;
    }
    const success = registerMufti(signupData);
    if (success) {
        setError('');
        // Automatically logged in by context
    } else {
        setError('Username already taken / یہ یوزرنیم پہلے سے موجود ہے');
    }
  };

  const handleAddFatwa = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000).toString();
    const hijriYear = '1445';
    
    addFatwa({
      id: id,
      fatwaNumber: `${hijriYear}-${id}/Mufti`,
      questionTitle: newFatwa.questionTitle,
      questionDetails: newFatwa.questionDetails,
      answer: newFatwa.answer,
      category: newFatwa.category,
      date: new Date().toLocaleDateString('ar-SA'),
      views: 0,
      featured: true,
      muftiName: currentMufti?.name || 'Mufti' // Use logged in name
    });

    setSuccessMsg('Fatwa added successfully!');
    setNewFatwa({ questionTitle: '', questionDetails: '', answer: '', category: CATEGORIES[1].labelUrdu });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDownloadCode = () => {
    const code = "Simulated Download: Full Source Code of Jamia Arabia Siraj-ul-Ulum Website...";
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "source-code.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!currentMufti) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md w-full space-y-8 bg-gray-50 p-10 rounded-xl shadow-lg border border-gray-200">
          
          {/* Header Icon */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-black rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                {authMode === 'login' ? 'Mufti Login' : 'Mufti Registration'}
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-gray-300">
              <button 
                onClick={() => { setAuthMode('login'); setError(''); }}
                className={`flex-1 py-2 text-center font-bold ${authMode === 'login' ? 'border-b-4 border-black text-black' : 'text-gray-500'}`}
              >
                  Login
              </button>
              <button 
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className={`flex-1 py-2 text-center font-bold ${authMode === 'signup' ? 'border-b-4 border-black text-black' : 'text-gray-500'}`}
              >
                  Sign Up
              </button>
          </div>

          {/* LOGIN FORM */}
          {authMode === 'login' && (
            <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                    <input
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    />
                </div>
                </div>

                {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                >
                    Sign In
                </button>
                </div>
            </form>
          )}

          {/* SIGNUP FORM */}
          {authMode === 'signup' && (
             <form className="mt-8 space-y-4" onSubmit={handleSignupSubmit}>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                    <input
                    type="text"
                    required
                    className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Mufti Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label>
                    <input
                    type="email"
                    required
                    className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="mufti@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Username</label>
                    <input
                    type="text"
                    required
                    className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                    <input
                    type="password"
                    required
                    className="appearance-none rounded block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    />
                </div>

                {error && <div className="text-red-500 text-sm text-center font-bold">{error}</div>}

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 transition-all"
                >
                    <UserPlus className="w-4 h-4 mr-2" /> Register Mufti
                </button>
                </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50 py-10 font-urdu dir-rtl">
       <div className="container mx-auto px-4">
           {/* Dashboard Header */}
           <div className="bg-white shadow rounded-lg p-6 mb-8 flex justify-between items-center flex-row-reverse border-l-4 border-black">
               <div>
                   <h1 className="text-2xl font-bold text-gray-900">Mufti Dashboard</h1>
                   <p className="text-gray-600 font-sans mt-1">Welcome, {currentMufti.name}</p>
               </div>
               <div className="flex gap-4">
                  <button 
                    onClick={handleDownloadCode}
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors font-sans"
                  >
                      <Download className="w-4 h-4" /> Download Code
                  </button>
                  <button 
                    onClick={() => { logoutMufti(); navigate('/'); }}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-sans"
                  >
                      <LogOut className="w-4 h-4" /> Logout
                  </button>
               </div>
           </div>

           {/* Add Fatwa Form */}
           <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
               <div className="bg-black text-white px-6 py-4 text-right">
                   <h2 className="text-xl font-bold flex items-center justify-end gap-2">
                       نیا فتویٰ شامل کریں <PlusCircle className="w-5 h-5" />
                   </h2>
               </div>
               
               <div className="p-8">
                   {successMsg && (
                       <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-right flex items-center justify-end gap-2">
                           {successMsg} <Check className="w-5 h-5" />
                       </div>
                   )}

                   <form onSubmit={handleAddFatwa} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="text-right">
                               <label className="block text-gray-700 font-bold mb-2">کیٹیگری</label>
                               <select 
                                 className="w-full border border-gray-300 rounded p-3 text-right font-urdu"
                                 value={newFatwa.category}
                                 onChange={(e) => setNewFatwa({...newFatwa, category: e.target.value})}
                                 dir="rtl"
                               >
                                   {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                                       <option key={c.id} value={c.labelUrdu}>{c.labelUrdu}</option>
                                   ))}
                               </select>
                           </div>
                           <div className="text-right">
                               <label className="block text-gray-700 font-bold mb-2">عنوان</label>
                               <input 
                                 type="text" 
                                 className="w-full border border-gray-300 rounded p-3 text-right"
                                 value={newFatwa.questionTitle}
                                 onChange={(e) => setNewFatwa({...newFatwa, questionTitle: e.target.value})}
                                 dir="rtl"
                                 required
                               />
                           </div>
                       </div>

                       <div className="text-right">
                           <label className="block text-gray-700 font-bold mb-2">سوال کی تفصیل</label>
                           <textarea 
                             className="w-full border border-gray-300 rounded p-3 text-right h-24"
                             value={newFatwa.questionDetails}
                             onChange={(e) => setNewFatwa({...newFatwa, questionDetails: e.target.value})}
                             dir="rtl"
                             required
                           />
                       </div>

                       <div className="text-right">
                           <label className="block text-gray-700 font-bold mb-2">الجواب</label>
                           <textarea 
                             className="w-full border border-gray-300 rounded p-3 text-right h-48 font-urdu leading-loose"
                             value={newFatwa.answer}
                             onChange={(e) => setNewFatwa({...newFatwa, answer: e.target.value})}
                             dir="rtl"
                             required
                           />
                       </div>

                       <div className="flex justify-end">
                           <button 
                             type="submit" 
                             className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                           >
                               محفوظ کریں <FileCode className="w-5 h-5" />
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       </div>
    </div>
  );
};

export default MuftiPanelPage;