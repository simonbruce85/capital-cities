import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameByCountry from './components/game/GameByCountry';
import GameByCapital from './components/game/GameByCapital';
import GameByFlags from './components/game/GameByFlags';

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
            questions={countries.length}
          />} />
           <Route path="/byCountryQuick" element={
            <GameByCountry countries={countries}
            questions={20}
          />} />
          <Route path="/byCapital" element={
          <GameByCapital countries={countries} questions={countries.length}
          />} />
          <Route path="/byCapitalQuick" element={
          <GameByCapital countries={countries} questions={20}
          />} />
          <Route path="/byFlagsQuick" element={
          <GameByFlags countries={countries} questions={20}
          />} />
          <Route path="/byFlags" element={
          <GameByFlags countries={countries} questions={countries.length}
          />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
