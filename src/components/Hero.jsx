import React from 'react';
import { Shield, ArrowRight, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileTerminal from './MobileTerminal';
import CyberGrid from './CyberGrid';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        {/* Cyber grid canvas — auto-pauses off-screen */}
        <CyberGrid />
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500 rounded-full blur-3xl will-change-transform"
          />
          <motion.div 
             animate={{ 
              x: [0, -50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-700 rounded-full blur-3xl will-change-transform"
          />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="chip mb-8 justify-center lg:justify-start"
            >
              <Shield className="w-4 h-4" />
              <span>Cybersecurity Consulting</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Cybersecurity consulting that
              <span className="block bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                reduces risk and keeps you operational
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-400 mb-8"
            >
              Cloud Secure Canada delivers incident response, penetration testing, and SIEM/SOC engineering with a
              practical, no-nonsense approach. As a Toronto-based cyber security consultant, we deliver engagements
              remotely across Canada, the United States, and other countries such as the United Kingdom, Ireland,
              Australia, New Zealand, and Singapore. On-site support is available when needed.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 text-gray-300 text-sm md:text-base mb-10"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>Incident response & post-breach recovery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>Penetration testing (network, web, cloud)</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>SIEM/SOC engineering (Splunk, Sentinel)</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Link to="/#contact" className="btn-primary flex items-center space-x-2 group">
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
              </Link>
            </motion.div>

            {/* Mobile Terminal — visible only on small screens */}
            <MobileTerminal />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative hidden lg:block"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-teal-500 rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-dark-900/90 p-6 text-left shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-200/80 mb-5 border-b border-white/5 pb-4">
                  <div className="flex gap-2 mr-auto">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 font-mono text-primary-400">secure_term — zsh</span>
                </div>

                <div className="space-y-4 font-mono text-sm text-gray-200">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <p className="text-primary-100/80">
                      <span className="text-emerald-300">admin@cloudsecurecanada</span>
                      <span className="text-primary-300">:~$</span> cat engagement-options
                    </p>
                    <p className="mt-2 text-gray-300 pl-4 border-l-2 border-primary-500/20">
                      Flexible support for fast-moving security needs, from targeted assessments to long-term programs.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="space-y-2 text-gray-200 pl-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                  >
                    <p>
                      <span className="text-emerald-300">[01]</span> Rapid incident response and recovery <span className="text-gray-500">...Ready</span>
                    </p>
                    <p>
                      <span className="text-emerald-300">[02]</span> Security assessments <span className="text-gray-500">...Ready</span>
                    </p>
                    <p>
                      <span className="text-emerald-300">[03]</span> SIEM/SOC engineering <span className="text-gray-500">...Ready</span>
                    </p>
                  </motion.div>

                  <motion.div 
                    className="pt-2 text-primary-100/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    <span className="text-emerald-300">admin@cloudsecurecanada</span>
                    <span className="text-primary-300">:~$</span> location --site "Toronto • Remote"
                  </motion.div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
