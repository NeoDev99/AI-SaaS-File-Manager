import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Home from './components/Home';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <Home />
      <h1>React Frontend</h1>
      {data && <p>Data from the backend: {data.message}</p>}
    </div>
  );
}

export default App;
