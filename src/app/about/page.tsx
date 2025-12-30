
import React from 'react'
import About from '@/components/about/About'
import Footer from "@/components/common/footer/Footer";
import Navbar from '@/components/common/header/Navbar';
import Script from 'next/script';


function about() {
  return (
    <div>
   <Navbar />

      <About />
      <Footer />
      <Script
        src={`/js/gt.min.js?v=${new Date().getTime()}`} // Unique query param
        strategy="afterInteractive"
      />
    </div>
  )
}

export default about