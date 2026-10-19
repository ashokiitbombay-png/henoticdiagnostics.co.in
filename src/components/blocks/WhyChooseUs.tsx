import React from "react";
import Image from "next/image";
import { ShieldCheck, Cpu, UserCheck, Home, FileText, Globe } from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  iconColor: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: "nabl",
    title: "NABL Accredited",
    desc: "Highest quality standards",
    icon: ShieldCheck,
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-[#0B63F6]"
  },
  {
    id: "tech",
    title: "Advanced Technology",
    desc: "Modern, accurate equipment",
    icon: Cpu,
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-[#0B63F6]"
  },
  {
    id: "doctors",
    title: "Expert Doctors",
    desc: "Trusted healthcare professionals",
    icon: UserCheck,
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-[#0B63F6]"
  },
  {
    id: "home-collection",
    title: "Home Sample Collection",
    desc: "Safe & convenient",
    icon: Home,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-[#14BBA6]"
  },
  {
    id: "reports",
    title: "Digital Reports",
    desc: "Access anytime, anywhere",
    icon: FileText,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-[#14BBA6]"
  },
  {
    id: "network",
    title: "Pan-India Network",
    desc: "Multiple centers and home service",
    icon: Globe,
    iconBg: "bg-teal-50 border-teal-100",
    iconColor: "text-[#14BBA6]"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT: Laboratory / Clinical Excellence Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(15,23,42,0.15)] border-4 border-slate-50">
              <Image
                src="https://cdn.henoticdiagnostics.com/Laboratory/henotic-diagnostics-blood-test-lab.webp"
                alt="Henotic Diagnostics Laboratory Excellence and Quality Testing"
                width={600}
                height={500}
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-md">
                <div className="text-xs font-bold text-teal-700 uppercase tracking-widest mb-0.5">Clinical Excellence</div>
                <div className="text-sm font-extrabold text-[#0F172A]">AI-Assisted Automated Pathology &amp; Low-Dose Radiology</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Why Choose Henotic Diagnostics Copy & 6 Features (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-3">
                Why Choose Henotic Diagnostics
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                Delivering accurate, affordable and accessible diagnostic services with care, technology and trust.
              </p>
            </div>

            {/* 6 Feature Blocks Grid (2 columns x 3 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-11 h-11 rounded-xl ${feat.iconBg} ${feat.iconColor} border flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#0F172A] leading-tight mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 leading-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
