import React from 'react';

import TourBookingForm from './../../components/TourBook/TourBookingForm';
import Navbar from '@/components/common/header/Navbar';
import Footer from '@/components/common/footer/Footer'
import TourBookHero from '@/components/TourBook/TourBookHero'

const Book = () => {



    return( <div>
        
        <Navbar />
        <TourBookHero />
        <TourBookingForm />
        <Footer />
        </div>
    )
}

export default Book