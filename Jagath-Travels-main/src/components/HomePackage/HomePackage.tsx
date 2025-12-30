'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { getDocs, collection, query, where, limit } from "firebase/firestore";
import LoadingCard from "./LoadingCard";
import Styles from './Home.module.css';
import { useRouter } from "next/navigation";
import Link from "next/link";

// import Footer from "@/components/common/footer/Footer";

type Package = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  hide: boolean;
  imageUrl?: string; // Optional image URL
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
            imageUrl: pkg.imageUrl || '', // Dynamically use image URL from Firestore
          } as Package;
        });
        console.log("Fetched packages:", data);
        setPackages(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limits]);

  if (loading) {
    return <LoadingCard />;
  }

  const handleClick = (id: string) => {
    router.push(`/packages/${id}`);
  };



  return (
    <section className="text-gray-600 body-font bg-white">
      <div className={`${Styles.container} container`}>
        <div className="flex flex-wrap -m-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className={Styles.main}>
              <div className={`${Styles.card} h-full`}>
                {/* Dynamically load image */}
                {pkg.imageUrl ? (
                  <Image
                    className={Styles.image}
                    src={pkg.imageUrl}
                    alt={pkg.name || 'Package Image'}
                    width={500}
                    height={300}
                    unoptimized
                  />
                ) : (
                  <Image
                    className={Styles.image}
                    src="/assets/colombo/1.jpg"  // Fallback image
                    alt="Default Image"
                    width={500}
                    height={300}
                    unoptimized
                  />
                )}
                <div className="p-4">
                  <h2 className={Styles.title}>{pkg.category}</h2>
                  <h1 className={Styles.heading}>{pkg.name}</h1>
                  <p className={Styles.description}>{pkg.description}</p>
                  <div className={Styles.flex}>
                    <div className={Styles.price}>
                      <strong>Price: </strong>${pkg.price}
                    </div>
                    <div className="ml-auto">
                      <button className={Styles.buttonView} onClick={() => handleClick(pkg.id)}>View Details</button>
                      <Link href="/book" passHref>
                        {/* <a className={Styles.buttonLink}> */}
                          <button className={Styles.button}>Book Now</button>
                        {/* </a> */}
                      </Link>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HomePackage;
