'use client'

import React from 'react';
import { Users, CheckCircle2, Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

const BookingHero = () => {
  return (
    <div className="relative min-h-[70vh] w-full bg-slate-50 flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side: Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100/50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
            <ShieldCheck size={14} />
            Verified Itineraries
          </div>

          <h1 className="text-6xl md:text-7xl font-medium tracking-tight leading-[0.9] text-slate-900">
            Secure Your <br />
            <span className="italic font-light text-emerald-600">Spot.</span>
          </h1>

          <p className="max-w-md text-lg text-slate-600 leading-relaxed">
            Ready to transition from dreaming to departing? Explore your selected route and finalize your travel party to begin.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 mt-1" size={18} />
              <div>
                <p className="font-bold text-slate-900 text-sm">Flexible Dates</p>
                <p className="text-xs text-slate-500">Change plans up to 14 days before.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-500 mt-1" size={18} />
              <div>
                <p className="font-bold text-slate-900 text-sm">Expert Guides</p>
                <p className="text-xs text-slate-500">Hand-picked local specialists.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Information Card (No Payment) */}
        <div className="relative">
          <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 p-6 md:p-8 relative z-20">

            {/* Featured Tour Image */}
            <div className="relative w-full h-56 mb-8 rounded-[24px] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000&auto=format&fit=crop"
                alt="The Grand Island Tour"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-[10px] uppercase font-bold text-white/70 mb-1 tracking-wider">Currently Selected</p>
                <h3 className="text-2xl font-bold">The Grand Island Tour</h3>
              </div>

              {/* Rating Overlay */}
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl flex flex-col items-center shadow-xl">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                  <Star size={12} className="fill-current" />
                  <span>4.9</span>
                </div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">240 Reviews</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Tour Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Group Size</span>
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Users size={18} className="text-emerald-600" />
                    <span>02 - 06 People</span>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                  <div className="flex items-center gap-2 text-slate-900 font-semibold">
                    <Clock size={18} className="text-emerald-600" />
                    <span>12 Days</span>
                  </div>
                </div>
              </div>

              {/* Action Button (Non-payment) */}
              <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-lg group">
                Proceed to Customization
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Decorative Circle behind card */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
        </div>
      </div>
    </div>
  );
};

export default BookingHero;