'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Heart, Globe, Award, MapPin, Users, Star, Shield, Radio, Sparkles } from 'lucide-react';
import Link from 'next/link';

const JagathTravelsSlider = () => {
  const slides = [
    {
      id: 1,
      title: "The Lion Rock Fortress",
      subtitle: "Sri Lanka's Ancient Wonder",
      description: "Step back in time at the Sigiriya Rock Fortress. Experience the perfect harmony of nature and history through guided forest trails and sunset climbs to the summit of the sky-palace",
      image: "assets/sigiriya/11.jpg",
      color: "bg-gradient-to-br from-blue-500/20 to-emerald-500/20",
      stats: "500+ Happy Guests",
      icon: <Heart className="text-pink-500" />,
      cta: "Discover the Fortress"
    },
    {
      id: 2,
      title: "Temple of the Tooth",
      subtitle: "The Sacred Heart of Kandy",
      description: "Visit the golden-roofed temple housing Sri Lanka's most sacred relic. Witness vibrant evening rituals, intricate Kandyan architecture, and the profound serenity of this spiritual sanctuary.",
      image: "assets/kandy/6.jpg",
      color: "bg-gradient-to-br from-yellow-500/20 to-amber-600/20",
      stats: "Daily Cultural Rituals",
      icon: <Sparkles className="text-yellow-600" />,
      cta: "Visit the Sanctuary"
    },
    {
      id: 3,
      title: "Wildlife Safari Adventures",
      subtitle: "Into the Wild",
      description: "Witness elephants, leopards, and exotic birds in their natural habitat. Private safari tours with expert naturalists and photographers.",
      image: "assets/sigiriya/9.jpg",
      color: "bg-gradient-to-br from-green-500/20 to-lime-500/20",
      stats: "15+ National Parks",
      icon: <Globe className="text-green-500" />,
      cta: "Start Safari"
    },
    {
      id: 4,
      title: "Colombo Lotus Tower",
      subtitle: "The Peak of Modern Asia",
      description: "Soar above the capital for 360-degree city views. Experience fine dining in the clouds, high-tech observation decks, and the vibrant neon glow of Sri Lanka's tallest skyscraper.",
      image: "assets/colombo/1.jpg",
      color: "bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20",
      stats: "350m City Heights",
      icon: <Radio className="text-fuchsia-500" />,
      cta: "See the Skyline"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-slate-100 mb-6">
            <span className="text-[12px] font-black tracking-[0.3em] uppercase text-emerald-600">
              Premium Experiences
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-6 px-4 leading-tight">
            Discover Sri Lanka with{' '}
            <span className="text-emerald-600 italic font-light">Jagath Travels</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto px-4">
            Curated journeys that transform ordinary trips into extraordinary memories
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                  }`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                  <div className={`absolute inset-0 ${slide.color} mix-blend-overlay`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="max-w-3xl text-white px-6 sm:px-8 md:px-12 lg:px-20 space-y-4 md:space-y-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full">
                      {slide.icon}
                      <span className="text-xs sm:text-sm font-semibold">{slide.stats}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl text-emerald-200 font-light">{slide.subtitle}</p>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">{slide.description}</p>

                    {/* CTA Button */}
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base">
                      {slide.cta}
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-xl z-20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={20} className="text-slate-700 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-xl z-20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={20} className="text-slate-700 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-emerald-500 w-8'
                  : 'bg-white/50 w-2 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>

          {/* Slide Thumbnails */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-10">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`group relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 ${index === currentSlide
                  ? 'ring-4 ring-emerald-500/50 scale-105 shadow-xl'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
              >
                <div className="w-28 h-18 sm:w-32 sm:h-20 md:w-40 md:h-24">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-xs font-semibold text-white truncate">
                    {slide.title.split(' ')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 max-w-6xl mx-auto">
          {[
            { icon: <Users />, label: '50,000+ Travelers', desc: 'Happy Customers' },
            { icon: <Star />, label: '4.9/5 Rating', desc: 'Service Excellence' },
            { icon: <Award />, label: 'Award Winning', desc: 'Since 1998' },
            { icon: <Shield />, label: 'Fully Insured', desc: 'Your Safety First' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl md:rounded-2xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 text-emerald-600 rounded-xl mb-4">
                {item.icon}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2">{item.label}</div>
              <div className="text-xs sm:text-sm text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Booking CTA */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-8 sm:p-10 rounded-2xl md:rounded-3xl shadow-2xl max-w-5xl w-full">
            <div className="flex-1 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready for Your Adventure?</h3>
              <p className="text-base sm:text-lg text-emerald-50/90">
                Get a personalized itinerary crafted just for you
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/book" passHref>
                <button className="bg-white text-emerald-600 hover:bg-slate-50 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap">
                  Plan Your Journey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play Toggle */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-30">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm shadow-lg ${isAutoPlaying
            ? 'bg-emerald-500/20 text-emerald-600'
            : 'bg-slate-500/20 text-slate-600'
            }`}
        >
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-xs font-semibold hidden sm:inline">
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default JagathTravelsSlider;