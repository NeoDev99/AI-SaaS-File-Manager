import React from 'react';

import Nav from './components/Nav';
import Home from './components/Home';
import Page from './components/Page';
import Footer from './components/Footer';

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-100">
      <Nav />
      <div className='container'>
        <Home />
        <Page />
      </div>
      <Footer />
    </main>
  );
};
export default App;
