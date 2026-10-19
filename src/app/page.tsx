import dynamic from 'next/dynamic';
import HeroBlock from "@/components/blocks/HeroBlock";
import CategoryChips from "@/components/blocks/CategoryChips";
import FAQSchema from '@/components/seo/FAQSchema';

// 🚀 Lazy-load below-fold components for faster LCP & optimized JS bundle
const RateCards = dynamic(() => import("@/components/blocks/RateCards"));
const StatisticsBand = dynamic(() => import("@/components/blocks/StatisticsBand"));
const WhyChooseUs = dynamic(() => import("@/components/blocks/WhyChooseUs"));
const HomeBookingSection = dynamic(() => import("@/components/blocks/HomeBookingSection"));
const CTASection = dynamic(() => import("@/components/blocks/CTASection"));
const ServiceLines = dynamic(() => import("@/components/blocks/ServiceLines"));
const MedicalTechnology = dynamic(() => import("@/components/blocks/MedicalTechnology"));
const FacilityShowcase = dynamic(() => import("@/components/blocks/FacilityShowcase"));
const DoctorsTrustSignals = dynamic(() => import("@/components/blocks/DoctorsTrustSignals"));
const CorporateVideo = dynamic(() => import("@/components/blocks/CorporateVideo"));
const Accreditations = dynamic(() => import("@/components/blocks/Accreditations"));
const GoogleReviews = dynamic(() => import('@/components/features/reviews/GoogleReviews'));
const PartnerLogos = dynamic(() => import("@/components/blocks/PartnerLogos"));
const HomeFAQSection = dynamic(() => import("@/components/blocks/HomeFAQSection"));

/**
 * Server-side FAQ data for SSR JSON-LD schema.
 * This ensures FAQ structured data reaches search crawlers & AI models (Googlebot, GPTBot, ClaudeBot).
 */
const homeFaqs = [
  { question: "What diagnostic services does Henotic Diagnostics offer?", answer: "We offer 250+ diagnostic tests including 3T MRI, 128-Slice CT scan, PET-CT, 4D ultrasound, blood pathology tests, 2D Echo, ECG, digital X-ray, mammography, DEXA bone scans, and preventive full body health checkup packages." },
  { question: "Where is Henotic Diagnostics located?", answer: "Our premier corporate facility is located at Second Floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Navi Mumbai, Maharashtra 410210." },
  { question: "What are the operating hours?", answer: "We operate 24 hours a day, 7 days a week, including Sundays and public holidays, with 24/7 emergency diagnostic imaging availability." },
  { question: "Is Henotic Diagnostics NABL accredited?", answer: "Yes, Henotic Diagnostics is fully NABL accredited, AERB approved, PCPNDT registered, and ISO 9001:2015 certified, meeting national and international clinical accuracy standards." },
  { question: "How can I book a diagnostic test?", answer: "You can book directly through our online portal, call our helpline at 088793 27184, or schedule via WhatsApp for instant priority slot confirmation." },
  { question: "How quickly are reports delivered?", answer: "Routine blood test reports are delivered digitally within 4-6 hours. Advanced radiology imaging reports (MRI, CT, PET-CT) are typically released within 12-24 hours." },
  { question: "Do you provide home sample collection?", answer: "Yes, certified phlebotomists provide safe, hygienic doorstep sample collection across Mumbai, Navi Mumbai, Thane, and surrounding areas." },
];

