import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <section className="flex min-h-svh w-full max-w-full flex-col justify-center border-orange-500/30 bg-black/80 px-8 py-10 text-black left shadow-2xl backdrop-blur-md sm:px-12 md:max-w-xl lg:max-w-2xl md:border-l">
      <div className="mb-8 flex flex-col justify-center items-center gap-1">
        {/* <img
          src="/La-startup-station.jpg"
          alt="La Startup Station"
          className="h-14 w-14 rounded-xl object-cover ring-2 ring-orange-500/40"
        /> */}
          <h1 className="w-full text-black 3xl font-bold leading-tight text-black white sm:text-black 4xl text-black center">
            Login
          </h1>
      </div>
      <form className="w-full space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-black sm font-medium text-black white/90">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@cafe.com"
            className="w-full rounded-xl border border-orange-500/40 bg-black/50 px-4 py-3 text-black white placeholder:text-black zinc-500 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/40"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-black sm font-medium text-black white/90">
              Mot de passe
            </label>
            <button
              type="button"
              className="text-black xs text-black orange-400 underline-offset-2 hover:text-black orange-300 hover:underline"
            >
              Oublié ?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-orange-500/40 bg-black/50 px-4 py-3 text-black white placeholder:text-black zinc-500 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/40"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-black sm text-black zinc-300">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border-orange-500/50 bg-black/50 text-black orange-500 focus:ring-orange-500/40"
          />
          Se souvenir de moi
        </label>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-orange-500 py-3 font-semibold text-black black shadow-[0_10px_30px_rgba(251,146,60,0.35)] transition hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
        >
          Se connecter
        </button>
      </form>
    </section>
  );
};

export default Login;
