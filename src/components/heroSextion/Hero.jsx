import React, { useState } from "react";
import bg from "../../assets/bg.png";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";

const Hero = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const h3Ref = useRef(null);

  const handleEnterClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 800); // Animation duration
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

  return (
    <div className="bg-black min-h-screen">
      {/* Photo Frame Overlay */}
      {showOverlay && (
        <div 
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          style={{ 
            opacity: isAnimating ? '0' : '1',
            transition: 'opacity 800ms',
          }}
        >
          <div 
            className="relative p-8 border-8 bg-black/30 backdrop-blur-sm rounded-lg shadow-2xl"
            style={{ 
              maxWidth: '90%', 
              width: '600px', 
              borderColor: '#d4af37', 
              transition: 'all 800ms',
              transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
              opacity: isAnimating ? '0' : '1'
            }}
          >
            {/* Photo frame header */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full" style={{ backgroundColor: '#d4af37' }}>
              <h3 className="text-xl font-semibold text-black m-0">River Ranch</h3>
            </div>
            
            {/* Image inside frame */}
            <div className="p-3 border-2 rounded" style={{ borderColor: 'rgba(212, 175, 55, 0.5)' }}>
              <img 
                src={bg} 
                alt="River Ranch Welcome" 
                className="w-full rounded shadow-lg"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            
            {/* Welcome text */}
            <div className="text-center mt-6 mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Welcome to Paradise</h2>
              <p className="text-white/80">Experience the luxury and tranquility of River Ranch</p>
            </div>
            
            {/* Enter button */}
            <div className="flex justify-center">
              <button 
                onClick={handleEnterClick}
                className="hover:bg-gold/80 text-black font-bold py-3 px-10 rounded-full transition-all transform hover:scale-105"
                style={{ backgroundColor: '#d4af37' }}
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
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={bg}
                alt="background"
                className="h-full w-full object-cover"
              />
              {/* Optional overlay for better contrast */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

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
  );
};

export default Hero;
