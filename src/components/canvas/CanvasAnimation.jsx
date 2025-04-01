import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const CanvasAnimation = ({ frameSpeed, quality }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const images = useRef([]);
  const birdsRef = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    // Set canvas dimensions and handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * quality; // Increase width based on quality
      canvas.height = window.innerHeight * quality; // Increase height based on quality
      
      // If we have a loaded image, redraw it
      if (images.current.length > 0 && images.current[0].complete) {
        loadImage(0);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load and play the frame animation
    const loadFrameAnimation = () => {
      const frames = { currentIndex: 0, maxIndex: 64 };
      let imageLoaded = 0;
      
      function preloadImages() {
        setLoading(true);
        for (let i = 1; i <= frames.maxIndex; i++) {
          const img = new Image();
          img.src = `/frames/frame_${i.toString().padStart(4, "0")}.jpg`;
          img.onload = () => {
            imageLoaded++;
            if (imageLoaded === 1) {
              loadImage(0);
            }
            if (imageLoaded === frames.maxIndex) {
              setLoading(false);
              startScrollAnimation(frames);
            }
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
          };
          images.current.push(img);
        }
      }
      
      function loadImage(index) {
        if (index >= 0 && index < images.current.length) {
          const img = images.current[index];
          if (!img.complete) return;
          
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          const scale = Math.max(scaleX, scaleY);
          
          const newWidth = img.width * scale;
          const newHeight = img.height * scale;
          
          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";
          context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        }
      }
      
      function startScrollAnimation(frames) {
        // Create a scrollable area for the animation
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'scroll-container';
        scrollContainer.style.height = '300vh'; // Height for scroll area
        scrollContainer.style.position = 'absolute';
        scrollContainer.style.width = '100%';
        scrollContainer.style.top = '100vh'; // Start after first viewport
        scrollContainer.style.zIndex = '-1'; // Behind canvas
        document.body.appendChild(scrollContainer);
        
        // Create animation that's controlled by scroll position
        gsap.to(frames, {
          currentIndex: frames.maxIndex - 1,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: frameSpeed, // Adjust scrub speed based on frameSpeed prop
            markers: false,
            onUpdate: self => {
              const progress = self.progress;
              const frameIndex = Math.floor(progress * (frames.maxIndex - 1));
              loadImage(frameIndex);
            }
          }
        });
      }
      
      preloadImages();
    };
    
    // Start loading frames and animation
    loadFrameAnimation();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      const scrollContainer = document.querySelector('.scroll-container');
      if (scrollContainer) {
        scrollContainer.remove();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [frameSpeed, quality]);
  
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-zinc-900">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80">
          <div className="text-xl flex flex-col items-center">
            <div className="mb-3">Loading animation...</div>
            <div className="w-16 h-16 border-4 border-t-amber-500 border-b-pink-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}
      />
    </div>
  );
};

export default CanvasAnimation;