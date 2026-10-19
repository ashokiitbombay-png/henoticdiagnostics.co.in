import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Clock, ExternalLink,
  FileText, Globe, Navigation, ArrowUpRight
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { routesConfig } from "@/config/routes";

const NewsletterSignup = dynamic(() => import('@/components/ui/NewsletterSignup'));

/* --- BULLETPROOF INLINE BRAND ICONS --- */
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.54 12 19.54 12 19.54s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
);

export default function SiteFooter() {
  return (
    <footer
      className="relative text-slate-300 font-sans pt-12 pb-12 lg:pt-20 lg:pb-12 overflow-hidden bg-[#0F172A] border-t border-slate-800 shadow-2xl"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl w-full relative z-20">

        {/* ================= SECTION 1: NAP, MAP & BRAND ================= */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 mb-8 lg:mb-16 border-b border-slate-800 pb-8 lg:pb-16 items-stretch">

          {/* BRAND & NAP (Left Column - Spans 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-6">
            <Link href={routesConfig.home} className="inline-block group relative z-50 w-max">
              <div className="relative p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  width={280}
                  height={70}
                  className="w-56 lg:w-72 h-auto object-contain relative z-50"
                  priority/>
              </div>
            </Link>

            <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 shadow-xl relative z-20 flex-grow">
              <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs border-b border-slate-800 pb-4">
                <MapPin size={16} className="text-teal-400" /> Headquarters & Flagship Center
              </h4>

              <address className="text-slate-300 text-sm leading-relaxed mb-6 pl-4 border-l-2 border-teal-500 not-italic">
                <strong className="text-lg text-white block mb-2">{siteConfig.name}</strong>
                Second floor, Millennium Empire, Business Park,<br />
                Plot No 47, D Mart Rd, Sector 15, Kharghar,<br />
                Panvel, Navi Mumbai, Maharashtra 410210
              </address>

              <div className="flex flex-col gap-3 text-sm font-semibold">
                <a href={siteConfig.contact.phonePrimaryRaw} className="flex items-center justify-between text-white hover:text-teal-300 transition bg-slate-800/80 p-4 rounded-xl hover:bg-slate-800 border border-slate-700/60 shadow-inner">
                  <span className="flex items-center gap-3"><Phone size={18} className="text-teal-400" /> {siteConfig.contact.phonePrimary}</span>
                  <ArrowUpRight size={16} className="opacity-50" />
                </a>
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <Clock size={18} className="text-teal-400" /> Open 24 Hours • 365 Days
                </div>
              </div>
            </div>
          </div>

          {/* GOOGLE MAP & GBP PROFILE (Right Column - Spans 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6 h-full relative z-20">
            <div className="flex flex-col sm:flex-row gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
              <Image
                width={128}
                height={128}
                src="https://cdn.henoticdiagnostics.co.in/Front%20Office/henotic-diagnostics-name-plate.webp"
                alt="Henotic Diagnostics Facility"
                className="w-full sm:w-32 h-32 object-cover rounded-xl shadow-md border border-slate-800"
                loading="lazy"/>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-amber-400 font-bold text-sm">★★★★★</span>
                  <span className="text-xs font-semibold text-slate-300">4.9 / 5 Rating</span>
                </div>
                <h5 className="font-bold text-base text-white mb-1">Highly Rated on Google Reviews</h5>
                <p className="text-xs text-slate-400 mb-3 max-w-sm">Experience world-class diagnostic imaging and pathology in Kharghar, Navi Mumbai.</p>
                <div className="flex gap-2">
                  <a href="https://share.google/yRA62stKchzN8uOVe" target="_blank" rel="noreferrer" className="text-xs bg-[#0B63F6] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-600 transition shadow-md flex items-center gap-1.5">
                    <Globe size={12} /> View Profile
                  </a>
                  <a href="https://share.google/IcBtvtVjwozCBFMPp" target="_blank" rel="noreferrer" className="text-xs bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition flex items-center gap-1">
                    1,030+ Reviews
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/90 p-2 rounded-2xl border border-slate-800 w-full shadow-2xl relative group overflow-hidden h-[220px] sm:h-[250px]">
              <iframe title="Henotic Diagnostics Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4687576643887!2d73.07795039999999!3d19.043116999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3812919666b%3A0xa377f33beeed1944!2sHenotic%20Diagnostics!5e0!3m2!1sen!2sin!4v1786048629791!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              ></iframe>
              <a href="https://maps.app.goo.gl/Ex2RG9afjvuEJp7y5" target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 hover:bg-black transition cursor-pointer">
                <Navigation size={14} className="text-teal-400" /> Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* ================= SECTION 2: ARCHITECTURE LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-16 relative z-20">
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs mb-5 border-b border-slate-800 pb-3 text-white">Diagnostics & Scans</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href={routesConfig.getServiceUrl("mri-scan")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">3.0T MRI Scan</Link></li>
              <li><Link href={routesConfig.getServiceUrl("ct-scan")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">128-Slice CT Scan</Link></li>
              <li><Link href={routesConfig.getServiceUrl("pet-scan")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Digital PET-CT Scan</Link></li>
              <li><Link href={routesConfig.getServiceUrl("ultrasound")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">4D Ultrasound / USG</Link></li>
              <li><Link href={routesConfig.getServiceUrl("dexa-bone-scan")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">DEXA Bone Density</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs mb-5 border-b border-slate-800 pb-3 text-white">Pathology & Wellness</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href={routesConfig.getServiceUrl("blood-test")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Blood & Pathology Tests</Link></li>
              <li><Link href={routesConfig.getServiceUrl("full-body-check-up")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Full Body Checkups</Link></li>
              <li><Link href={routesConfig.getServiceUrl("2d-echo")} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">2D Echo & ECG</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">All 250+ Tests</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs mb-5 border-b border-slate-800 pb-3 text-white">Locations & Centers</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href="/city/mumbai" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Mumbai Centers</Link></li>
              <li><Link href="/city/navi-mumbai" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Navi Mumbai Flagship</Link></li>
              <li><Link href="/city/thane" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Thane Centers</Link></li>
              <li><Link href="/city/pune" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Pune Network</Link></li>
              <li><Link href="/city" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Browse All Locations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs mb-5 border-b border-slate-800 pb-3 text-white">Trust & Compliance</h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium text-slate-400">
              <li><Link href="/about-us" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">About Our Lab</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Our Specialists</Link></li>
              <li><Link href="/sitemap" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">HTML Sitemap</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">XML Sitemap</a></li>
              <li><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal-400 hover:translate-x-1 transition-all duration-200 block">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* ================= SECTION 3: PAYMENTS ================= */}
        <div className="mb-8 lg:mb-12 relative z-20 bg-slate-900/60 p-6 lg:p-8 rounded-2xl border border-slate-800">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">Secure Payment Partners</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Paytm", url: "https://cdn.henoticdiagnostics.co.in/2026/01/4cc15576-paytm-banking-henotic-diagnostics.webp" },
              { name: "GPay", url: "https://cdn.henoticdiagnostics.co.in/2026/01/22f37b85-google-pay-payment-transfer-henotic-diagnostics.webp" },
              { name: "BHIM", url: "https://cdn.henoticdiagnostics.co.in/2026/01/9ee511bb-bhim-upi-transfer-banking-henotic-diagnostics.webp" },
              { name: "Amex", url: "https://cdn.henoticdiagnostics.co.in/2026/01/8982a1eb-american-experss-payment-transfer-henotic-diagnostics.webp" },
              { name: "Amazon", url: "https://cdn.henoticdiagnostics.co.in/2026/01/57673992-amazon-pay-payment-transfer-henotic-diagnostics.webp" },
              { name: "Cards", url: "https://cdn.henoticdiagnostics.co.in/2026/01/d412e583-all-debitcards-creditcards-payment-transfer-henotic-diagnostics.webp" },
              { name: "Visa", url: "https://cdn.henoticdiagnostics.co.in/2026/01/7ecc0645-visa-payment-transfer-henotic-diagnostics.webp" },
              { name: "Paypal", url: "https://cdn.henoticdiagnostics.co.in/2026/01/3ffff106-paypal-banking-henotic-diagnostics.webp" }
            ].map((pay, i) => (
              <div key={i} className="bg-white rounded-lg w-20 h-10 md:w-24 md:h-12 flex items-center justify-center shadow-sm px-2">
                <Image width={70} height={26} src={pay.url} alt={pay.name} className="h-4 md:h-6 w-auto object-contain" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 4: PATIENT POLICIES BOX ================= */}
        <div className="mb-8 relative z-20 w-full">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-7">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={14} className="text-teal-400" /> Patient Care & Compliance Policies
            </h5>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-xs font-medium text-slate-400">
              <Link href={routesConfig.privacy} className="hover:text-teal-300 transition-colors">Privacy Policy</Link>
              <span className="text-slate-700">•</span>
              <Link href={routesConfig.terms} className="hover:text-teal-300 transition-colors">Terms of Service</Link>
              <span className="text-slate-700">•</span>
              <Link href="/cancellation-policy" className="hover:text-teal-300 transition-colors">Cancellation Policy</Link>
              <span className="text-slate-700">•</span>
              <Link href="/delivery-policy" className="hover:text-teal-300 transition-colors">Delivery Policy</Link>
              <span className="text-slate-700">•</span>
              <Link href="/disclaimers" className="hover:text-teal-300 transition-colors">Disclaimers</Link>
              <span className="text-slate-700">•</span>
              <Link href="/grievance-policy" className="hover:text-teal-300 transition-colors">Grievance Redressal</Link>
              <span className="text-slate-700">•</span>
              <Link href="/medical-disclaimer" className="hover:text-teal-300 transition-colors">Medical Disclaimer</Link>
              <span className="text-slate-700">•</span>
              <Link href="/refund-returns" className="hover:text-teal-300 transition-colors">Refund & Returns</Link>
              <span className="text-slate-700">•</span>
              <Link href="/refund-policy" className="hover:text-teal-300 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>

        {/* ================= SECTION 5: SOCIAL MEDIA & ACCREDITATIONS ================= */}
        <div className="mb-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Follow Us
            </span>
            <div className="flex flex-wrap justify-center gap-2.5">
              <a aria-label="Facebook" href={siteConfig.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-[#0B63F6] border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all">
                <FacebookIcon size={16} />
              </a>
              <a aria-label="Instagram" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all">
                <InstagramIcon size={16} />
              </a>
              <a aria-label="X Twitter" href={siteConfig.socials.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all">
                <TwitterIcon size={16} />
              </a>
              <a aria-label="LinkedIn" href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-blue-700 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all">
                <LinkedinIcon size={16} />
              </a>
              <a aria-label="YouTube" href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 bg-slate-800 hover:bg-red-600 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all">
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-3">
            <span className="text-teal-400">NABL Accredited</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>AERB Certified</span>
            <span>•</span>
            <span>PCPNDT Registered</span>
          </div>
        </div>

        {/* ================= SECTION 6: COPYRIGHT ROW ================= */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 w-full">
          <div>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Henotic Diagnostics. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}