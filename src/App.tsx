import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameByCountry from './components/game/GameByCountry';
import GameByCapital from './components/game/GameByCapital';
import { countries } from './countries'; // Import the data


function App() {
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
