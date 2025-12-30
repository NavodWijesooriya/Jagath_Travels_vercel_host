'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HomePackage from '@/components/HomePackage/HomePackage';

import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/common/footer/Footer';
import Gallery from '@/components/product/gallery/Gallery';
import EmblaCarousel from '@/components/Events/EmblaCarousel';
import Title from '@/components/Title/Title';
import Button from '@/components/common/button/Button';
import WelcomImage from '@/components/welcome-image/WelcomeImage';
import { FaQuoteRight, FaStar, FaUserTie } from 'react-icons/fa';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  Date: string;
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const reviewRef = collection(db, 'reviews');

    const unsubscribe = onSnapshot(
      reviewRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];

        setReviews(data);
        setLoading(false);
      },
      (err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch reviews.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div data-theme="light">
      <MainLayout />
      {/* <WelcomImage /> */}

      {/* Packages Section */}
      <section className="py-8 md:py-12">
        <Title title="Jagath Tours & Travels Packages" />
        <HomePackage limits={3} />
        <div className="flex justify-center mt-10">
          <Link href="/packages">
            <button className="px-8 py-3 text-base font-semibold text-white bg-slate-900 rounded-lg hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-all active:scale-95">
              View All Packages
            </button>
          </Link>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-8 md:py-12">
        <Title title="Jagath Tours & Travels" />
        <EmblaCarousel />
      </section>

      {/* Gallery Section */}
      <section className="py-8 md:py-12">
        {/* <Title title="Jagath Tours & Travels Gallery" /> */}
        <Gallery Gallerylimits={6} />

      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Loved by Travelers <span className="text-pink-500">♥</span>
      </h2> */}
            <Title title="What Our Customers Say" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="group bg-white p-5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Decorative Background Blob */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />

                {/* Avatar with Cute Ring */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 text-xl font-bold transform rotate-3 group-hover:rotate-0 transition-transform">
                    {review.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                    <div className="bg-green-400 w-3 h-3 rounded-full border-2 border-white"></div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 mb-3 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={12} className={i < review.rating ? 'fill-current' : 'text-gray-200'} />
                  ))}
                </div>

                {/* Name & Role */}
                <h4 className="font-bold text-gray-800 text-sm mb-1">{review.name}</h4>
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">Happy Explorer</span>

                {/* Truncated Comment */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 italic px-2">
                  "{review.comment}"
                </p>

                {/* Date Label */}
                <div className="mt-5 pt-4 border-t border-gray-50 w-full">
                  <span className="text-[10px] text-gray-400 font-medium">{review.Date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
