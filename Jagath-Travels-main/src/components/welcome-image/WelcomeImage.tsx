import React from 'react';
import Link from 'next/link';

const PowerPointEmbed = () => {
    return (
        <div className="flex justify-center items-center p-4 sm:p-12">
            <div className="w-full max-w-4xl bg-white border border-gray-300 p-4 sm:p-12 rounded-lg shadow-lg text-center">
                <Link href="/presentation">
                    <h1 className="text-lg sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
                        mb-2 sm:mb-6 p-3 sm:p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer">
                        Jagath Tours & Travels Presentation
                    </h1>
                </Link>
            </div>
        </div>
    );
};

export default PowerPointEmbed;
