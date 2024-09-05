import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameByCountry from './components/game/GameByCountry';
import GameByCapital from './components/game/GameByCapital';
import { countries } from './countries'; // Import the data


function App() {

  const options = [
    { id: 1, city: 'Berlin' },
    { id: 2, city: 'Paris' },
    { id: 3, city: 'Madrid' },
    { id: 4, city: 'Rome' },
    { id: 5, city: 'Vienna' },
    { id: 6, city: 'Brussels' }
  ];
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/byCountry" element={
            <GameByCountry countries={countries}
          />} />
          <Route path="/byCapital" element={
          <GameByCapital countries={countries}
          />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
