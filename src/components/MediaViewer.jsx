import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaVolumeMute, FaVolumeUp, FaPause, FaPlay } from 'react-icons/fa';
import '../styles/MediaViewer.css';

const MediaViewer = ({ media, onNext, onPrev, onVideoEnd, onVideoProgress, isPaused }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (media.type === 'video' && videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPaused, media.type]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const getMediaUrl = () => {
    return `/looks/${media.folder}/${media.url}`;
  };

  return (
    <div className="media-viewer">
      {media.type === 'image' ? (
        <img src={getMediaUrl()} alt="Look" className="media-content" />
      ) : (
        <div className="video-container">
          <video
            ref={videoRef}
            src={getMediaUrl()}
            className="media-content"
            autoPlay
            loop={false}
            muted={isMuted}
            playsInline
            onEnded={onVideoEnd}
            onTimeUpdate={onVideoProgress}
          />
          <div className="video-controls">
            <button className="mute-button" onClick={handleMuteToggle}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button className="play-pause-button">
              {isPaused ? <FaPause /> : <FaPlay />}
            </button>
          </div>
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