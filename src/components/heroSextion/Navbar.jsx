import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";

const Navbar = () => {
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-sm flex justify-between px-8 items-center py-6">
      {/* logo */}
      <div>
        {" "}
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
  );
};

export default Navbar;
