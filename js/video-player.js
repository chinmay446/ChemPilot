// Enhanced video background player with error handling
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.bg-video-wrapper video');
  
  videos.forEach(video => {
    // Set video properties
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    // Try to play the video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch(error => {
          console.warn('Video autoplay failed:', error);
          // Fallback: try to play on user interaction
          document.addEventListener('click', function playOnClick() {
            video.play().catch(err => console.warn('Play failed:', err));
            document.removeEventListener('click', playOnClick);
          }, { once: true });
        });
    }
    
    // Handle video load errors
    video.addEventListener('error', function() {
      console.error('Video failed to load:', this.error);
      console.error('Video src:', this.querySelector('source')?.src);
    });
    
    // Log when video metadata is loaded
    video.addEventListener('loadedmetadata', function() {
      console.log('Video metadata loaded successfully');
    });
  });
});
