import React from 'react';
import Image from 'next/image';
import { MapPin, ShieldCheck, Activity, Star, Calendar, Shield, Award, Home, FileText, CheckCircle2 } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import AccreditationLogos from '@/components/blocks/AccreditationLogos';
import HomeSearchBar from '@/components/features/HomeSearchBar';

interface HeroBlockProps {
  title?: string;
  description?: string;
  locationName?: string;
  regionName?: string;
  variant?: 'home' | 'location';
}

const ACCREDITATIONS = [
  { 
    title: "PCPNDT", 
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "NABL", 
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "ISO", 
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "AERB", 
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp" 
  }
];

export default function HeroBlock({ title, description, locationName, regionName, variant = 'location' }: HeroBlockProps) {

  if (variant === 'home') {
    return (
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden bg-gradient-to-b from-[#EBF3FE] via-[#F4F8FD] to-[#FFFFFF]">
        {/* Soft Medical Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[140px] opacity-30 bg-[#0B63F6]/20 pointer-events-none"></div>
        <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[120px] opacity-25 bg-[#14BBA6]/20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Primary Enterprise Headline, Search, & Trust Signals (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200/80 text-[#0B63F6] text-xs font-bold tracking-wide">
                  <ShieldCheck size={14} className="text-[#0B63F6]" /> NABL Accredited & AERB Approved
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[#0F172A] leading-[1.12] tracking-tight mb-3">
                Comprehensive <br />
                Diagnostic Care <br />
                <span className="text-[#0B63F6]">for a Healthier Tomorrow</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[#334155] font-semibold mb-6 tracking-wide">
                Accurate Tests <span className="text-slate-300 mx-1.5">|</span> Advanced Technology <span className="text-slate-300 mx-1.5">|</span> Trusted Experts
              </p>
              
              {/* Interactive Search Bar */}
              <div className="mb-6 w-full">
                <HomeSearchBar />
              </div>

              {/* 3 Trust Indicators matching screenshot */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-bold text-slate-800">
                  <ShieldCheck size={15} className="text-[#0B63F6]" />
                  <span>NABL Accredited Labs</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-bold text-slate-800">
                  <Home size={15} className="text-[#14BBA6]" />
                  <span>Home Sample Collection</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-bold text-slate-800">
                  <FileText size={15} className="text-[#0B63F6]" />
                  <span>Digital Report Delivery</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Medical Image with Arch & Floating Health Shield Card (5 cols) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none">
                
                {/* Curved Arch / Dome Background Wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#BAE6FD]/40 via-[#E0F2FE]/25 to-transparent rounded-t-[14rem] sm:rounded-t-[18rem] rounded-b-3xl transform -rotate-1 scale-105 pointer-events-none"></div>

                {/* Accreditation Badges Overlay */}
                <div className="absolute -top-6 -left-4 sm:-left-6 z-30">
                  <AccreditationLogos badges={ACCREDITATIONS} variant="light" />
                </div>
                
                {/* Main Hero Visual Card */}
                <div className="relative bg-white p-2.5 sm:p-3 rounded-t-[14rem] sm:rounded-t-[18rem] rounded-b-3xl shadow-[0_25px_60px_-15px_rgba(11,99,246,0.15)] border border-blue-100/60 overflow-hidden">
                  <Image 
                    src="https://cdn.henoticdiagnostics.com/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp" 
                    alt="Comprehensive Diagnostic Care at Henotic Diagnostics" 
                    width={560}
                    height={560}
                    className="rounded-t-[13.5rem] sm:rounded-t-[17.5rem] rounded-b-2xl w-full h-[360px] sm:h-[420px] object-cover"
                    priority
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 45vw" 
                  />
                </div>

                {/* Floating Health Shield Pill (Matches Screenshot Spec) */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_15px_35px_-5px_rgba(15,23,42,0.15)] border border-slate-200/80 flex items-center gap-3 z-30 whitespace-nowrap">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck size={22} className="text-teal-600" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                      <span>Prevent</span>
                      <span className="text-teal-500">•</span>
                      <span>Detect</span>
                      <span className="text-teal-500">•</span>
                      <span>Protect</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500">Your Health, Our Priority</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // DEFAULT / LOCATION MODE (Corporate Deep Navy #0F172A)
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-[#0F172A] overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25" 
        style={{ backgroundImage: "url('https://cdn.henoticdiagnostics.com/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/50"></div>
      
      {/* Subtle Medical Ambient Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[140px] opacity-20 bg-[#0B63F6]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[120px] opacity-15 bg-[#14BBA6]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        {locationName && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-teal-300 text-xs sm:text-sm font-bold mb-6">
            <MapPin size={16} className="text-teal-400" /> Available in {locationName}{regionName ? `, ${regionName}` : ''}
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
          {title || "State-of-the-Art Diagnostics"}
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-3xl mx-auto drop-shadow-md leading-relaxed">
          {description || "Accurate, fast, and reliable diagnostic services near you. Experience premium technology with same-day reporting."}
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs md:text-sm font-bold text-white/90">
          <div className="px-4 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center gap-2">
            <ShieldCheck size={18} className="text-teal-400" /> NABL Certified Labs
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center gap-2">
            <Activity size={18} className="text-blue-400" /> Advanced 3T & 128-Slice
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-slate-800/70 border border-slate-700 flex items-center gap-2">
            <Star size={18} className="text-amber-400" /> 4.9/5 Rated (1,030+ Reviews)
          </div>
        </div>
      </div>
    </section>
  );
}
