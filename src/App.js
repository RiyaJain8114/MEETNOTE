import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.jsx';
import Mom from './pages/Mom.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
    <div className='app'><Navbar/></div>
    <Home/>
    <Mom/>
    </>
  );
}

export default App;
