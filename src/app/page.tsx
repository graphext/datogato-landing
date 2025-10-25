import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Platforms } from "@/sections/Platforms";
import { Process } from "@/sections/Process";
import { Personas } from "@/sections/Personas";
import { CaseStudies } from "@/sections/CaseStudies";
import { Testimonials } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { BlogSection } from "@/sections/Blog";
import { FAQ } from "@/sections/FAQ";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { GrillIcon } from "@/components/graphics/GrillIcon";

export default function Page() {
  return (
    <div className="bg-texture">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-32 sm:px-10">
        <Hero />
        <div className="mt-16 grid gap-16">
          <Services />
          <Platforms />
          <div className="relative overflow-hidden rounded-[48px] border border-[#d9b38a] bg-[#fdf2e3] p-10 shadow-[12px_16px_0_rgba(92,46,26,0.18)]">
            <div className="absolute -right-10 -top-10 h-48 w-48 opacity-70">
              <GrillIcon className="h-full w-full" />
            </div>
            <Process />
          </div>
          <Personas />
          <CaseStudies />
          <Testimonials />
          <AboutSection />
          <BlogSection />
          <FAQ />
          <ContactSection />
        </div>
        <Footer />
      </div>
    </div>
  );
}
