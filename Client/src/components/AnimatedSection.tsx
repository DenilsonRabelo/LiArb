
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (direction) {
      case 'up':
        return 'animate-fade-in';
      case 'left':
        return 'animate-fade-in-left';
      case 'right':
        return 'animate-fade-in-right';
      case 'none':
        return 'opacity-100';
      default:
        return 'animate-fade-in';
    }
  };

  const getDelayClass = () => {
    if (delay === 0) return '';
    return `animation-delay-${delay}`;
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        getAnimationClass(),
        getDelayClass(),
        'opacity-0',
        className
      )}
      style={{ animationDelay: delay ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
