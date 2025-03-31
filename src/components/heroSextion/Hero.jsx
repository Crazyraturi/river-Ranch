import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import CanvasAnimation from "../canvas/CanvasAnimation";
import About from "../About";

const Hero = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flowerAnimation, setFlowerAnimation] = useState(false);

  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const h3Ref = useRef(null);
  const frameRef = useRef(null);
  const flowerRefs = useRef([]);

  // Using all available flower images
  const flowerImages = [
    "/flowers/flower2.png", 
    "/flowers/flower3.png",
    "/flowers/flower4.png"
  ];

  const handleEnterClick = () => {
    setFlowerAnimation(true);
    
    // Animate flowers with GSAP when the button is clicked
    if (flowerRefs.current.length > 0) {
      flowerRefs.current.forEach((flower, index) => {
        if (flower) {
          // Reduce delay range to 0-0.5 seconds for quicker blooming
          const delay = Math.random() * 0.5;
          
          // First make the flower visible
          gsap.set(flower, { visibility: "visible" });
          
          // Then animate with unique values for each flower
          gsap.fromTo(flower, 
            { 
              opacity: 0, 
              scale: 0,
              rotation: Math.random() > 0.5 ? -60 : 60, // Increased rotation range
            },
            { 
              opacity: 1, 
              scale: 1, 
              rotation: Math.random() * 15 - 7.5, // Wider range for final rotation
              duration: 0.8 + Math.random() * 0.7, // Shorter duration (0.8-1.5s)
              delay: delay,
              ease: "elastic.out(1, 0.45)" // Slightly more bounce
            }
          );
        }
      });
    }
    
    // Reduced delay before redirecting to main page
    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 700); // Animation duration
    }, 1800); // Much shorter delay (1.8s) to see flowers bloom then redirect
  };

  // Simple GSAP animation for navbar and hero content
  useEffect(() => {
    if (!showOverlay) {
      const tl = gsap.timeline();
      
      tl.from(logoRef.current, {
        opacity: 0,
        y: -60,
        ease: "Power2.out",
      });

      tl.from(menuItemsRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.5,
        stagger: 0.2,
        ease: "Power2.out",
      });

      tl.from(buttonRef.current, {
        opacity: 0,
        y: -60,
        ease: "Power2.out",
      });

      tl.from(h1Ref.current, {
        opacity: 0,
        x: -60,
        ease: "Power2.out",
      });

      tl.from(h2Ref.current, {
        opacity: 0,
        x: -60,
        ease: "Power2.out",
      });

      tl.from(h3Ref.current, {
        opacity: 0,
        x: 60,
        ease: "Power2.out",
      });
    }
  }, [showOverlay]);

  // Create more natural, uneven flower positions around the frame
  const generateNaturalFlowerPositions = (count) => {
    const positions = [];
    
    // Cluster positions - less evenly spaced, more natural groupings
    const topPositions = [
      { top: -110, left: -80 },        // Far top left
      { top: -90, left: -40 },         // Top left closer to frame
      { top: -105, left: "10%" },      // Top left section
      { top: -115, left: "35%" },      // Top left-center
      { top: -95, left: "55%" },       // Top right-center
      { top: -110, left: "78%" },      // Top right section
      { top: -100, right: -50 },       // Top right closer to frame
      { top: -120, right: -90 },       // Far top right
    ];
    
    const rightPositions = [
      { top: "5%", right: -105 },      // Upper right
      { top: "20%", right: -90 },      // Upper-mid right
      { top: "40%", right: -110 },     // Mid right
      { top: "65%", right: -95 },      // Lower-mid right
      { top: "85%", right: -100 },     // Lower right
    ];
    
    const bottomPositions = [
      { bottom: -95, right: -70 },     // Bottom right
      { bottom: -105, right: "15%" },  // Bottom right section
      { bottom: -90, right: "42%" },   // Bottom right-center 
      { bottom: -110, left: "38%" },   // Bottom left-center
      { bottom: -95, left: "12%" },    // Bottom left section
      { bottom: -115, left: -65 },     // Bottom left
    ];
    
    const leftPositions = [
      { top: "10%", left: -95 },       // Upper left
      { top: "28%", left: -110 },      // Upper-mid left
      { top: "50%", left: -100 },      // Mid left
      { top: "72%", left: -105 },      // Lower-mid left
      { top: "90%", left: -95 },       // Lower left
    ];
    
    // Add all predefined positions
    positions.push(...topPositions, ...rightPositions, ...bottomPositions, ...leftPositions);
    
    // Add a few more completely random positions if needed
    const remainingCount = count - positions.length;
    for (let i = 0; i < remainingCount; i++) {
      const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      
      if (side === 0) { // Top
        positions.push({
          top: -90 - Math.random() * 60,
          left: Math.random() * 100 + "%"
        });
      } else if (side === 1) { // Right
        positions.push({
          top: Math.random() * 100 + "%",
          right: -90 - Math.random() * 60
        });
      } else if (side === 2) { // Bottom
        positions.push({
          bottom: -90 - Math.random() * 60,
          left: Math.random() * 100 + "%"
        });
      } else { // Left
        positions.push({
          top: Math.random() * 100 + "%",
          left: -90 - Math.random() * 60
        });
      }
    }
    
    return positions;
  };

  const flowerPositions = generateNaturalFlowerPositions(28); // Generate more flowers for fuller appearance

  // Simple frame style
  const frameStyle = {
    backgroundColor: 'transparent',
    border: '30px solid #3e2723',
    borderImage: 'linear-gradient(45deg, #5d4037, #8d6e63, #5d4037, #8d6e63) 30',
    borderRadius: '8px',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.7)'
  };

  return (
    <div className="bg-black">
      {/* Fixed height for Hero section */}
      <div className="relative h-screen overflow-hidden">
        {/* Canvas Animation Background */}
        <div className="fixed inset-0 z-0">
          <CanvasAnimation />
        </div>
        
        {/* Photo Frame Overlay */}
        {showOverlay && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ 
              opacity: isAnimating ? '0' : '1',
              transition: 'opacity 800ms',
            }}
          >
            <div 
              ref={frameRef}
              className="relative"
              style={{
                maxWidth: '90%', 
                width: '500px',  // Wider frame
                height: '670px', // Taller height for vertical frame
                transition: 'all 800ms',
                transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
                opacity: isAnimating ? '0' : '1',
                ...frameStyle
              }}
            >
              {/* Flower images positioned around the frame */}
              {flowerPositions.map((position, index) => {
                // Calculate random size between 100px and 200px (wider range)
                const size = 100 + Math.floor(Math.random() * 100);
                
                // Randomly select one of the flower images
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
                      opacity: 0, // Start invisible
                      visibility: "hidden", // Hide initially
                      pointerEvents: 'none',
                      transformOrigin: 'center', // Set transform origin for better rotation
                      filter: `brightness(${0.8 + Math.random() * 0.4})` // Random brightness for depth (wider range)
                    }}
                  >
                    {/* Using actual flower images with random size and rotation */}
                    <img 
                      src={flowerImage} 
                      alt="Flower"
                      className="w-full h-full object-contain"
                      style={{ 
                        filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))",
                        transform: `rotate(${Math.random() * 360}deg)` // Random rotation
                      }}
                    />
                  </div>
                );
              })}
              
              {/* Just the button - no other content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleEnterClick}
                  className="bg-transparent text-white font-bold py-4 px-14 rounded-full transition-all transform hover:scale-105 border-2 border-white text-2xl tracking-widest backdrop-blur-sm hover:backdrop-blur"
                >
                  Dive In
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section with Navbar */}
        {!showOverlay && (
          <>
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm flex justify-between px-8 items-center py-6">
              {/* logo */}
              <div>
                <img ref={logoRef} className="w-40" src="logo2.png" alt="logo" />
              </div>
              {/* nav-menu */}
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
              {/* button */}
              <div>
                <button
                  ref={buttonRef}
                  className="text-xl bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors rounded-2xl px-6 py-2"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative w-full h-screen overflow-hidden">
              {/* Add overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Hero Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center text-white">
                <h5
                  ref={h1Ref}
                  className="text-xl font-semibold uppercase px-[33%] tracking-wider"
                >
                  welcome to river ranch
                </h5>
                <h1
                  ref={h2Ref}
                  className="text-5xl md:text-7xl font-bold mb-2 px-[33%] uppercase"
                >
                  treasure
                </h1>
                <h1
                  ref={h3Ref}
                  className="text-5xl md:text-7xl w-full font-bold uppercase pl-[52%]"
                >
                  your holiday
                </h1>
              </div>
            </div>
          </>
        )}
      </div>

      {/* About Section */}
      <About /> {/* This will be directly below the Hero section */}
    </div>
  );
};

export default Hero;
