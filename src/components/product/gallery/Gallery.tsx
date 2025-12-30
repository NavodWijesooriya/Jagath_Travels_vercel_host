'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import LoadingGallery from "./LoadingGallery";
import { getDocs, collection, limit, query } from "firebase/firestore";
import Title from '../../Title/Title';

type GData = {
  id: string;
  location: string;
  place: string;
  name: string;
  description: string;
  image: string;
};

interface GalleryProps {
  Gallerylimits: number;
}

const Gallery: React.FC<GalleryProps> = ({ Gallerylimits }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gData, setGData] = useState<GData[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const itemsRef = collection(db, 'gallery');
        const itemsQuery = query(itemsRef, limit(Gallerylimits));
        const querySnapshot = await getDocs(itemsQuery);
        const galleryData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as GData));
        setGData(galleryData);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryData();
  }, [Gallerylimits]);

  if (loading) {
    return <LoadingGallery />;
  }

  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
           <Title title="Popular Destinations" />
           <p className="text-center text-gray-500 mt-2 max-w-2xl mx-auto">
             Explore the most breathtaking locations curated just for you.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gData.map((gallery) => (
            <div 
              key={gallery.id} 
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] w-full overflow-hidden">
                <Image
                  fill
                  alt={gallery.place}
                  src={gallery.image}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Modern Overlay - Glassmorphism style */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {gallery.location}
                </span>
                <h3 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {gallery.place}
                </h3>
                <p className="text-gray-200 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {gallery.description}
                </p>
              </div>

              {/* Minimal Static Info (Optional - shows before hover) */}
              <div className="p-4 group-hover:hidden transition-opacity duration-300">
                 <h4 className="text-gray-900 font-semibold">{gallery.place}</h4>
                 <p className="text-gray-500 text-sm">{gallery.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;