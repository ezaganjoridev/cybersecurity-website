import React from 'react';
import HomeHighlights from './HomeHighlights';
import CoreServices from './CoreServices';
import IndustriesServed from './IndustriesServed';
import LocationsServed from './LocationsServed';
import EngagementProcess from './EngagementProcess';
import Outcomes from './Outcomes';
import Contact from './Contact';

const HomeSections = () => (
  <>
    <HomeHighlights />
    <CoreServices />
    <IndustriesServed />
    <EngagementProcess />
    <LocationsServed />
    <Outcomes />
    <Contact />
  </>
);

export default HomeSections;
