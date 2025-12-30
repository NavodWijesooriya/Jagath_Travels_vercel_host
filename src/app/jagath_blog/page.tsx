
import React from 'react'
import Blog from '@/components/JagathBlog';
import Navbar from '@/components/common/header/Navbar';
import Footer from '@/components/common/footer/Footer';
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mooi Lanka Travels Blog - Mooi Lanka Travels "
}

const page = () => {
  return (
    <div>

      <Navbar />
      <Blog />
      <Footer />

    </div>
  )
}

export default page;