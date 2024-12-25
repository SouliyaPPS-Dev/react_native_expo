import React from 'react';

const VideoPlayer: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src='https://drive.google.com/file/d/1fl17ZBBmGpAgJ_1lG-s2PPMS1o17P7qo/preview'
        width='640'
        height='480'
        allow='autoplay'
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
