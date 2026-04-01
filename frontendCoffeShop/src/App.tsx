import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import BodyDashboard from './Components/BodyDashboard';
import Utilisateurs from './Components/Dashboard/Utilisateurs';
import Rapports from './Components/Dashboard/Rapports';
import Parametres from './Components/Dashboard/Parametres';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<BodyDashboard />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route path="rapports" element={<Rapports />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
