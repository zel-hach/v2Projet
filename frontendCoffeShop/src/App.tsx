import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Import du nouveau fichier
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
        {/* La page de Login est maintenant accessible sur "/" ou "/login" */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Route existante pour la landing si besoin */}
        <Route path="/home" element={<LandingPage />} />

        {/* Routes protégées du Dashboard */}
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