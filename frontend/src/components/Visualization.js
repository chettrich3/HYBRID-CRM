import React from 'react';

const Visualization = () => {
  return (
    <div>
      <h1>Ticket Status</h1>
      <p>Below are the ticket statuses by category of open tickets:</p>
      <p>Hover to see exact ticket counts.</p>
      <iframe src="/visualization.html" style={{ width: '100%', height: '600px', border: 'none' }}></iframe>
    </div>
  );
};

export default Visualization;
