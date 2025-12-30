'use client'

import React from 'react';
import { MapPin, Globe, ArrowRight, Palmtree, Mountain, Waves } from 'lucide-react';

const DestinationHero = () => {
  return (
    <div className="relative min-h-[80vh] w-full bg-slate-50 flex items-center justify-center px-6 pt-20 overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Text Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 text-emerald-600 font-bold tracking-[0.3em] uppercase text-xs">
            <Globe size={16} className="animate-spin-slow" />
            <span>Curated Map of Wonders</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.9] text-slate-900">
            Iconic <br />
            <span className="italic font-light text-emerald-600">Landmarks.</span>
          </h1>

          <p className="max-w-md text-lg text-slate-600 leading-relaxed">
            From the sacred heights of Adam is Peak to the wild plains of Yala.
            Discover the corners of Sri Lanka where time stands still.
          </p>

          {/* Destination Quick-Nav Tabs */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Coastal', icon: <Waves size={14} /> },
              { label: 'Highlands', icon: <Mountain size={14} /> },
              { label: 'Tropical', icon: <Palmtree size={14} /> }
            ].map((tab) => (
              <button key={tab.label} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Immersive Visual with Location Tag */}
        <div className="relative">
          <div className="relative aspect-video lg:aspect-square w-full rounded-[60px] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1200"
              alt="Nine Arch Bridge"
              className="w-full h-full object-cover"
            />
            {/* Glossy Location Badge */}
            <div className="absolute top-8 right-8 flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white">
              <MapPin size={18} className="text-emerald-400" />
              <span className="text-sm font-semibold">Ella, Nine Arch Bridge</span>
            </div>
          </div>

          {/* Circular Badge Decor */}
          <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-emerald-500 rounded-full flex flex-col items-center justify-center text-white p-6 text-center rotate-12 shadow-xl border-4 border-white">
            <span className="text-xs font-bold uppercase tracking-tighter">Most Visited</span>
            <span className="text-2xl font-serif italic">#1</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DestinationHero;