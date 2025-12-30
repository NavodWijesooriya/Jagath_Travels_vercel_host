'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Logo from '../../../../public/assets/jagathlogo3.png';
import Translate from '../../translate/Translate';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Optimized Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Places", href: "/places" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/jagath_blog" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-[60] 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'} 
        ${isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-white/20 shadow-sm py-3'
            : 'bg-slate-900/90 backdrop-blur-lg border-b border-white/10 py-5'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="relative z-[70] flex items-center">
            <Image
              src={Logo}
              alt="Jagath Travels"
              priority
              className={`transition-all duration-500 ${isScrolled ? 'h-10 w-auto' : 'h-14 w-auto'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-slate-100/10 rounded-full px-2 py-1 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 rounded-full
                    ${isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : isScrolled ? 'text-slate-700 dark:text-gray-400 hover:text-emerald-500' : 'text-gray-200 hover:text-emerald-300'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Translate />
            <Link
              href="/book"
              className="group relative overflow-hidden bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest transition-all hover:pr-10"
            >
              <span className="relative z-10">BOOK NOW</span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden z-[70] p-2 rounded-xl transition-colors ${isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Modern Mobile Slide-out Drawer */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

        {/* Drawer Content */}
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mt-16 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-slate-800 dark:text-white hover:text-emerald-600 transition-colors flex justify-between items-center group"
              >
                {link.name}
                <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" size={20} />
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
            <div className="flex justify-center">
              <Translate />
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 bg-emerald-600 text-gray-600 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform"
            >
              <Phone size={18} /> CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;