import Login from './Login';

const LandingPage = () => {
  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/realistic-coffee-background-with-drawings_157027-1112.avif')] bg-cover bg-center bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/50 md:bg-black/40"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-svh w-full flex-col md:flex-row md:items-stretch md:justify-end">
        <Login />
      </div>
    </div>
  );
};

export default LandingPage;
