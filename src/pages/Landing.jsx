import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/landingpage/Hero';
import About from '../components/landingpage/About';
import Contact from '../components/landingpage/Contact';
import Gallery from '../components/landingpage/Gallery';
// import Article from '../components/landingpage/Article';

const Landing = () => {
  return <>
    <Navbar />
    <Hero />
    <About />
    <Gallery />
    {/* <Article /> */}
    <Contact />
    <Footer />
  </>;
}

export default Landing