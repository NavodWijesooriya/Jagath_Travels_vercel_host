'use client'

import React from 'react';
import { Quote, Award, Heart, History, Users, Globe } from 'lucide-react';

const AboutJagathHero = () => {
  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 flex flex-col items-center px-6 overflow-hidden">

      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/30 -skew-x-6 translate-x-32 pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Left Side: The Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
              <History size={16} className="text-emerald-600" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Since 1998 — Our Story</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] text-slate-900">
              Beyond <br />
              <span className="italic font-light text-emerald-600">Boundaries,</span><br />
              Within Soul.
            </h1>

            <div className="relative">
              <Quote className="absolute -left-8 -top-4 text-emerald-100 h-16 w-16 -z-10" />
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                Jagath Travels began with a single mission: to show the world the
                Sri Lanka that maps do not capture. Not just the landmarks, but
                the warmth of a home-cooked meal in the hills and the silence
                of a dawn safari.
              </p>
            </div>

            {/* Micro Stats/Values */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900">25+</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Years Experience</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900">12k</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Happy Souls</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Private Tours</p>
              </div>
            </div>
          </div>

          {/* Right Side: Compositional Art */}
          <div className="lg:col-span-6 relative">
            {/* Main Portrait Image */}
            <div className="relative z-20 aspect-[4/5] w-4/5 ml-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000"
                alt="Our Founder or Local Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -bottom-10 -left-10 z-30 aspect-square w-1/2 rounded-[32px] overflow-hidden shadow-2xl border-8 border-white animate-float-slow">
              <img
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600"
                alt="Authentic Experience"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular Heritage Seal */}
            <div className="absolute -top-6 left-20 z-30 h-32 w-32 bg-emerald-600 rounded-full flex flex-col items-center justify-center text-white p-4 text-center shadow-xl border-4 border-white rotate-[-15deg]">
              <Award size={24} className="mb-1" />
              <span className="text-[10px] font-bold uppercase leading-tight">Certified Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section Preview (Teaser) */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t border-slate-100">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">People First</h3>
          <p className="text-sm text-slate-500">Every itinerary is crafted around the human connection, ensuring local communities benefit as much as you do.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Expert Curation</h3>
          <p className="text-sm text-slate-500">We do not outsource. Our team of local specialists vets every hotel, trail, and vehicle personally.</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Personal Guides</h3>
          <p className="text-sm text-slate-500">Your chauffeur-guide is more than a driver; they are your storyteller, historian, and friend.</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutJagathHero;