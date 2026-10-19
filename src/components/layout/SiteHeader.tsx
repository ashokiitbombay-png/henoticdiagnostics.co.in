"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, CalendarCheck, ChevronDown, Search, ShieldCheck, Clock, Home, FileText, User } from "lucide-react";
import BookingForm from "@/components/forms/BookingForm"; 
import Modal from "@/components/ui/Modal";
import { siteConfig } from "@/config/site";
import { routesConfig } from "@/config/routes";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out">
        {/* ── 1. SUPER TOP BAR (Dark Corporate Navy #0F172A) ── */}
        <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 font-medium">
              <span className="flex items-center gap-1.5 text-teal-400">
                <ShieldCheck size={14} className="text-teal-400" /> NABL Accredited Labs
              </span>
              <span className="text-slate-600">•</span>
              <span>500+ Diagnostic Tests</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Home size={13} className="text-blue-400" /> Home Sample Collection
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-amber-400" /> Reports in 6-24 Hours
              </span>
            </div>

            <div className="flex items-center gap-5">
              <a 
                href={siteConfig.contact.phonePrimaryRaw} 
                className="flex items-center gap-1.5 text-white font-semibold hover:text-teal-300 transition-colors"
              >
                <Phone size={13} className="text-teal-400" /> {siteConfig.contact.phonePrimary}
              </a>
              <span className="text-slate-600">|</span>
              <Link 
                href="/reports" 
                className="flex items-center gap-1 hover:text-teal-300 transition-colors text-slate-300"
              >
                <FileText size={13} /> Patient Portal
              </Link>
            </div>
          </div>
        </div>

        {/* ── 2. MAIN NAVIGATION BAR (Clean White / Off-White) ── */}
        <div className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ${scrolled ? "shadow-md py-2.5" : "py-3.5"}`}>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl w-full flex items-center justify-between gap-4">
            
            {/* BRAND LOGO */}
            <Link href={routesConfig.home} className="flex items-center gap-3 relative z-50 group shrink-0">
              <div className="h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 p-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-1">
                  <Image 
                    src="https://cdn.henoticdiagnostics.co.in/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.webp" 
                    alt="Henotic Diagnostics" 
                    width={40} 
                    height={40} 
                    className="h-8 w-8 object-contain" 
                    priority 
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[#0F172A] font-extrabold text-lg md:text-xl tracking-tight">
                  Henotic<span className="text-[#0B63F6]">Diagnostics</span>
                </span>
                <span className="text-slate-500 font-medium text-[10px] tracking-wider uppercase mt-0.5">
                  Health Today, Brighter Tomorrow
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center justify-center gap-7 text-slate-700 font-semibold text-sm flex-grow">
              <Link href="/services/blood-test" className="hover:text-[#0B63F6] transition-colors py-2">
                Tests
              </Link>
              <a href="#packages" className="hover:text-[#0B63F6] transition-colors py-2">
                Packages
              </a>
              
              {/* SERVICES DROPDOWN */}
              <div 
                className="relative group py-2" 
                onMouseEnter={() => setIsServicesOpen(true)} 
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-[#0B63F6] transition-colors cursor-pointer font-semibold">
                  Services <ChevronDown size={15} className={`transition-transform duration-200 text-slate-400 ${isServicesOpen ? "rotate-180 text-[#0B63F6]" : ""}`} />
                </button>
                <div className={`absolute top-[110%] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-2xl p-6 transition-all duration-200 grid grid-cols-2 gap-6 border border-slate-100 ${isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2 pointer-events-none"}`}>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-[#0B63F6] uppercase tracking-wider mb-2 border-b border-slate-100 pb-2 text-left">Advanced Imaging</h4>
                    <Link href="/services/mri-scan" className="hover:text-[#0B63F6] font-medium transition-colors text-slate-700 text-sm py-1">3.0T MRI Scan</Link>
                    <Link href="/services/ct-scan" className="hover:text-[#0B63F6] font-medium transition-colors text-slate-700 text-sm py-1">128-Slice CT Scan</Link>
                    <Link href="/services/pet-scan" className="hover:text-[#0B63F6] font-medium transition-colors text-slate-700 text-sm py-1">Digital PET-CT Scan</Link>
                    <Link href="/services/ultrasound" className="hover:text-[#0B63F6] font-medium transition-colors text-slate-700 text-sm py-1">4D Ultrasound & Color Doppler</Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2 border-b border-slate-100 pb-2 text-left">Pathology & Cardiology</h4>
                    <Link href="/services/blood-test" className="hover:text-teal-600 font-medium transition-colors text-slate-700 text-sm py-1">Blood & Pathology Tests</Link>
                    <Link href="/services/full-body-check-up" className="hover:text-teal-600 font-medium transition-colors text-slate-700 text-sm py-1">Full Body Checkups</Link>
                    <Link href="/services/2d-echo" className="hover:text-teal-600 font-medium transition-colors text-slate-700 text-sm py-1">2D Echo & ECG</Link>
                    <Link href="/services/dexa-bone-scan" className="hover:text-teal-600 font-medium transition-colors text-slate-700 text-sm py-1">DEXA Bone Scan</Link>
                  </div>
                </div>
              </div>

              <Link href="/city" className="hover:text-[#0B63F6] transition-colors py-2">
                Locations
              </Link>
              <Link href="/doctors" className="hover:text-[#0B63F6] transition-colors py-2">
                Doctors
              </Link>
              <Link href="/blog" className="hover:text-[#0B63F6] transition-colors py-2">
                Health Library
              </Link>
              <Link href="/about-us" className="hover:text-[#0B63F6] transition-colors py-2">
                About
              </Link>
            </nav>

            {/* DESKTOP CTA ACTIONS */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a 
                href="#search-tests" 
                className="p-2.5 text-slate-500 hover:text-[#0B63F6] hover:bg-blue-50 rounded-lg transition-colors"
                title="Search tests and scans"
              >
                <Search size={18} />
              </a>

              <a 
                href={siteConfig.contact.phonePrimaryRaw} 
                className="hidden xl:flex items-center gap-2 text-slate-700 hover:text-[#0B63F6] border border-slate-200 hover:border-blue-300 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
              >
                <Phone size={14} className="text-[#0B63F6]" /> {siteConfig.contact.phonePrimary}
              </a>

              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }}
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck size={16} /> Book a Test
              </button>
            </div>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button 
              aria-label="Toggle Mobile Menu" 
              aria-expanded={isOpen} 
              className="lg:hidden text-slate-800 p-2 shrink-0 flex items-center justify-center cursor-pointer" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`lg:hidden fixed inset-0 top-[110px] bg-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto pb-24 w-full shadow-2xl`}>
          <div className="flex flex-col p-6 text-slate-800 font-semibold text-base w-full max-w-md mx-auto">
            <Link href="/" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/services/blood-test" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Tests & Diagnostics
            </Link>
            <a href="#packages" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Health Packages
            </a>
            <Link href="/services" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              All Services
            </Link>
            <Link href="/city" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Test Centers & Locations
            </Link>
            <Link href="/doctors" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Our Specialists
            </Link>
            <Link href="/about-us" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="py-3 border-b border-slate-100 flex items-center justify-between" onClick={() => setIsOpen(false)}>
              Contact & Centers
            </Link>

            <div className="mt-8 flex flex-col gap-3 w-full">
              <a 
                href={siteConfig.contact.phonePrimaryRaw} 
                className="w-full flex justify-center items-center gap-2 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold transition-colors hover:bg-slate-50 text-sm"
              >
                <Phone size={16} className="text-[#0B63F6]" /> Call {siteConfig.contact.phonePrimary}
              </a>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); setIsOpen(false); }} 
                className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-sm shadow-md cursor-pointer"
              >
                <CalendarCheck size={18} /> Book a Test
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🌟 BULLETPROOF PREMIUM BOOKING MODAL (MAXIMUM Z-INDEX) 🌟 */}
      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)}>
        <BookingForm />
      </Modal>
    </>
  );
}