import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Ticket Management System</h1>
      <p>Select an option to proceed:</p>
      <div>
        <Link to="/manage-tickets"><button>Manage Tickets</button></Link>
        <Link to="/prioritization"><button>Prioritization</button></Link>
        <Link to="/visualization"><button>Status Dashboard</button></Link>
      </div>
    </div>
  );
};

export default Home;
