import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import MobileCTA from './components/MobileCTA';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';

// Secondary routes stay split; the initial home hero is part of the app shell.
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));

const PageFallback = () => (
  <div className="min-h-screen min-h-[100svh] flex items-center justify-center bg-dark-900">
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
  const scrolledRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const nextScrolled = window.scrollY > 50;

        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled;
          setScrolled(nextScrolled);
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen min-h-[100svh] bg-dark-900">
        <Navbar scrolled={scrolled} />
        <AnimatedRoutes />
        <Footer />
        <MobileCTA />
      </div>
    </Router>
  );
}

export default App;
