import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] font-sans text-gray-900 p-6">
      
      {/* CONTAINER PRINCIPAL : Largeur fixe 850px */}
      <div className="w-full max-w-[850px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        
        {/* SECTION GAUCHE : Branding */}
        <div className="w-full md:w-[35%] bg-gray-50/50 p-12 flex flex-col items-center justify-center border-r border-gray-100">
          <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#f68716" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-[1000] tracking-tighter text-gray-950 uppercase leading-none">ROBOT</h1>
            <h1 className="text-3xl font-[1000] tracking-tighter text-[#f68716] uppercase leading-none mt-1">CAFÉ</h1>
            <div className="h-1 w-8 bg-[#f68716] mx-auto mt-4 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* SECTION DROITE : Formulaire aligné au pixel près */}
        <div className="w-full md:w-[65%] p-10 md:p-14 flex flex-col">
          
          {/* Header & Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Authentification</h2>
            <div className="flex p-1 bg-gray-100 rounded-full border border-gray-200 w-full md:w-60">
              <button 
                type="button"
                onClick={() => setIsLogin(true)} 
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${isLogin ? 'bg-white text-gray-950 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Accès
              </button>
              <button 
                type="button"
                onClick={() => setIsLogin(false)} 
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${!isLogin ? 'bg-white text-[#f68716] shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Nouveau
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Champ Nom (Conditionnel) */}
            {!isLogin && (
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-44 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Nom complet</label>
                <input 
                  type="text" 
                  className="flex-1 px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-[#f68716]/30 focus:bg-white transition-all outline-none text-gray-950 font-semibold placeholder:text-gray-300" 
                  placeholder="Ex: Marie Dubois" 
                />
              </div>
            )}

            {/* Champ Email */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-44 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Identifiant</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-[#f68716]/30 focus:bg-white transition-all outline-none text-gray-950 font-semibold placeholder:text-gray-200" 
                placeholder="marie@cafe.local" 
              />
            </div>

            {/* Champ Mot de passe - TAILLE IDENTIQUE À L'EMAIL */}
            <div className="flex flex-col md:flex-row md:items-center">
              <label className="md:w-44 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Mot de passe</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-[#f68716]/30 focus:bg-white transition-all outline-none text-gray-950 font-semibold placeholder:text-gray-200" 
                placeholder="••••••••" 
              />
            </div>

            {/* Section Bouton aligné sur la grille */}
            <div className="pt-8 flex flex-col md:flex-row md:items-center">
              <div className="md:w-44"></div> {/* Espaceur pour l'alignement vertical */}
              <button
                type="submit"
                className="flex-1 md:flex-none px-14 bg-[#f68716] hover:bg-[#e07614] text-white font-black py-4.5 rounded-full transition-all shadow-lg shadow-orange-100 active:scale-95 uppercase tracking-widest text-[11px] flex items-center justify-center gap-4"
              >
                {isLogin ? 'Se connecter' : 'Confirmer'}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </form>

          {/* Footer - Aligné en bas à droite */}
          <div className="mt-auto pt-10 text-[9px] font-bold text-gray-200 uppercase tracking-[0.4em] text-right">
            Secure Terminal • v2.4.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;