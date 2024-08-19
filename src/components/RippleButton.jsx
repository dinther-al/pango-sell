import React, { useState } from 'react';

const RippleButton = ({ children, onClick, className }) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const size = Math.max(buttonRect.width, buttonRect.height);
    const x = e.clientX - buttonRect.left - size / 2;
    const y = e.clientY - buttonRect.top - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 400);

    onClick && onClick();
  };

  return (
    <button className={`ripple-btn ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="ripple-effect"
          style={{
            top: ripple.y + 'px',
            left: ripple.x + 'px',
            width: ripple.size + 'px',
            height: ripple.size + 'px',
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
