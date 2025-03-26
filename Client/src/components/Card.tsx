
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glassmorphism?: boolean;
}

const Card = ({ 
  children, 
  className, 
  hoverEffect = true, 
  glassmorphism = false
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden p-6 transition-all duration-300',
        glassmorphism ? 'glassmorphism' : 'bg-white shadow-md',
        hoverEffect && 'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
