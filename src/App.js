import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { useEffect } from 'react';

import AOS from 'aos';

import 'aos/dist/aos.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// COMPONENTS
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Aboutus from './components/Aboutus';
import AddProduct from './components/AddProducts';
import MpesaPayment from './components/MpesaPayment';
import GetProduct from './components/GetProducts';
import Main from './components/Main';
import Chatbot from './components/Chatbot';
import Splash from './components/Splash';
import Cart from './components/Cart';

// =====================================================
// HEADER
// =====================================================

function Header() {

  const location = useLocation();

  // HIDE HEADER ON THESE PAGES
  const hideHeaderOnPaths = [
    '/',
    '/signin',
    '/signup',
    '/mpesapayment'
  ];

  if (
    hideHeaderOnPaths.includes(
      location.pathname
    )
  ) return null;

  return (

    <header className="App-header">

      <h1 className="display-1 mt-5">

        Cacao

      </h1>

    </header>

  );

}

// =====================================================
// APP
// =====================================================

function App() {

  useEffect(() => {

    AOS.init({

      duration: 1000,

      once: true

    });

  }, []);

  return (

    <Router>

      <div className="App">

        <Header />

        <Routes>

          {/* SPLASH SCREEN */}
          <Route
            path="/"
            element={<Splash />}
          />

          {/* AUTH */}
          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />

          {/* MAIN PAGES */}
          <Route
            path="/main"
            element={<Main />}
          />

          <Route
            path="/getproduct"
            element={<GetProduct />}
          />

          <Route
            path="/addproduct"
            element={<AddProduct />}
          />

          <Route
            path="/aboutus"
            element={<Aboutus />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* PAYMENT */}
          <Route
            path="/mpesapayment"
            element={<MpesaPayment />}
          />

          {/* CHATBOT */}
          <Route
            path="/chatbot"
            element={<Chatbot />}
          />

        </Routes>

      </div>

    </Router>

  );

}

export default App;
