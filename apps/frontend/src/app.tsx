/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { WhyHireMe } from './components/WhyHireMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';

import { portfolioService } from './services/portfolioService';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Track visit
  useEffect(() => {
    if (path !== '/admin') {
      portfolioService.trackVisit().catch(err => console.error('Visit tracking failed', err));
    }
  }, [path]);

  if (path === '/admin') {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00D1FF]/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <WhyHireMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
