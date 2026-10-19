"use client";
import React from 'react';
import { DollarSign, ShieldAlert, ArrowRight, CheckCircle2, Activity, Droplets, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface RateCardItem {
  name: string;
  price: string;
  time: string;
  requirements: string;
}

export interface HealthPackage {
  title: string;
  testCount: string;
  price: string;
  oldPrice: string;
  discount: string;
  includesSummary: string;
  includes: string[];
  icon: 'body' | 'diabetes' | 'heart' | 'women';
  popular?: boolean;
}

interface RateCardsProps {
  items?: RateCardItem[];
  title?: string;
  variant?: 'premium' | 'list';
  packages?: HealthPackage[];
}

const DEFAULT_ENTERPRISE_PACKAGES: HealthPackage[] = [
  {
    title: "Full Body Checkup",
    testCount: "100+ Tests",
    price: "₹1,299",
    oldPrice: "₹2,500",
    discount: "48% OFF",
    includesSummary: "Includes CBC, Sugar, Lipid, LFT, KFT...",
    includes: ["Complete Hemogram (CBC)", "Lipid Profile (Cholesterol)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Fasting Blood Sugar", "Thyroid Profile (TSH)"],
    icon: "body",
    popular: true
  },
  {
    title: "Diabetes Package",
    testCount: "25+ Tests",
    price: "₹699",
    oldPrice: "₹1,200",
    discount: "42% OFF",
    includesSummary: "Includes HbA1c, FBS, PPBS...",
    includes: ["HbA1c Glycated Hemoglobin", "Fasting Blood Glucose", "Post Prandial Blood Sugar", "Urine Routine & Micro", "Lipid Screen"],
    icon: "diabetes"
  },
  {
    title: "Heart Health Package",
    testCount: "30+ Tests",
    price: "₹1,499",
    oldPrice: "₹2,800",
    discount: "46% OFF",
    includesSummary: "Includes Lipid Profile, ECG, HS-CRP...",
    includes: ["2D Echocardiography / ECG", "Cardiac Risk Markers", "High Sensitivity CRP", "Advanced Lipid Profile", "Serum Electrolytes"],
    icon: "heart"
  },
  {
    title: "Women's Health Package",
    testCount: "40+ Tests",
    price: "₹1,199",
    oldPrice: "₹2,200",
    discount: "45% OFF",
    includesSummary: "Includes Hormones, Thyroid, CBC...",
    includes: ["Thyroid Panel (T3, T4, TSH)", "Vitamin D3 & B12 Levels", "Complete Blood Count", "Iron Deficiency Panel", "Pelvic Ultrasound Consultation"],
    icon: "women"
  }
];

export default function RateCards({ items, title, variant = 'list', packages = DEFAULT_ENTERPRISE_PACKAGES }: RateCardsProps) {
  
  // 1. PREMIUM VARIANT (Home Page Health Packages - 4 Column Layout from Screenshot)
  if (variant === 'premium') {
    return (
      <section id="packages" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight mb-2">
                Most Popular Health Packages
              </h2>
              <p className="text-slate-600 font-medium text-base">
                Affordable, comprehensive and designed for every stage of life.
              </p>
            </div>
            <Link 
              href="/services/full-body-check-up" 
              className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#0B63F6] hover:text-blue-700 transition-colors shrink-0"
            >
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>

          {/* 4-Column Grid matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, idx) => {
              // Icon selector
              const getIcon = () => {
                switch (pkg.icon) {
                  case 'diabetes':
                    return { icon: Droplets, bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-100' };
                  case 'heart':
                    return { icon: Heart, bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' };
                  case 'women':
                    return { icon: Sparkles, bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' };
                  default:
                    return { icon: Activity, bg: 'bg-blue-50', text: 'text-[#0B63F6]', border: 'border-blue-100' };
                }
              };
              const iconConfig = getIcon();
              const IconComponent = iconConfig.icon;

              return (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {/* Header: Icon + Title + Tests Count */}
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${iconConfig.bg} ${iconConfig.text} border ${iconConfig.border} flex items-center justify-center shrink-0`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-[#0F172A] leading-tight">
                          {pkg.title}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {pkg.testCount}
                        </span>
                      </div>
                    </div>

                    {/* Pricing Band */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-black text-[#0F172A] tracking-tight">
                        {pkg.price}
                      </span>
                      {pkg.oldPrice && (
                        <span className="text-sm font-semibold text-slate-400 line-through">
                          {pkg.oldPrice}
                        </span>
                      )}
                      {pkg.discount && (
                        <span className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                          {pkg.discount}
                        </span>
                      )}
                    </div>

                    {/* Inclusions preview */}
                    <p className="text-xs font-medium text-slate-600 mb-6 leading-relaxed">
                      {pkg.includesSummary}
                    </p>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href="#booking"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-teal-500 bg-slate-50 hover:bg-gradient-to-r hover:from-[#14BBA6] hover:to-[#0B63F6] text-slate-800 hover:text-white font-extrabold text-xs transition-all duration-300 shadow-sm"
                    >
                      Book Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    );
  }

  // 2. LIST VARIANT (Dynamic Service Accordion scan prices)
  const defaultItems = items || [
    { name: "3T MRI Brain Scan", price: "₹3,999 onwards", time: "15-20 Mins", requirements: "No metal implants, doctor prescription mandatory." },
    { name: "128-Slice CT Chest HRCT", price: "₹2,499 onwards", time: "5 Mins", requirements: "Prior creatinine blood report needed for contrast scans." },
    { name: "Whole Abdomen USG Sonography", price: "₹1,199 onwards", time: "10 Mins", requirements: "Requires 6-8 hours of fasting (water is allowed)." },
    { name: "HbA1c & Fasting Blood Sugar", price: "₹399 onwards", time: "Home collection", requirements: "Requires 10-12 hours overnight fasting." },
  ];

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-6 md:p-8">
      <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wider">
        <DollarSign size={20} className="text-[#0B63F6]" /> {title || "Diagnostic Pricing & Details"}
      </h4>
      <div className="space-y-4">
        {defaultItems.map((item, idx) => (
          <div key={idx} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md hover:border-blue-100 bg-white border border-slate-200 rounded-2xl">
            <div className="flex-grow">
              <h5 className="font-extrabold text-[#0F172A] text-base mb-1">{item.name}</h5>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs font-semibold">
                <span>Duration: {item.time}</span>
                <span>•</span>
                <span>Requirements: {item.requirements}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0 border-t border-slate-100 md:border-none pt-3 md:pt-0">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold block">Estimated Price</span>
                <span className="text-lg font-black text-teal-600">{item.price}</span>
              </div>
              <Link 
                href="#booking" 
                className="p-3 bg-blue-50 text-[#0B63F6] hover:bg-[#0B63F6] hover:text-white rounded-xl transition-all duration-300"
              >
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 flex items-center gap-1.5 justify-center md:justify-start">
        <ShieldAlert size={14} /> Prices are indicative and subject to regional center variations.
      </p>
    </div>
  );
}
