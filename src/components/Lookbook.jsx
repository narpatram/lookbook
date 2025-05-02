import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Look from './Look';
import '../styles/Lookbook.css';

// Import media for look1
const look1Image1 = '/looks/look1/image1.jpg';
const look1Image2 = '/looks/look1/image2.jpeg';
const look1Video1 = '/looks/look1/video1.mp4';

// Import media for look2
const look2Image1 = '/looks/look2/image1.jpg';
const look2Image2 = '/looks/look2/image2.jpg';
const look2Video1 = '/looks/look2/video1.mp4';

const Lookbook = () => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [looks, setLooks] = useState([
    {
      id: 1,
      name: "Summer Collection",
      media: [
        {
          type: 'image',
          url: look1Image1
        },
        {
            type: 'video',
            url: look1Video1
          },
        {
          type: 'image',
          url: look1Image2
        },
        
      ],
      products: [
        { id: 1, name: 'Summer Dress', price: 99.99, x: 30, y: 40 },
        { id: 2, name: 'Sunglasses', price: 149.99, x: 60, y: 70 }
      ]
    },
    {
      id: 2,
      name: "Winter Collection",
      media: [
        {
          type: 'image',
          url: look2Image1
        },
        {
            type: 'video',
            url: look2Video1
          },
        {
          type: 'image',
          url: look2Image2
        },
        
      ],
      products: [
        { id: 3, name: 'Winter Coat', price: 199.99, x: 50, y: 30 },
        { id: 4, name: 'Wool Scarf', price: 79.99, x: 40, y: 60 }
      ]
    }
  ]);

  const handlers = useSwipeable({
    onSwipedUp: (eventData) => {
      console.log('Swiped Up:', eventData);
      handleNextLook();
    },
    onSwipedDown: (eventData) => {
      console.log('Swiped Down:', eventData);
      handlePrevLook();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    delta: 50,
    swipeDuration: 1000,
    trackVelocity: true,
    velocityThreshold: 0.3
  });

  const handleNextLook = () => {
    console.log('Moving to next look');
    setCurrentLookIndex((prev) => (prev + 1) % looks.length);
  };

  const handlePrevLook = () => {
    console.log('Moving to previous look');
    setCurrentLookIndex((prev) => (prev - 1 + looks.length) % looks.length);
  };

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