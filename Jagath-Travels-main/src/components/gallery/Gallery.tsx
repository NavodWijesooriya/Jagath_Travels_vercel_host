'use client';

import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

type GalleryItem = {
    id: string;
    imageUrl: string;
    
};

const Gallery = () => {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "jagath-gallery"));
                const imageList = querySnapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        imageUrl: doc.data().imageUrl,
                    }))
                    .filter((item) => item.imageUrl); // Only show items with images

                setImages(imageList);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="px-10 py-20 sm:p-10 m-4 sm:m-10 text-center">
            {/* Title Section */}
            <div className="p-4 sm:p-12">
                <h2 className="w-full text-center mb-4 sm:mb-6 text-lg sm:text-4xl font-bold p-3 sm:p-6 bg-gradient-to-r text-black shadow-xl rounded-lg transform transition-transform duration-300 ease-in-out break-words">
                    Jagath Travels & Tours Image Gallery
                </h2>
            </div>

            {/* Description */}
            <p className="mb-6 text-gray-600 text-sm sm:text-lg">
                Explore breathtaking destinations, stunning landscapes, and unforgettable travel moments with Jagath Travels & Tours. Our gallery showcases the beauty of our journeys, capturing memories from around the world.
            </p>

            {/* Loading spinner */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                        {images.slice(0, 8).map((item) => ( // Display first 8 images
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform "
                            >
                                <div className="relative w-full h-48 sm:h-64 md:h-80">
                                    <img
                                        src={item.imageUrl}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                    {/* Overlay with fade-in effect on hover */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0  transition-opacity duration-300 ease-in-out flex items-end">
                                        <div className="w-full bg-black bg-opacity-70 text-white text-center p-2 sm:p-4">
                                            <span className="font-bold text-sm sm:text-lg"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View More Button */}
                    {images.length > 8 && (
                        <div className="mt-6 sm:mt-10">
                            <button className="px-6 py-2 text-black  rounded-lg shadow-lg transition-transform transform ">
                                View More
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Gallery;
