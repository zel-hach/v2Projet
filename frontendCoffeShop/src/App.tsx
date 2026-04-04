import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import BodyDashboard from './Components/BodyDashboard';
import Utilisateurs from './Components/Dashboard/Utilisateurs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<BodyDashboard />} />
          <Route path="utilisateurs" element={<Navigate to="/dashboard/visiteurs" replace />} />
          <Route path="visiteurs" element={<Utilisateurs listFilter="all" />} />
          <Route path="investisseurs" element={<Utilisateurs listFilter="investisseur" />} />
          <Route path="etudiants" element={<Utilisateurs listFilter="etudiant" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
