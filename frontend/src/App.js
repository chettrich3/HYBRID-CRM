
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ManageTickets from './components/ManageTickets';
import Prioritization from './components/Prioritization';
import Visualization from './components/Visualization';  

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/manage-tickets">Manage Tickets</Link></li>
            <li><Link to="/prioritization">Prioritization</Link></li>
            <li><Link to="/visualization">Status Dashboard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/manage-tickets" element={<ManageTickets />} />
          <Route path="/prioritization" element={<Prioritization />} />
          <Route path="/visualization" element={<Visualization />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
