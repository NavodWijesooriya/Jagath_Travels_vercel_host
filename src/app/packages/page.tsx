import React from 'react'
import Navbar from '@/components/common/header/Navbar';
import HomePackage from '@/components/HomePackage/HomePackage';
import HomeCategoryButtons from '@/components/product/CategoryButtons/HomeCategoryButtons';
import Footer from "@/components/common/footer/Footer";
import HomePackageHero from '@/components/HomePackage/HomePackageHero';

function packages() {

  return (
    <div data-theme='white'><div>
      <Navbar />
     
     
      <HomePackageHero />
      <HomeCategoryButtons />
    </div>
      <div className="mt-10">
        <HomePackage limits={100} />
        <Footer />
      </div>
    </div>
  )
}

export default packages