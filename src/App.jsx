import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lookbook from './components/Lookbook';
import Navigation from './components/Navigation';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div className="page">Home Page</div>} />
          <Route path="/categories" element={<div className="page">Categories Page</div>} />
          <Route path="/looks" element={<Lookbook />} />
          <Route path="/stories" element={<div className="page">Stories Page</div>} />
          <Route path="/account" element={<div className="page">Account Page</div>} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
