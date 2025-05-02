import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTh, FaCamera, FaBook, FaUser } from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: <FaHome />, label: 'Home' },
    { path: '/categories', icon: <FaTh />, label: 'Categories' },
    { path: '/looks', icon: <FaCamera />, label: 'Looks' },
    { path: '/stories', icon: <FaBook />, label: 'Stories' },
    { path: '/account', icon: <FaUser />, label: 'Account' }
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`nav-item ${location.pathname === tab.path ? 'active' : ''}`}
        >
          <div className="nav-icon">{tab.icon}</div>
          <div className="nav-label">{tab.label}</div>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation; 