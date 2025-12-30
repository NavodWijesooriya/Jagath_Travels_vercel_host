import React from 'react'

import Gallery from '@/components/product/gallery/Gallery';
import Title from "@/components/Title/Title";
import Footer from "@/components/common/footer/Footer";
import Navbar from '@/components/common/header/Navbar';
import GalleryHero from '@/components/product/gallery/GalleryHero';

function places() {
  return (
    <div>
      <Navbar />
      <GalleryHero />
     
      <Gallery Gallerylimits={1000} />
      <Footer />
    </div>
  )
}

export default places