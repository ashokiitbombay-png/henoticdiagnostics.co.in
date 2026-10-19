import React from "react";
import Link from "next/link";
import { 
  Activity, 
  Droplet, 
  Layers, 
  Heart, 
  Sparkles, 
  UserCheck, 
  Home, 
  FileText 
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  bgColor: string;
  iconColor: string;
  hoverBorder: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "full-body",
    name: "Full Body Checkup",
    href: "/services/full-body-check-up",
    icon: Activity,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-300"
  },
  {
    id: "blood-tests",
    name: "Blood Tests",
    href: "/services/blood-test",
    icon: Droplet,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverBorder: "hover:border-teal-300"
  },
  {
    id: "radiology",
    name: "Radiology",
    href: "/services/mri-scan",
    icon: Layers,
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    hoverBorder: "hover:border-sky-300"
  },
  {
    id: "cardiology",
    name: "Cardiology",
    href: "/services/2d-echo",
    icon: Heart,
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    hoverBorder: "hover:border-rose-300"
  },
  {
    id: "womens-health",
    name: "Women's Health",
    href: "/services/ultrasound",
    icon: Sparkles,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-300"
  },
  {
    id: "senior-citizen",
    name: "Senior Citizen",
    href: "/services/full-body-check-up",
    icon: UserCheck,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    hoverBorder: "hover:border-amber-300"
  },
  {
    id: "home-collection",
    name: "Home Collection",
    href: "/contact",
    icon: Home,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-300"
  },
  {
    id: "reports-online",
    name: "Reports Online",
    href: "/reports",
    icon: FileText,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverBorder: "hover:border-indigo-300"
  }
];

export default function CategoryChips() {
  return (
    <section className="w-full bg-white py-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 justify-center">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none"
              >
                {/* Circular Icon Container */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${cat.bgColor} ${cat.iconColor} flex items-center justify-center mb-2.5 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105 border border-slate-100 ${cat.hoverBorder}`}
                >
                  <Icon size={26} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                {/* Category Label */}
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0B63F6] transition-colors leading-tight line-clamp-2 max-w-[90px]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
