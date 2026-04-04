


import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { persistSessionFromLogin } from '../data/sessionUser';

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
        style={{ color: focused ? '#f68716' : 'black' }}
        className="flex items-center gap-2 text-[12px] text-black font-black uppercase tracking-[0.3em] transition-colors duration-300"
      >
        {label}
      </label>

      <div className="relative">
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
            borderBottomColor: focused ? '#f68716' : '#e2e8f0',
            caretColor: '#f68716',
          }}
          className="w-full  border-b-2 pl-2 pb-3 pt-1 text-[#0f172a] font-semibold text-sm placeholder:text-[#94a3b8]/80 outline-none transition-all duration-300"
        />

        <span
          style={{ width: focused ? '100%' : '0%', background: '#f68716' }}
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [loading, setLoading]   = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:7000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    persistSessionFromLogin({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      role: data.role,
    });
    navigate('/dashboard/visiteurs');

  } catch (error: any) {
    console.error('Error:', error.message);
  }
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 border-2 border-[#f68716]
    bg-[linear-gradient(to_top,#ffffff_5%,#f68716_60%,#f68716_95%)]">

      <div
        className="relative w-full flex overflow-hidden bg-white"
        style={{
          maxWidth: 960,
          borderRadius: 28,
          border: '2px solidrgb(18, 17, 15)',

  
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.06),
            0 4px 10px rgba(0,0,0,0.04),
            0 0 0 1px rgba(246,135,22,0.05)
          `,

          minHeight: 620,
        }}
      >

        <div
          className="hidden md:flex md:w-[44%] flex-col relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg,#ffedd5, #fff7ed)',
            borderRight: '1px solid #fff7ed',
          }}
        >
          <div className="absolute top-10 left-10 right-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-[13px] font-black uppercase tracking-widest text-[#94a3b8]">
              Smart Robotic Arm
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-10">
            <div className="relative mb-10">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  border: '1px solid rgba(246,135,22,0.25)',
                  transform: 'scale(1.6)',
                  animationDuration: '3s',
                }}
              />

              <div
                className="relative w-[88px] h-[88px] rounded-full flex items-center justify-center"
                style={{
                  border: '1px solid rgba(246,135,22,0.3)',
                  boxShadow: '0 0 20px rgba(246,135,22,0.15)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f68716" strokeWidth="1.6">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-[3rem] font-black uppercase text-[#0f172a]">
                Robot
              </h1>
              <h1 className="text-[3rem] font-black uppercase text-[#f68716]">
                Café
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[56%] flex flex-col justify-center px-10 md:px-14 py-14">

          <div className="mb-12 text-center">
            <h2 className="text-[3rem] font-black uppercase text-bold text-[#f68716]">
              Administration
            </h2>
            <p className="text-[13px] font-medium mt-3 text-black text-bold">
              Authentification sécurisée requise pour accéder au terminal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-9">

            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              placeholder="admin@example.com"
              onChange={setEmail}
              icon={<span>@</span>}
            />

            <Field
              id="password"
              label="Password"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={setPassword}
              icon={<span>*</span>}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[54px] font-black uppercase rounded-xl transition-all duration-300"
              style={{
                background: '#f68716',
                color: '#fff',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 20px rgba(246,135,22,0.35)',
              }}
            >
              {loading ? 'Loading...' : 'Connexion'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;