export const metadata = {
  title: "Henotic Diagnostics | Premier Diagnostic Center in Mumbai",
  description: "Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. 3T MRI, 128-Slice CT, 4D USG & Blood Tests in Mumbai & Navi Mumbai.",
  alternates: { canonical: 'https://henoticdiagnostics.co.in' },
  openGraph: {
    title: 'Henotic Diagnostics | Premier Diagnostic Center in Mumbai',
    description: 'Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. 3.0T MRI, 128-Slice CT, PET-CT, Automated Pathology.',
    url: 'https://henoticdiagnostics.co.in',
    type: 'website',
    images: [{
      url: 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp',
      width: 1200,
      height: 630,
      alt: 'Henotic Diagnostics — Premier Diagnostic Center in Mumbai',
    }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Henotic Diagnostics | Premier Diagnostic Center in Mumbai',
    description: 'NABL-accredited MRI, CT, PET-CT, Ultrasound & Pathology in Mumbai. Same-day reports.',
    images: ['https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp'],
  },
};

export default function HomePage() {
  const homeHeroImage = 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';
  const homeWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://henoticdiagnostics.co.in',
    name: 'Henotic Diagnostics | Premier Diagnostic Center in Mumbai',
    description: 'Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. Find your nearest center in Mumbai & Navi Mumbai.',
    url: 'https://henoticdiagnostics.co.in',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: homeHeroImage,
      contentUrl: homeHeroImage,
      caption: 'Henotic Diagnostics — Premier Diagnostic Center in Mumbai',
      width: 1200,
      height: 630
    },
    image: [homeHeroImage],
  };

  return (
    <main className="w-full flex flex-col bg-white overflow-hidden mt-[100px] md:mt-[112px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageSchema) }}
      />
      
      {/* 🤖 Googlebot SERP Thumbnail Signal */}
      <figure className="sr-only" itemScope itemType="https://schema.org/ImageObject">
        <img
          src={homeHeroImage}
          alt="Henotic Diagnostics — Premier Diagnostic Center in Mumbai"
          width={1200}
          height={630}
          itemProp="image"
          loading="eager"
        />
        <figcaption itemProp="caption">Henotic Diagnostics Premier Diagnostic Facility</figcaption>
      </figure>

      {/* 1. HERO SECTION (Comprehensive Diagnostic Care, Search, Trust Indicators) */}
      <HeroBlock variant="home" />

      {/* 2. MODALITY QUICK-ACCESS CHIPS (8 Circular Shortcut Badges) */}
      <CategoryChips />

      {/* 3. MOST POPULAR HEALTH PACKAGES (4-Card Enterprise Grid) */}
      <RateCards variant="premium" />

      {/* 4. STATISTICS BAND (500+ Tests, 50+ Centers, 10M+ Patients, 99% Accuracy, 24h Delivery) */}
      <StatisticsBand />

      {/* 5. WHY CHOOSE HENOTIC DIAGNOSTICS (2-Column Clinical Excellence & Laboratory Image) */}
      <WhyChooseUs />

      {/* 6. SSR AI OVERVIEW SUMMARY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 rounded-3xl border border-slate-200/80 my-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-3">About Henotic Diagnostics</h2>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
          Henotic Diagnostics is a NABL-accredited medical diagnostic and imaging center headquartered in Kharghar, Navi Mumbai. 
          Founded in 2012, it provides 250+ diagnostic investigations including 3.0 Tesla MRI, 128-slice CT scan, PET-CT, 
          4D ultrasound, automated clinical pathology, cardiac diagnostics, and specialized genetic testing. The center operates 24/7 
          and delivers same-day verified digital reports via patient portal and WhatsApp. Rated 4.9/5 with over 1,030 Google reviews.
        </p>
      </section>

      {/* 7. FAST BOOKING SECTION */}
      <HomeBookingSection />

      {/* 8. VIBRANT CTA BAND (Book Your Test Today - Teal-to-Blue Gradient) */}
      <CTASection />

      {/* 9. CORE SERVICE MODALITIES */}
      <ServiceLines />

      {/* 10. GLOBAL TECHNOLOGY INFRASTRUCTURE (GE, Siemens, Philips) */}
      <MedicalTechnology />

      {/* 11. FACILITY SHOWCASE & AMBIENCE */}
      <FacilityShowcase />

      {/* 12. DOCTOR TRUST SIGNALS & SENIOR RADIOLOGISTS */}
      <DoctorsTrustSignals />
      
      {/* 13. GOOGLE REVIEWS & PATIENT TESTIMONIALS */}
      <GoogleReviews />
      
      {/* 14. INSTITUTIONAL PARTNERS */}
      <PartnerLogos />
      
      {/* 15. CORPORATE WALKTHROUGH VIDEO */}
      <CorporateVideo />

      {/* 16. NATIONAL ACCREDITATIONS (NABL, AERB, ISO, PCPNDT) */}
      <Accreditations />

      {/* 17. FREQUENTLY ASKED QUESTIONS */}
      <HomeFAQSection />

      {/* 🤖 Server-rendered FAQ Schema for AI & Search Engine Crawlers */}
      <FAQSchema faqs={homeFaqs} />
    </main>
  );
}