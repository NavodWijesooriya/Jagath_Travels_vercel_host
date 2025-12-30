'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, where, limit } from "firebase/firestore";
import LoadingCard from "./LoadingCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Package = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  hide: boolean;
  imageUrl?: string;
};

const OrganizationID = 'packages';

const HomePackage = ({ limits }: { limits: number }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRef = collection(db, OrganizationID);
        const itemsQuery = query(
          itemsRef,
          where("hide", "==", false),
          limit(limits)
        );
        const querySnapshot = await getDocs(itemsQuery);
        const data = querySnapshot.docs.map((doc) => {
          const pkg = doc.data();
          return {
            id: doc.id,
            name: pkg.name || "Untitled",
            category: pkg.category || "Uncategorized",
            price: pkg.price || 0,
            description: pkg.description || "No description available",
            hide: pkg.hide || false,
            imageUrl: pkg.imageUrl || '/api/placeholder/500/300', // Added a placeholder
          } as Package;
        });
        setPackages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limits]);

  if (loading) return <LoadingCard />;

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  className="object-cover w-full h-full transition-transform duration-500"
                  src={pkg.imageUrl || '/api/placeholder/500/300'}
                  alt={pkg.name}
                  width={500}
                  height={300}
                  unoptimized
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                    {pkg.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
                  {pkg.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  {pkg.price > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs uppercase font-medium">Price</span>
                      <span className="text-2xl font-black text-gray-900">${pkg.price}</span>
                    </div>
                  ) : (
                    <div />
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/packages/${pkg.id}`)}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Details
                    </button>
                    <Link href="/book" passHref>
                      <button className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-emerald-600 shadow-md shadow-emerald-200 transition-all active:scale-95">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Packages Button */}
        {/* <div className="flex justify-center mt-10">
          <Link href="/packages">
            <button className="px-8 py-3 text-base font-semibold text-white bg-slate-900 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95">
              View All Packages
            </button>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default HomePackage;