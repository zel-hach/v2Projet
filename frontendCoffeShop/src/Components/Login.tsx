// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f2f5] font-sans text-gray-900 p-4">
      
//       {/* GLASSMORPHISM CONTAINER */}
//       <div className="w-full max-w-[900px] bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col md:flex-row min-h-[580px]">
        
//         {/* SECTION GAUCHE : Identity & Status */}
//         <div className="w-full md:w-[40%] bg-gradient-to-br from-gray-900 to-black p-12 flex flex-col items-center justify-center relative overflow-hidden">
//           {/* Effet de lumière en arrière-plan */}
//           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50"></div>
          
//           <div className="relative z-10 flex flex-col items-center">
//             <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl">
//               <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#f68716" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
//               </svg>
//             </div>
            
//             <div className="text-center space-y-1">
//               <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">ROBOT</h1>
//               <h1 className="text-4xl font-black tracking-tighter text-[#f68716] uppercase italic">CAFÉ</h1>
//             </div>
            
//             <div className="mt-10 flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
//               </span>
//               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">System Online</span>
//             </div>
//           </div>
//         </div>

//         {/* SECTION DROITE : Admin Access */}
//         <div className="w-full md:w-[60%] p-10 md:p-16 flex flex-col bg-white">
          
//           <div className="mb-12">
//             <div className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-red-100">
//               Restricted Area
//             </div>
//             <h2 className="text-3xl font-black text-gray-900 leading-tight">
//               ACCÈS <br/> <span className="text-gray-400">ADMINISTRATEUR</span>
//             </h2>
//             <p className="text-sm font-medium text-gray-500 mt-4 max-w-xs leading-relaxed">
//               Veuillez vous identifier pour prendre le contrôle du terminal Robot Café.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-7">
//             <div className="group">
//               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-orange-500 transition-colors">
//                 Admin ID
//               </label>
//               <input 
//                 type="email" 
//                 required 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 focus:bg-white focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none text-gray-950 font-bold placeholder:text-gray-300" 
//                 placeholder="admin@robot.cafe" 
//               />
//             </div>

//             <div className="group">
//               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-orange-500 transition-colors">
//                 Passcode
//               </label>
//               <input 
//                 type="password" 
//                 required 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 focus:bg-white focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none text-gray-950 font-bold placeholder:text-gray-300" 
//                 placeholder="••••••••" 
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-gray-200 active:scale-[0.98] uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-4 mt-4 group"
//             >
//               Initialiser la Session
//               <svg xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f68716" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
//               </svg>
//             </button>
//           </form>

//           <div className="mt-auto pt-12 flex items-center justify-between">
//             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Auth v2.4.0</span>
//             <div className="h-px w-12 bg-gray-100"></div>
//             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">© 2026 Robot Café Corp.</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────
   Tiny reusable atom : animated input line
