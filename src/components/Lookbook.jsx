import { useEffect, useState } from 'react';
import Look from './Look';
import '../styles/Lookbook.css';
import looksData from '../data/looks.json';

const Lookbook = () => {
  const [looks, setLooks] = useState([]);

  useEffect(() => {
    setLooks(looksData.looks);
  }, []);

  if (looks.length === 0) {
    return <div className="loading">Loading looks...</div>;
  }

  return (
    <div className="lookbook-feed">
      {looks.map((look, idx) => (
        <div className="lookbook-feed-item" key={look.id}>
          <Look look={look} />
        </div>
      ))}
    </div>
  );
};

export default Lookbook; 