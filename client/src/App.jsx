import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ItineraryDetailPage from './pages/ItineraryDetailPage';
import ItineraryManagerPage from './pages/ItineraryManagerPage';
import LoginPage from './pages/LoginPage';
import NewItineraryPage from './pages/NewItineraryPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/FAQ" element={null} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

{/**Rotta per la visualizzazione degli itinerari dell'utente */}
        <Route path='/personal-itinerary' element={
          <ProtectedRoute>
            <ItineraryManagerPage />
          </ProtectedRoute>
        } />

{/**Rotta per la visualizzazione in dettaglio di un itinerario */}
        <Route path='/personal-itinerary/:id' element={
          <ProtectedRoute>
            <ItineraryDetailPage />
          </ProtectedRoute>
        } />

{/**Rotta per la creazione di un nuovo itinerario */}
        <Route path='/personal-itinerary/new-itinerary' element={
          <ProtectedRoute>
            <NewItineraryPage />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
