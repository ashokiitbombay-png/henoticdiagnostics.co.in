import React from "react";
import { FileText, MapPin, Users, ShieldCheck, Clock } from "lucide-react";

interface StatItem {
  id: string;
  metric: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  iconColor: string;
}

const STATS: StatItem[] = [
  {
    id: "tests",
    metric: "500+",
    label: "Diagnostic Tests",
    icon: FileText,
    iconBg: "bg-blue-100/70",
    iconColor: "text-[#0B63F6]"
  },
  {
    id: "centers",
    metric: "50+",
    label: "Test Centers",
    icon: MapPin,
    iconBg: "bg-teal-100/70",
    iconColor: "text-[#14BBA6]"
  },
  {
    id: "patients",
    metric: "10M+",
    label: "Happy Patients",
    icon: Users,
    iconBg: "bg-cyan-100/70",
    iconColor: "text-cyan-600"
  },
  {
    id: "accuracy",
    metric: "99%",
    label: "Accurate Reports",
    icon: ShieldCheck,
    iconBg: "bg-emerald-100/70",
    iconColor: "text-emerald-600"
  },
  {
    id: "delivery",
    metric: "24 Hrs",
    label: "Report Delivery",
    icon: Clock,
    iconBg: "bg-teal-100/70",
    iconColor: "text-teal-600"
  }
];

export default function StatisticsBand() {
  return (
    <section className="w-full bg-gradient-to-r from-[#EFF6FF] via-[#F0FDFA] to-[#EFF6FF] border-y border-slate-200/60 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 items-center justify-between">
          {STATS.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="flex items-center gap-3.5 justify-center md:justify-start"
              >
                {/* Icon Badge */}
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-sm border border-white/60`}>
                  <Icon size={22} />
                </div>
                
                {/* Number & Description */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
                    {item.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 leading-tight">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
