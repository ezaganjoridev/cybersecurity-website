import React from 'react';

const LogoMark = ({ className = 'h-8 w-8' }) => (
  <span className={`relative inline-block shrink-0 ${className}`} aria-hidden="true">
    <img
      src="/shield.svg?v=3"
      alt=""
      width="64"
      height="64"
      className="theme-logo-dark absolute inset-0 h-full w-full"
    />
    <img
      src="/shield-light.svg?v=2"
      alt=""
      width="64"
      height="64"
      className="theme-logo-light absolute inset-0 h-full w-full"
    />
  </span>
);

export default LogoMark;
