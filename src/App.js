import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Aboutus from './components/Aboutus';
import MpesaPayment from './components/MpesaPayment';
import GetProduct from './components/GetProducts';
import Main from './components/Main';
import Chatbot from './components/Chatbot';  
import Splash from './components/Splash';  // Import the Splash component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header() {
  const location = useLocation();
  const hideHeaderOnPaths = ['/signin', '/signup', '/']; // Paths without header

  return !hideHeaderOnPaths.includes(location.pathname) ? (
    <header className="App-header">
      <h1 className="display-1 mt-5">
      </h1>
    </header>
  ) : null;
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mpesapayment" element={<MpesaPayment />} />
          <Route path="/getproduct" element={<GetProduct />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<Splash />} /> {/* Splash screen is now the default route */}
          <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot only appears on this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
