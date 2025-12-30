'use client'

import React from 'react';
import { Camera, Image as ImageIcon, Play, Sparkles, Instagram } from 'lucide-react';

const GalleryHero = () => {
  return (
    <div className="relative min-h-[90vh] w-full bg-slate-50 flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">

      {/* Background Text Decor */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="text-[20vw] font-bold text-slate-200/40 uppercase tracking-tighter leading-none">
          Moments
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">

          {/* Left Column: Typography */}
          <div className="lg:col-span-6 space-y-8 mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              <Camera size={16} className="text-emerald-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Visual Anthology</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.85] text-slate-900">
              Capturing <br />
              <span className="italic font-light text-emerald-600">Pure</span> Stillness.
            </h1>

            <p className="max-w-md text-lg text-slate-600 leading-relaxed border-l-2 border-emerald-500 pl-6">
              A curated collection of stories told through the lens. No filters, just the raw, unscripted beauty of Sri Lanka.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-emerald-600 transition-all shadow-lg group">
                <ImageIcon size={18} />
                Explore Frames
              </button>
              <button className="flex items-center gap-3 text-slate-900 font-bold group">
                <div className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 transition-all">
                  <Play size={16} className="fill-current" />
                </div>
                Watch Film
              </button>
            </div>
          </div>

          {/* Right Column: Mosaic Preview */}
          <div className="lg:col-span-6 relative grid grid-cols-2 gap-4 h-[500px]">
            {/* Main Feature Image */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl group">
              <img
                src="assets/WhatsApp Image 2025-05-04 at 19.57.29_26f33920.jpg"
                alt="Portrait"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Top Right Small */}
            <div className="space-y-4">
              <div className="relative h-[240px] rounded-[40px] overflow-hidden shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"
                  alt="Architecture"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Bottom Right Box */}
              <div className="h-[240px] rounded-[40px] bg-emerald-600 p-8 text-white flex flex-col justify-between relative overflow-hidden group">
                <Sparkles className="absolute -right-4 -top-4 h-24 w-24 text-white/10 group-hover:rotate-12 transition-transform" />
                <Instagram size={32} />
                <div>
                  <p className="text-2xl font-medium tracking-tight leading-tight">Follow our <br /> daily lens.</p>
                  <p className="text-sm mt-2 font-light text-emerald-100">@JagathTravels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
};

export default GalleryHero;