import React from 'react';
import Hero from '../components/Hero';
import HomeHighlights from '../components/HomeHighlights';
import CoreServices from '../components/CoreServices';
import EngagementProcess from '../components/EngagementProcess';
import Outcomes from '../components/Outcomes';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <HomeHighlights />
      <CoreServices />
      <EngagementProcess />
      <Outcomes />
      <Contact />
    </>
  );
};

export default Home;
