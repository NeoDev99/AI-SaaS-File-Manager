import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, RedirectToSignIn } from "@clerk/clerk-react";

import './styles/globals.css';

import Nav from './components/Nav';
import Home from "./pages/Home";
{/*import Footer from './components/Footer';*/}
import FileManager from "./components/FileManager";
import SignIn from "./pages/SignIn";
import ContactPage from "./pages/ContactPage";
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file-viewer" element={
              <SignedIn>
                <FileManager />
              </SignedIn>
            } />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<RedirectToSignIn />} />
          </Routes>
        </div>

        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
