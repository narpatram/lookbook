import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Look from './Look';
import '../styles/Lookbook.css';
import looksData from '../data/looks.json';

const Lookbook = () => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [looks, setLooks] = useState([]);

  useEffect(() => {
    // Load looks from the JSON file
    setLooks(looksData.looks);
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => handleNextLook(),
    onSwipedDown: () => handlePrevLook(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    delta: 50,
    swipeDuration: 1000,
    trackVelocity: true,
    velocityThreshold: 0.3
  });

  const handleNextLook = () => {
    setCurrentLookIndex((prev) => (prev + 1) % looks.length);
  };

  const handlePrevLook = () => {
    setCurrentLookIndex((prev) => (prev - 1 + looks.length) % looks.length);
  };

  if (looks.length === 0) {
    return <div className="loading">Loading looks...</div>;
  }

  return (
    <div className="lookbook" {...handlers}>
      <div className="lookbook-container">
        <Look 
          look={looks[currentLookIndex]} 
          onNext={handleNextLook}
          onPrev={handlePrevLook}
        />
      </div>
    </div>
  );
};

export default Lookbook; 