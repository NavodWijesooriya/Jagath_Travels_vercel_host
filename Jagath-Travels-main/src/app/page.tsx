import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import dynamic from 'next/dynamic';
import Footer from "../components/common/footer/Footer";
// import HomePackage from "@/components/HomePackage/HomePackage";
import Gallery from "@/components/product/gallery/Gallery";
import HomeCategoryButtons from "@/components/product/CategoryButtons/HomeCategoryButtons";
import EmblaCarousel from "@/components/Events/EmblaCarousel";
import Title from "@/components/Title/Title";
import Button from "@/components/common/button/Button";
import Link from "next/link";
// import Presentation from "@/components/presentation/Presentation";
import WelcomImage from '@/components/welcome-image/WelcomeImage'



export default function Home() {
  return (
    <div data-theme='light'>
    
      <MainLayout />
      {/* <Title title='Jagath Travels & Tours Presentation' /> */}
  
      {/* <Presentation /> */}
      <WelcomImage />
      {/* <HomePackage limits={6} /> */}
      {/* <Button name='View More ' url='/packages' /> */}
      <Title title=' Jagath Tours & Travels' />
      <EmblaCarousel />
      <Title title='Gallery' />
      <Gallery Gallerylimits={6} />
      <Button name='View More' url='/places' />

      <Footer />
      
     
    </div>
  );
}
