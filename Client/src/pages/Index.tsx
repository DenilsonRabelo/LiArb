
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Organization from '@/components/Organization';
import Structure from '@/components/Structure';
import Competitions from '@/components/Competitions';
import Academy from '@/components/Academy';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <Organization />
      <Structure />
      <Competitions />
      <Academy />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
