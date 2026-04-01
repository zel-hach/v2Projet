import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion ici
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] font-sans text-gray-900 p-6">
      
      {/* CONTAINER PRINCIPAL */}
      <div className="w-full max-w-[850px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        
        {/* SECTION GAUCHE : Branding */}
        <div className="w-full md:w-[35%] bg-gray-50/50 p-12 flex flex-col items-center justify-center border-r border-gray-100">
          <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#f68716" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
              <line x1="6" y1="2" x2="6" y2="4"/>
              <line x1="10" y1="2" x2="10" y2="4"/>
              <line x1="14" y1="2" x2="14" y2="4"/>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-[1000] tracking-tighter text-gray-950 uppercase leading-none">ROBOT</h1>
            <h1 className="text-3xl font-[1000] tracking-tighter text-[#f68716] uppercase leading-none mt-1">CAFÉ</h1>
            <div className="h-1.5 w-10 bg-[#f68716] mx-auto mt-4 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* SECTION DROITE : Formulaire de connexion unique */}
        <div className="w-full md:w-[65%] p-10 md:p-14 flex flex-col">
          
          <div className="mb-14">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Authentification</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Accès réservé au personnel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Champ Email */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Identifiant</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#f68716]/40 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all outline-none text-gray-950 font-semibold placeholder:text-gray-300" 
                placeholder="marie@cafe.local" 
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-40 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Mot de passe</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-[#f68716]/40 focus:bg-white focus:ring-4 focus:ring-orange-50 transition-all outline-none text-gray-950 font-semibold placeholder:text-gray-300" 
                placeholder="••••••••" 
              />
            </div>

            {/* Bouton de soumission */}
            <div className="pt-8 flex flex-col md:flex-row md:items-center">
              <div className="md:w-40"></div> 
              <button
                type="submit"
                className="flex-1 md:flex-none px-16 bg-[#f68716] hover:bg-[#e07614] text-white font-black py-5 rounded-full transition-all shadow-xl shadow-orange-200/50 active:scale-95 uppercase tracking-[0.15em] text-[12px] flex items-center justify-center gap-4 group"
              >
                Se connecter
                <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-auto pt-10 text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] text-right">
            Secure Terminal • v2.4.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;