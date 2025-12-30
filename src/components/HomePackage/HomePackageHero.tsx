'use client'

import React from 'react';
import { Map, Filter, SlidersHorizontal, Sparkles, ChevronDown } from 'lucide-react';

const JagathPackagesHero = () => {
  return (
    <div className="relative pt-32 pb-20 w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 flex flex-col items-center px-6 overflow-hidden">
      
      {/* Decorative Background Elements - matching the home hero theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center space-y-8">
        {/* Breadcrumb / Tag */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
          <Sparkles size={14} className="text-emerald-600" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-700">
            Curated Collections 2024/25
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900">
          The <span className="italic font-light text-emerald-600">Art</span> of the <br />
          Sri Lankan Journey.
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          From the mist-covered highlands to the golden shores of the south, 
          explore our handcrafted itineraries designed for the conscious traveler.
        </p>

        {/* Action / Filter Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-6 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-200 transition-colors cursor-pointer group">
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-bold text-slate-400">Sort By</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Most Popular</span>
                <ChevronDown size={16} className="text-emerald-600" />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:-translate-y-1">
            <SlidersHorizontal size={20} />
            Refine Experiences
          </button>
        </div>
      </div>

      {/* Visual Accent - Floating icons in background */}
      <div className="absolute left-10 top-1/2 hidden xl:block opacity-20 animate-float-slow">
         <Map size={120} className="text-slate-400 -rotate-12" />
      </div>

      {/* Decorative Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.55,14.52,100.55,30.34,150,44.26,204.35,59.53,263.35,64.21,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-30px) rotate(-15deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default JagathPackagesHero;