import React from 'react';
import RainGrid from './RainGrid'; // Import the RainGrid component

function App() {
  const rows = 15;  // Set number of rows
  const cols = 20;  // Set number of columns

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RainGrid rows={rows} cols={cols} />  {/* Render RainGrid with specified dimensions */}
    </div>
  );
}

export default App;