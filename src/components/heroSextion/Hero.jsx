import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import CanvasAnimation from "../canvas/CanvasAnimation";
import About from "../About";
import frameImg  from "../../assets/frame.png"
import button    from "../../assets/button.jpg"

const Hero = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flowerAnimation, setFlowerAnimation] = useState(false);

  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const flowerRefs = useRef([]);

  // Flower images
  const flowerImages = [
    "/flowers/flower2.png", 
    "/flowers/flower3.png",
    "/flowers/flower4.png"
  ];

  const handleEnterClick = () => {
    setFlowerAnimation(true);
    
    if (flowerRefs.current.length > 0) {
      flowerRefs.current.forEach((flower, index) => {
        if (flower) {
          const delay = Math.random() * 0.5;
          
          gsap.set(flower, { visibility: "visible" });
          
          gsap.fromTo(flower, 
            { 
              opacity: 0, 
              scale: 0,
              rotation: Math.random() > 0.5 ? -60 : 60,
            },
            { 
              opacity: 1, 
              scale: 1, 
              rotation: Math.random() * 15 - 7.5,
              duration: 0.8 + Math.random() * 0.7,
              delay: delay,
              ease: "elastic.out(1, 0.45)"
            }
          );
        }
      });
    }
    
    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 700);
    }, 1800);
  };

  const generateNaturalFlowerPositions = (count) => {
    const positions = [];
    
    const topPositions = [
      { top: "-50px", left: "5%" },
      { top: "-50px", left: "30%" },
      { top: "-50px", left: "55%" },
      { top: "-50px", left: "80%" },
    ];
    
    const rightPositions = [
      { top: "10%", right: "-50px" },
      { top: "40%", right: "-50px" },
      { top: "70%", right: "-50px" },
    ];
    
    const bottomPositions = [
      { bottom: "-50px", left: "5%" },
      { bottom: "-50px", left: "30%" },
      { bottom: "-50px", left: "55%" },
      { bottom: "-50px", left: "80%" },
    ];
    
    const leftPositions = [
      { top: "10%", left: "-50px" },
      { top: "40%", left: "-50px" },
      { top: "70%", left: "-50px" },
    ];
    
    positions.push(...topPositions, ...rightPositions, ...bottomPositions, ...leftPositions);
    
    const remainingCount = count - positions.length;
    for (let i = 0; i < remainingCount; i++) {
      const side = Math.floor(Math.random() * 4);
      
      if (side === 0) {
        positions.push({
          top: -90 - Math.random() * 60,
          left: Math.random() * 100 + "%"
        });
      } else if (side === 1) {
        positions.push({
          top: Math.random() * 100 + "%",
          right: -90 - Math.random() * 60
        });
      } else if (side === 2) {
        positions.push({
          bottom: -90 - Math.random() * 60,
          left: Math.random() * 100 + "%"
        });
      } else {
        positions.push({
          top: Math.random() * 100 + "%",
          left: -90 - Math.random() * 60
        });
      }
    }
    
    return positions;
  };

  const flowerPositions = generateNaturalFlowerPositions(28);

  const frameStyle = {
    backgroundColor: "transparent",
    border: "none",
   
    backgroundImage: `url(${frameImg})`,
    backgroundSize: "contain", // Changed from cover to contain
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "670px",  // Adjusted to match frame proportions
    width: "670px",
    backgroundSize: "cover",  // Ensures image covers the full frame
   
    
  };
  return (
    <div className="bg-black min-h-screen">
      {/* Canvas Animation Background */}
      <div className="fixed inset-0 z-0">
        <CanvasAnimation frameSpeed={4} quality={2} />
      </div>
      
      {/* Photo Frame Overlay */}
      {showOverlay && (
        <div 
          className="fixed  inset-0 z-[100]  flex items-center justify-center"
          style={{ 
            opacity: isAnimating ? '0' : '1',
            transition: 'opacity 800ms',
          }}
        >
          <div 
            className="relative"
            style={{
              maxWidth: '90%', 
              ...frameStyle
            }}
          >
            {flowerPositions.map((position, index) => {
              const size = 100 + Math.floor(Math.random() * 100);
              const flowerImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
              
              return (
                <div 
                  key={index}
                  ref={el => flowerRefs.current[index] = el}
                  className="absolute z-10"
                  style={{
                    ...position,
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: 0,
                    visibility: "hidden",
                    pointerEvents: 'none',
                    transformOrigin: 'center',
                    filter: `brightness(${0.8 + Math.random() * 0.4})`
                  }}
                >
                  <img 
                    src={flowerImage} 
                    alt="Flower"
                    className="w-full h-full object-contain"
                    style={{ 
                      filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                </div>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handleEnterClick}
                className=" text-white font-bold py-4 px-14 rounded transition-all transform hover:scale-105 border-2 border-white text-2xl hover:backdrop-blur"
                style={{ backgroundImage: `url(${button})` }}
              >
                Dive In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Transparent Overlay */}
      {!showOverlay && (
        <>
          {/* Fixed Overlay Container */}
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-sm flex justify-between px-8 items-center py-6 pointer-events-auto">
              <div>
                <img ref={logoRef} className="w-40" src="logo2.png" alt="logo" />
              </div>
              
              <div className="flex gap-10">
                {[
                  { label: "Home", path: "#" },
                  { label: "About", path: "#" },
                  { label: "Accommodation", path: "#" },
                  { label: "Gallery", path: "#" },
                  { label: "Contact", path: "#" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    className="text-xl text-white hover:text-gray-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div>
                <button
                  ref={buttonRef}
                  className="text-xl bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors rounded-2xl px-6 py-2"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Hero Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
              <h5 className="text-xl font-semibold uppercase tracking-wider">
                ⭐ ⭐ ⭐ ⭐ ⭐
              </h5>
              <h5 className="text-xl font-semibold uppercase tracking-wider">
                unique place to relax & enjoy
              </h5>
              <h1 className="text-5xl md:text-7xl font-bold mb-2 uppercase">
                enjoy a luxury
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold uppercase">
                experience
              </h1>
              
              <button 
                className="border-white px-6 py-3 mt-10 w-50 border-1 pointer-events-auto"
              >
                Book now
              </button>
            </div>
          </div>
        </>
      )}  
    </div>
  );
};

export default Hero;