
import React from 'react';

interface LogoProps {
  size?: number;
  variant?: 'default' | 'white';
}

const Logo = ({ size = 40, variant = 'default' }: LogoProps) => {
  const textColor = variant === 'white' ? 'text-white' : 'bg-clip-text text-transparent bg-dual-gradient';
  
  return (
    <div className="flex items-center">
      <div 
        className={`flex items-center justify-center rounded-md mr-2 ${
          variant === 'white' ? 'bg-liarb-purple-light' : 'bg-liarb-purple'
        }`}
        style={{ width: size, height: size }}
      >
        <span className={`text-white font-bold`} style={{ fontSize: size * 0.5 }}>
          L
        </span>
      </div>
      <span className={`font-bold ${textColor}`} style={{ fontSize: size * 0.5 }}>
        LiArb
      </span>
    </div>
  );
};

export default Logo;
