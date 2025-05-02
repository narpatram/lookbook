import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import '../styles/MediaViewer.css';

const MediaViewer = ({ media, onNext, onPrev, onVideoEnd, onVideoProgress }) => {
  const [isMuted, setIsMuted] = useState(true);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="media-viewer">
      {media.type === 'image' ? (
        <img src={media.url} alt="Look" className="media-content" />
      ) : (
        <div className="video-container">
          <video
            src={media.url}
            className="media-content"
            autoPlay
            loop={false}
            muted={isMuted}
            playsInline
            onEnded={onVideoEnd}
            onTimeUpdate={onVideoProgress}
          />
          <button className="mute-button" onClick={handleMuteToggle}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      )}
      
      <button className="nav-button prev" onClick={onPrev}>
        <FaChevronLeft />
      </button>
      <button className="nav-button next" onClick={onNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MediaViewer; 