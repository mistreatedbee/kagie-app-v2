import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

export function Logo({ className = '', alt = 'Kagie Stay' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      className={`block object-contain ${className}`} />
  );
}
