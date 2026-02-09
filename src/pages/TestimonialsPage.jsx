import React from 'react';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const TestimonialsPage = () => {
  return (
    <>
      <SEO 
        title="Testimonials | ZedGar Solutions"
        description="See what our clients say about our cybersecurity services, from Incident Response to Penetration Testing."
        keywords="cybersecurity testimonials, client reviews, case studies, trusted partner"
      />
      <div className="pt-24 min-h-screen bg-dark-900 surface-grid">
        <Testimonials />
      </div>
    </>
  );
};

export default TestimonialsPage;
