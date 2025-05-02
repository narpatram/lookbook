import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence, motion } from 'framer-motion';
import MediaViewer from './MediaViewer';
import ProductAnnotation from './ProductAnnotation';
import { getDisplayName } from '../utils/stringUtils';
import '../styles/Look.css';

const swipeVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
    transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } },
  }),
};

const Look = ({ look }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showProductCard, setShowProductCard] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentMediaIndex(0);
    setProgress(0);
    setIsPaused(false);
    setDirection(0);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [look.id]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextMedia(),
    onSwipedRight: () => handlePrevMedia(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500
  });

  const startProgress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (look.media[currentMediaIndex]?.type === 'image' && !isPaused) {
      setProgress(0);
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 5000) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setDirection(1);
          setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % look.media.length);
        }
      }, 16);
    }
  };

  const handleVideoProgress = (event) => {
    if (event.target.duration) {
      const videoProgress = (event.target.currentTime / event.target.duration) * 100;
      setProgress(videoProgress);
    }
  };

  const handleVideoEnd = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgress(100);
    setDirection(1);
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % look.media.length);
  };

  useEffect(() => {
    setProgress(0);
    startProgress();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentMediaIndex, isPaused, look.media]);

  const handleNextMedia = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDirection(1);
    setCurrentMediaIndex((prev) => (prev + 1) % look.media.length);
  };

  const handlePrevMedia = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDirection(-1);
    setCurrentMediaIndex((prev) => (prev - 1 + look.media.length) % look.media.length);
  };

  const handleProductClick = (product) => {
    setShowProductCard(product);
  };

  const handleProgressBarClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newIndex = Math.floor(clickPosition * look.media.length);
    setDirection(newIndex > currentMediaIndex ? 1 : -1);
    setCurrentMediaIndex(newIndex);
    setProgress(0);
  };

  const handleMediaAreaClick = () => {
    setIsPaused(!isPaused);
  };

  const currentMedia = look.media[currentMediaIndex];
  const isImage = currentMedia?.type === 'image';

  return (
    <div className="look" {...handlers}>
      <div className="look-container">
        <div className="look-header">
          <h2>{getDisplayName(look.folder, look.name)}</h2>
          <div className="media-counter">
            {currentMediaIndex + 1} / {look.media.length}
          </div>
        </div>

        <div 
          className="media-area"
          onClick={handleMediaAreaClick}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentMediaIndex}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%' }}
            >
              {currentMedia && (
                <MediaViewer
                  media={{ ...currentMedia, folder: look.folder }}
                  onNext={handleNextMedia}
                  onPrev={handlePrevMedia}
                  onVideoEnd={handleVideoEnd}
                  onVideoProgress={handleVideoProgress}
                  isPaused={isPaused}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div 
          className="progress-container"
          ref={progressRef}
          onClick={handleProgressBarClick}
        >
          {look.media.map((_, index) => (
            <div 
              key={index}
              className="progress-segment"
              style={{
                width: `${100 / look.media.length}%`,
                backgroundColor: index === currentMediaIndex ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'
              }}
            >
              {index === currentMediaIndex && (
                <div 
                  className="progress"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: isPaused ? 'rgba(255, 255, 255, 0.7)' : 'white'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {isImage && currentMedia.products && currentMedia.products.length > 0 && currentMedia.products.map((product) => (
          <ProductAnnotation
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product)}
            isPaused={isPaused}
          />
        ))}

        {showProductCard && (
          <div className="product-card">
            <h3>{showProductCard.name}</h3>
            <p>${showProductCard.price}</p>
            <button onClick={() => window.location.href = `/product/${showProductCard.id}`}>
              Shop Now
            </button>
            <button onClick={() => setShowProductCard(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Look; 