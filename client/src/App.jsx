import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/registration" element={<RegistrationPage />}/>
          <Route path="/FAQ" element={null}/>
          <Route path="/profile" element={
              <ProtectedRoute>
                  <ProfilePage />
              </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
