import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import './App.css';
import MagicCursor from './components/MagicCursor';
import GoldenSnitch from './components/GoldenSnitch';
import MagicalBackground from './components/MagicalBackground';

function App() {
  return (
    <div className="app-container">
      <MagicalBackground />
      <MagicCursor />
      <GoldenSnitch />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
