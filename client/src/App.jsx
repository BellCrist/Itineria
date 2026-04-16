import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') === 'true');
  const [inputs, setValue] = useState({
    firstname: "",
    lastname: ""
  });

  const handleSubmit = () => {
    alert(`Welcome ${inputs.firstname} ${inputs.lastname}`)
  }

  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    setValue(values => ({...values, [nome]:value}))
  }

  return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={isLogged ? <HomePage /> : <LoginPage />}/>
          <Route path="/registration" element={<RegistrationPage />}/>
          <Route path="/FAQ" element={null}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