───────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ id, label, type, value, placeholder, onChange, icon }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        style={{ color: focused ? '#f68716' : 'rgba(255,255,255,0.35)' }}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300"
      >
        <span
          style={{ background: focused ? '#f68716' : 'rgba(255,255,255,0.12)' }}
          className="w-4 h-px transition-colors duration-300"
        />
        {label}
      </label>

      <div className="relative">
        {/* Left icon */}
        <div
          style={{ color: focused ? '#f68716' : 'rgba(255,255,255,0.2)' }}
          className="absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-300"
        >
          {icon}
        </div>

        <input
          id={id}
          type={type}
          required
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          style={{
            borderBottomColor: focused ? '#f68716' : 'rgba(255,255,255,0.08)',
            caretColor: '#f68716',
          }}
          className="w-full bg-transparent border-b-2 pl-8 pb-3 pt-1 text-white font-semibold text-sm placeholder:text-white/15 outline-none transition-all duration-300"
        />

        {/* Animated underline fill */}
        <span
          style={{ width: focused ? '100%' : '0%', background: '#f68716' }}
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN LOGIN PAGE
───────────────────────────────────────── */
const Login: React.FC = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [step, setStep]         = useState(0); // 0=idle 1=auth 2=done
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStep(1);
    setTimeout(() => setStep(2), 900);
    setTimeout(() => navigate('/dashboard'), 1800);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden"
      style={{ background: '#080808', fontFamily: "'Inter', sans-serif" }}
    >

      {/* ── BG : subtle dot grid ── */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── BG : orange fog ── */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 110%, rgba(246,135,22,0.07) 0%, transparent 60%)',
        }}
      />

      {/* ════════════════════════════════════
          CARD — 960px wide, two columns
      ════════════════════════════════════ */}
      <div
        className="relative w-full flex overflow-hidden"
        style={{
          maxWidth: 960,
          borderRadius: 28,
          background: 'linear-gradient(145deg, #141414 0%, #0f0f0f 100%)',
          border: '1px solid rgba(255,255,255,0.055)',
          boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.4)',
          minHeight: 620,
        }}
      >

        {/* ═══════════════════════════
            LEFT — Visual / Brand
        ═══════════════════════════ */}
        <div
          className="hidden md:flex md:w-[44%] flex-col relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #111111 0%, #0c0c0c 100%)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Vertical orange rule */}
          <div
            className="absolute top-0 left-0 w-[3px] h-full"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, #f68716 40%, #f68716 60%, transparent 100%)',
              opacity: 0.5,
            }}
          />

          {/* Top label */}
          <div className="absolute top-10 left-10 right-10">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: '#f68716', flexShrink: 0 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span
                className="text-[9px] font-black uppercase tracking-[0.35em]"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Smart Robotic Arm
              </span>
            </div>
          </div>

          {/* Center hero */}
          <div className="flex-1 flex flex-col items-center justify-center px-10">

            {/* Icon ring */}
            <div className="relative mb-10">
              {/* Outer pulse ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(246,135,22,0.25)',
                  transform: 'scale(1.6)',
                  animationDuration: '3s',
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(246,135,22,0.12)',
                  transform: 'scale(1.3)',
                }}
              />
              {/* Icon container */}
              <div
                className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1c1c1c, #141414)',
                  border: '1px solid rgba(246,135,22,0.25)',
                  boxShadow: '0 0 40px rgba(246,135,22,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f68716"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center mb-8">
              <h1
                className="text-[3.2rem] font-black tracking-[-0.04em] leading-none uppercase"
                style={{ color: '#ffffff' }}
              >
                Robot
              </h1>
              <h1
                className="text-[3.2rem] font-black tracking-[-0.04em] leading-none uppercase"
                style={{ color: '#f68716' }}
              >
                Café
              </h1>
            </div>

            {/* Divider */}
            <div
              className="w-12 h-px mb-8"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '1.4K',  label: 'Orders' },
                { value: '3',     label: 'Arms' },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p
                    className="text-base font-black"
                    style={{ color: '#f68716' }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="text-[8px] font-bold uppercase tracking-[0.2em] mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom status bar */}
          <div
            className="absolute bottom-0 left-0 right-0 px-10 py-6 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#f68716' }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: '#f68716' }}
                />
              </span>
              <span
                className="text-[8px] font-black uppercase tracking-[0.3em]"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                All Systems Nominal
              </span>
            </div>
            <span
              className="text-[8px] font-bold"
              style={{ color: 'rgba(255,255,255,0.12)' }}
            >
              v2.4.0
            </span>
          </div>
        </div>

        {/* ═══════════════════════════
            RIGHT — Login Form
        ═══════════════════════════ */}
        <div className="w-full md:w-[56%] flex flex-col justify-center px-10 md:px-14 py-14">

          {/* Header */}
          <div className="mb-12">
            {/* Breadcrumb path */}
            <div
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] mb-6"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              <span>system</span>
              <span style={{ color: '#f68716' }}>/</span>
              <span>admin</span>
              <span style={{ color: '#f68716' }}>/</span>
              <span style={{ color: '#f68716' }}>auth</span>
            </div>

            <h2
              className="text-[1.9rem] font-black tracking-tight leading-tight"
              style={{ color: '#ffffff' }}
            >
              Administrator
              <br />
              <span style={{ color: 'rgba(255,255,255,0.22)' }}>
                Access Portal
              </span>
            </h2>

            <p
              className="text-[13px] font-medium mt-3 leading-relaxed max-w-[280px]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Secure authentication required to access the Robot Café control terminal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-9">

            <Field
              id="email"
              label="Admin Email"
              type="email"
              value={email}
              placeholder="admin@robot.cafe"
              onChange={setEmail}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            />

            <Field
              id="password"
              label="Passcode"
              type="password"
              value={password}
              placeholder="••••••••••"
              onChange={setPassword}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
            />

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? 'rgba(246,135,22,0.5)' : '#f68716',
                  boxShadow: loading
                    ? 'none'
                    : '0 4px 24px rgba(246,135,22,0.3), 0 1px 0 rgba(255,255,255,0.1) inset',
                  borderRadius: 14,
                }}
                className="w-full h-[54px] flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 active:scale-[0.98] group"
              >
                {step === 0 && (
                  <>
                    <span style={{ color: '#000' }}>Authenticate</span>
                    <svg
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
                {step === 1 && (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span style={{ color: '#000' }}>Verifying...</span>
                  </>
                )}
                {step === 2 && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: '#000' }}>Access Granted</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div
            className="mt-14 pt-6 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-3">
              {/* mini logo mobile */}
              <div
                className="md:hidden w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: '#f68716' }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
              </div>
              <span
                className="text-[8px] font-bold uppercase tracking-[0.25em]"
                style={{ color: 'rgba(255,255,255,0.15)' }}
              >
                © 2026 Robot Café Corp.
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {[0.4, 0.25, 0.12].map((op, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: `rgba(246,135,22,${op})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
