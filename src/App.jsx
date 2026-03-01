import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import MobileCTA from './components/MobileCTA';
import PageTransition from './components/PageTransition';

// Lazy-load pages for better initial load performance
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <PageTransition locationKey={location.pathname}>
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-dark-900">
        <Navbar scrolled={scrolled} />
        <AnimatedRoutes />
        <Footer />
        <MobileCTA />
      </div>
    </Router>
  );
}

export default App;
