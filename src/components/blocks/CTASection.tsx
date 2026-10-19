import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, CalendarCheck, ShieldCheck, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CTASection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14BBA6] via-[#0D9488] to-[#0B63F6] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: Text & Call to Action (7 cols) */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider mb-4 border border-white/20">
                <ShieldCheck size={14} className="text-teal-200" /> Safe, Certified &amp; Affordable
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Book Your Test Today
              </h2>
              
              <p className="text-teal-50 text-base sm:text-lg font-medium mb-8 max-w-xl leading-relaxed">
                Experience seamless healthcare with zero waiting times, free home sample collection, and verified digital reports delivered directly to your WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0F172A] font-black text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <CalendarCheck size={18} className="text-[#0B63F6]" />
                  Book Now <ArrowRight size={16} />
                </a>

                <a
                  href={siteConfig.contact.phonePrimaryRaw}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm sm:text-base px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-md"
                >
                  <Phone size={17} />
                  Call {siteConfig.contact.phonePrimary}
                </a>
              </div>
            </div>

            {/* RIGHT: Quick Highlights Badge Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 text-white w-full max-w-md shadow-inner">
                <h3 className="text-lg font-extrabold mb-4 pb-3 border-b border-white/15 flex items-center justify-between">
                  <span>Priority Booking Guarantee</span>
                  <Clock size={18} className="text-teal-200" />
                </h3>
                
                <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-teal-50">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 text-xs">✓</div>
                    <span>Instant confirmation within 15 minutes</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 text-xs">✓</div>
                    <span>Doorstep sample collection at your preferred time</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 text-xs">✓</div>
                    <span>Reports verified by senior MD radiologists &amp; pathologists</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 text-xs">✓</div>
                    <span>NABL &amp; ISO 9001:2015 accredited lab facilities</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
