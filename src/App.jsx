// ============================================================================
// IMPORTS & DEPENDENCIES
// ============================================================================
import React, { useState, useEffect } from "react";

import "./styles/main.css";
import { Leaf, MapPin } from "lucide-react";
import { LinkedinLogoIcon } from "@phosphor-icons/react";
import {
  dataDict,
  highlightImages,
  highlightImages0,
  specialThanksData,
  teamCategories,
} from "./data/data";

// ============================================================================
// MAIN APPLICATION COMPONENT
// Controls state, effects, and layout assembly for the entire project.
// ============================================================================
export default function App() {
  const [introStep, setIntroStep] = useState(0);

  // --- EFFECT: INTRO SEQUENCE ---
  useEffect(() => {
    const t1 = setTimeout(() => setIntroStep(1), 500); // Show "After almost 6 months..."
    const t2 = setTimeout(() => setIntroStep(2), 3500); // Hide first text
    const t3 = setTimeout(() => setIntroStep(3), 4500); // Show "NXT Team represents..."
    const t4 = setTimeout(() => setIntroStep(4), 6500); // Show "The first grafting robot..."
    const t5 = setTimeout(() => setIntroStep(5), 12000); // Zoom out and reveal site

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // --- EFFECT: SCROLL REVEAL OBSERVER ---
  useEffect(() => {
    if (introStep < 5) return;

    const standardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => standardObserver.observe(el));

    return () => {
      standardObserver.disconnect();
    };
  }, [introStep]);

  // ============================================================================
  // RENDER: MAIN PRESENTATION WEBSITE
  // ============================================================================
  return (
    <div
      className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden font-inter ltr"
      dir="ltr"
    >
      {/* =========================================
          INTRO ANIMATION OVERLAY
      ========================================= */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a] text-white transition-all duration-[1500ms] ease-in-out origin-center ${introStep === 5 ? "opacity-0 scale-[1.5] pointer-events-none" : "opacity-100 scale-100"}`}
      >
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#0076b6]/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-sky-600/20 rounded-full blur-[100px]"></div>

        {/* Sequence Step 1 Text */}
        <div
          className={`absolute text-center px-4 transition-all duration-1000 ${introStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-wide font-outfit text-sky-100">
            After nearly 6 months of nonstop dedication
          </h2>
        </div>

        {/* Sequence Step 3 & 4 Text */}
        <div
          className={`absolute flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${introStep === 3 || introStep === 4 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <h1
            className={`text-4xl md:text-6xl font-black tracking-widest uppercase font-outfit mb-6 transition-all duration-1000 ${introStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            NXT Team Presents
          </h1>
          <p
            className={`text-xl md:text-3xl text-sky-400 font-light max-w-3xl transition-all duration-1000 delay-300 zen-dots-regular ${introStep >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Egypt’s first student-built grafting robot{" "}
          </p>
        </div>
      </div>

      {/* =========================================
          MAIN WEBSITE (Fades in when intro finishes)
      ========================================= */}
      <div
        className={`transition-opacity duration-1000 ${introStep === 5 ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}
      >
        {/* Navigation - Aligned to Reference Style */}
        <nav className="fixed top-0 w-full z-40 bg-transparent text-white pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md" />
              <span className="font-black text-lg md:text-xl tracking-widest font-outfit drop-shadow-md">
                NxtGraft
              </span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center gap-8 font-bold text-xs tracking-widest uppercase font-outfit drop-shadow-md">
              <a
                href="#description"
                className="hover:text-sky-300 transition-colors"
              >
                ARCHITECTURE
              </a>
              <a
                href="#highlights"
                className="hover:text-sky-300 transition-colors"
              >
                HIGHLIGHTS
              </a>
              <a href="#team" className="hover:text-sky-300 transition-colors">
                TEAM
              </a>
              <a
                href="#thanks"
                className="hover:text-sky-300 transition-colors"
              >
                THANKS
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 drop-shadow-md">
              <span className="font-bold text-xs tracking-widest uppercase font-outfit">
                NXT TEAM
              </span>
            </div>
          </div>
        </nav>

        {/* Hero Section - Fully Responsive Editorial Layout */}
        <section className="relative min-h-screen md:h-screen flex flex-col justify-between overflow-hidden bg-slate-900 font-outfit pt-24 pb-8 md:pt-0 md:pb-0">
          {/* Background Image (Agricultural Setting) */}
          <div className="absolute inset-0 z-0">
            <img
              src="./assets/Hero-BG.jpg"
              className="w-full h-full object-cover"
              alt="Green Grass Field Under Cloudy Sky"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>{" "}
            {/* Slightly darker on mobile for perfect text contrast */}
          </div>

          {/* Huge Background Text GR/TEAM */}
          <div className="absolute right-0 top-[12%] md:top-[15%] z-0 pointer-events-none flex flex-col items-end mr-[5%] lg:mr-[10%] opacity-20 md:opacity-100">
            <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-black text-white/20 md:text-white/20 leading-[0.75] tracking-tighter drop-shadow-lg">
              NXT
            </h1>
            <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-black leading-[0.75] tracking-tighter text-white/20 md:text-slate-900/50 mix-blend-overlay backdrop-blur-sm -mr-2 md:-mr-12 lg:-mr-24">
              TEAM
            </h1>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col md:flex-row md:pt-32 md:pb-12 gap-6 md:gap-8">
            {/* Left Column (Title, Desc, Button, Vertical Image) */}
            <div className="w-full md:w-5/12 flex flex-col h-full z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider mb-2 md:mb-4 drop-shadow-lg font-outfit">
                NxtGraft
              </h1>

              <p className="text-white/95 text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-inter drop-shadow-md text-shadow-sm max-w-sm md:max-w-none">
                An automated grafting robot designed for precision agriculture.
                A perfect blend of engineering and botanical science to ensure
                seamless scalability.
              </p>

              <a
                href="#description"
                className="bg-[#111] text-white font-bold tracking-widest text-[10px] md:text-xs py-3 px-6 md:py-4 md:px-8 w-max uppercase hover:bg-black transition-colors mb-8 md:mb-auto shadow-xl"
              >
                EXPLORE
              </a>

              {/* Vertical Image (Hidden on very small screens, shown on tablet/desktop) */}
              <div
                className=" w-full h-48 md:h-[45%] mt-6 md:mt-auto overflow-hidden shadow-2xl relative border border-white/10 group"
                className={`video-container ${introStep === 5 ? "show" : ""}`}
              >
                {introStep === 5 && (
                  <video
                    preload="auto"
                    muted
                    loop
                    autoPlay
                    src={"./assets/Highlights/Highlights.mp4"}
                    poster="./assets/Highlights/Highlights TN.webp"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                )}
                <div class="absolute inset-0 bg-blue-500/25 mix-blend-overlay pointer-events-none"></div>
              </div>
            </div>

            {/* Right Column (Progress, "SEE ALL", Thumbnails) */}
            <div className="w-full md:w-7/12 flex flex-col justify-end relative z-10 mt-auto pb-4 md:pb-0">
              {/* Progress Bar & See All */}
              <div className="flex items-center justify-between w-full mb-4 md:mb-6">
                <div className="w-[60%] md:w-[75%] h-[2px] bg-white/30 relative">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-white"></div>
                </div>
                <div className="border border-white/80 text-white rounded-full px-4 py-1.5 md:px-6 md:py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors backdrop-blur-sm">
                  The Process
                </div>
              </div>

              {/* Engineering Thumbnails Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full">
                {[
                  {
                    title: "Design",
                    vid: "./assets/Highlights/Design.mp4",
                    poster: "./assets/Highlights/Design TN.webp",
                  },
                  {
                    title: "Development",
                    vid: "./assets/Highlights/Sys Dev1.mp4",
                    poster: "./assets/Highlights/Sys Dev1 TN.webp",
                  },
                  {
                    title: "Testing",
                    vid: "./assets/Highlights/integration.mp4",
                    poster: "./assets/Highlights/integration TN.webp",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-2 md:gap-3 group cursor-pointer"
                  >
                    <h3 className="text-white font-bold uppercase tracking-widest text-[9px] md:text-sm drop-shadow-md font-outfit truncate">
                      {item.title}
                    </h3>
                    <div
                      className="h-20 sm:h-28 lg:h-36 w-full overflow-hidden shadow-xl border border-white/10 "
                      className={`video-container ${introStep === 5 ? "show" : ""}`}
                    >
                      {introStep === 5 && (
                        <video
                          preload="auto"
                          muted
                          loop
                          autoPlay
                          src={item.vid}
                          poster={item.poster}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          alt={item.title}
                        />
                      )}
                      <div class="absolute inset-0 bg-blue-500/20 mix-blend-overlay pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
          SYSTEM ARCHITECTURE SECTION
      ========================================= */}
        <section
          id="description"
          className="py-24 md:py-32 bg-[#0f172a] relative overflow-hidden text-white border-b border-white/5"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0076b6]/10 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="hero-texture mix-blend-overlay opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-12 reveal-on-scroll text-center">
              <p
                className={`text-[#0076b6] font-bold tracking-[0.2em] uppercase text-sm mb-4 font-outfit`}
              >
                {dataDict.aboutTitle}
              </p>
            </div>

            {/* Top Main Robot Image Container */}
            <div
              className="w-full flex justify-center mb-20 md:mb-32 reveal-on-scroll relative z-10"
              style={{ transitionDelay: "0.1s" }}
            >
              {/* Glowing backdrop for the main image */}
              <div className="absolute inset-0 bg-sky-400/20 rounded-3xl blur-[100px] max-w-5xl mx-auto"></div>

              <div className="relative p-2 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl max-w-5xl w-full overflow-hidden group">
                <img
                  // loading="lazy"
                  src="./assets/image_fea916.jpg"
                  alt="Full Robot Architecture"
                  className="w-full h-[350px] md:h-[550px] object-cover rounded-3xl border border-slate-800/80 transition-transform duration-700 group-hover:scale-[1.01]"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80";
                  }}
                />

                {/* Decorative corner accents */}
                <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-sky-400/50 rounded-tl-lg"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-sky-400/50 rounded-br-lg"></div>
              </div>
            </div>

            {/* Bottom Grid for Sub-Systems */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
              {/* 1. Mechanical Design */}
              <div
                className="reveal-on-scroll bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,118,182,0.15)] hover:-translate-y-3 transition-transform duration-500 overflow-hidden group"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="h-56 overflow-hidden relative border-b border-white/10">
                  <img
                    // loading="lazy"
                    src="./assets/Design.jpg"
                    alt="Mechanical Design"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                  {/* Floating Number Badge */}
                  <div
                    className={`absolute bottom-5 left-6 w-12 h-12 rounded-full bg-[#0076b6] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(0,118,182,0.6)] font-outfit`}
                  >
                    1
                  </div>
                </div>
                <div className="p-6 md:p-8 pt-6">
                  <h3
                    className={`text-2xl font-bold text-white mb-4 font-outfit`}
                  >
                    {dataDict.descDesignTitle}
                  </h3>
                  <p
                    className={`text-slate-400 text-sm md:text-base leading-relaxed font-inter`}
                  >
                    {dataDict.descDesign}
                  </p>
                </div>
              </div>

              {/* 2. Electrical Systems */}
              <div
                className="reveal-on-scroll bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,118,182,0.15)] hover:-translate-y-3 transition-transform duration-500 overflow-hidden group"
                style={{ transitionDelay: "0.3s" }}
              >
                <div className="h-56 overflow-hidden relative border-b border-white/10">
                  <img
                    // loading="lazy"
                    src="./assets/Elec Sys.png"
                    alt="Electrical Systems"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                  {/* Floating Number Badge */}
                  <div
                    className={`absolute bottom-5 left-6 w-12 h-12 rounded-full bg-[#0076b6] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(0,118,182,0.6)] font-outfit`}
                  >
                    2
                  </div>
                </div>
                <div className="p-6 md:p-8 pt-6">
                  <h3
                    className={`text-2xl font-bold text-white mb-4 font-outfit`}
                  >
                    {dataDict.descElectricalTitle}
                  </h3>
                  <p
                    className={`text-slate-400 text-sm md:text-base leading-relaxed font-inter`}
                  >
                    {dataDict.descElectrical}
                  </p>
                </div>
              </div>

              {/* 3. Pneumatic Mechanics */}
              <div
                className="reveal-on-scroll bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,118,182,0.15)] hover:-translate-y-3 transition-transform duration-500 overflow-hidden group"
                style={{ transitionDelay: "0.4s" }}
              >
                <div className="h-56 overflow-hidden relative border-b border-white/10">
                  <img
                    // loading="lazy"
                    src="./assets/Pneu Sys.png"
                    alt="Pneumatic Mechanics"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                  {/* Floating Number Badge */}
                  <div
                    className={`absolute bottom-5 left-6 w-12 h-12 rounded-full bg-[#0076b6] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(0,118,182,0.6)] font-outfit`}
                  >
                    3
                  </div>
                </div>
                <div className="p-6 md:p-8 pt-6">
                  <h3
                    className={`text-2xl font-bold text-white mb-4 font-outfit`}
                  >
                    {dataDict.descPneumaticTitle}
                  </h3>
                  <p
                    className={`text-slate-400 text-sm md:text-base leading-relaxed font-inter`}
                  >
                    {dataDict.descPneumatic}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
          HIGHLIGHTS GALLERY SECTION
      ========================================= */}
        {/* 2 Rows of infinite auto-scrolling galleries showcasing project progress */}
        <section
          id="highlights"
          className="py-24 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
            <div className="reveal-on-scroll text-center">
              <p
                className={`text-[#0076b6] font-bold tracking-[0.2em] uppercase text-sm mb-3 font-outfit`}
              >
                {dataDict.highlightsTitle}
              </p>
              <h2
                className={`text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-outfit`}
              >
                {dataDict.highlightsSubtitle}
              </h2>
            </div>
          </div>

          {/* Infinite Image Marquees Wrapper */}
          <div className="relative w-full overflow-hidden flex flex-col gap-4 md:gap-8">
            {/* Visual gradient overlays for seamless edges */}
            <div className="absolute top-0 bottom-0 left-0 w-8 md:w-40 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-8 md:w-40 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none"></div>

            {/* First Row: Scrolls Right to Left continuously */}
            <div
              className="image-marquee-container flex gap-4 md:gap-8 px-4"
              dir="ltr"
            >
              {[...highlightImages, ...highlightImages].map((imgUrl, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="relative w-[260px] h-[180px] md:w-[400px] md:h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group border border-slate-200 bg-slate-200"
                >
                  <img
                    // loading="lazy"
                    fetchpriority="high"
                    src={imgUrl}
                    alt={`Highlight image ${idx + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#005c8a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                </div>
              ))}
            </div>

            {/* Second Row: Scrolls Left to Right continuously */}
            <div
              className="image-marquee-container-reverse flex gap-4 md:gap-8 px-4"
              dir="ltr"
            >
              {[...highlightImages0, ...highlightImages0].map((imgUrl, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="relative w-[260px] h-[180px] md:w-[400px] md:h-[280px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group border border-slate-200 bg-slate-200"
                >
                  <img
                    // loading="lazy"
                    src={imgUrl}
                    alt={`Highlight image secondary ${idx + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#005c8a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
          TEAM SHOWCASE SECTION
      ========================================= */}
        <section id="team" className="bg-white relative py-32 overflow-hidden">
          <div className="max-w-[100vw] mx-auto relative z-10">
            <div className="mb-20 reveal-on-scroll px-4 md:px-32 max-w-7xl mx-auto text-center">
              <p className="text-[#0076b6] font-bold tracking-[0.2em] uppercase mb-3 text-sm font-outfit">
                {dataDict.teamTitle}
              </p>
              <h2
                className={`text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight font-outfit`}
              >
                {dataDict.teamSubtitle}
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {dataDict.teamDesc}
              </p>
            </div>

            {/* Container holding all 3 Team rows */}
            <div className="flex flex-col w-full gap-16 md:gap-24">
              <div className="w-full max-w-5xl mx-auto mb-24 px-4">
                <div className="reveal-on-scroll bg-[#0f172a] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_40px_rgba(0,118,182,0.15)] border border-white/10 group">
                  <div className="md:w-2/5 h-fit md:h-auto relative overflow-hidden">
                    <img
                      // loading="lazy"
                      src="./assets/Team members/nour.png"
                      alt="Dr. Nouraldin Sharaby"
                      className="w-full h-auto sm:h-full sm:w-auto opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                    <div className="w-12 h-1 bg-sky-400 mb-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <h3 className="text-[#0076b6] font-bold tracking-[0.2em] uppercase text-sm mb-2 font-outfit">
                      Academic Supervisor
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-outfit">
                      Dr. Nouraldin Sharaby
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-inter">
                      We extend our deepest gratitude for his invaluable
                      guidance, continuous support, and profound academic
                      insights throughout every phase of the NxtGraft project.
                    </p>
                    <a href="https://www.linkedin.com/in/noureldin-sharaby-ph-d-48b26b175?utm_source=share_via&utm_content=profile&utm_medium=member_ios">
                      <LinkedinLogoIcon className="mt-4 text-[#0076b6] w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>

              {teamCategories.map((category, idx) => {
                // Direction Logic: Even rows (0: Electrical, 2: Design) move right-to-left. Odd rows (1: Pneumatic) move left-to-right.
                const isReverse = idx % 2 !== 0;
                const marqueeClass = isReverse
                  ? "image-marquee-container-reverse"
                  : "image-marquee-container";

                // Reverse the array order for reversed rows so the cards don't perfectly align vertically with other rows
                const baseMembers = isReverse
                  ? [...category.members].reverse()
                  : category.members;

                // Duplicate the array to create the infinite looping illusion
                const duplicatedMembers = [...baseMembers, ...baseMembers];

                return (
                  <div
                    key={category.id}
                    className="relative flex flex-col items-center w-full"
                  >
                    {/* Sub-Team Category Title with decorative Divider line */}
                    <div className="reveal-on-scroll text-center relative w-full max-w-7xl mx-auto flex items-center justify-center mb-8 md:mb-12 px-4 md:px-32">
                      <div className="absolute w-full h-[1px] bg-slate-200 top-1/2 -translate-y-1/2 z-0"></div>
                      <h3
                        className={`relative z-10 px-8 text-2xl md:text-3xl font-black text-slate-800 bg-white tracking-wide font-outfit`}
                      >
                        {category.title}
                      </h3>
                    </div>

                    {/* Team Members Infinite Marquee Container */}
                    <div className="relative w-full overflow-hidden flex">
                      {/* The Track: We force dir="ltr" here so the CSS animation translates correctly regardless of site language */}
                      <div
                        className={`${marqueeClass} flex gap-4 sm:gap-6 px-4 hover:[animation-play-state:paused]`}
                        dir="ltr"
                      >
                        {duplicatedMembers.map((member, mIdx) => {
                          return (
                            <div
                              key={`${member.id}-${mIdx}`}
                              className="w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] aspect-[3/4] shrink-0 group relative overflow-hidden bg-[#0f172a] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#0076b6]/20 transition-all duration-700 "
                            >
                              <img
                                // loading="lazy"
                                src={member.image}
                                alt={member.name}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all duration-700 pointer-events-none"
                              />

                              {/* Member Details Overlay - We map the UI direction back to the user's selected language here */}
                              <div
                                className="absolute top-0 left-0 w-full p-4 pt-2 md:p-8 md:pt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end"
                                dir="ltr"
                              >
                                <h3
                                  className={`text-lg sm:text-2xl font-bold text-white mb-1 font-outfit`}
                                >
                                  {member.name}
                                </h3>

                                <div className="flex items-center justify-between">
                                  <div
                                    className={`w-12 h-1 bg-sky-400 mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                                  ></div>
                                  {/* Clickable Icon */}
                                  <a
                                    href={member.linkedIn || "#"}
                                    className={`w-8 h-8 rounded-full border border-white/20 hover:bg-[#0076b6] hover:border-transparent flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-x-4 group-hover:translate-x-0`}
                                  >
                                    <LinkedinLogoIcon className="w-4 h-4 text-white" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
          SPECIAL THANKS SECTION
      ========================================= */}
        {/* Editorial layout acknowledging mentors, styled with elegant cursive fonts instead of standard tech fonts */}
        <section
          id="thanks"
          className="py-24 md:py-40 bg-[#0a0f16] relative overflow-hidden border-t border-b border-[#0076b6]/20"
        >
          {/* Subtle royal background glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="reveal-on-scroll text-center mb-8 md:mb-12">
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl text-[#0076b6] mb-6 font-thanks-en tracking-wide`}
              >
                {dataDict.specialThanksTitle}
              </h2>
              <div className="w-24 h-[1px] bg-amber-400/30 mx-auto mb-6"></div>
              <p
                className={`text-xl text-slate-400 max-w-3xl mx-auto font-thanks-en`}
              >
                {dataDict.specialThanksDesc}
              </p>
            </div>

            {/* Mentors List Wrapper */}
            <div className="flex max-w-5xl mx-auto">
              {specialThanksData.map((person, index) => {
                // Stagger the layout: Even indices align left, odd indices align right
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={person.id}
                    className={`reveal-on-scroll relative w-full flex justify-center ${isEven ? "items-start text-start" : "items-end text-end"}`}
                  >
                    <h3 className="text-2xl md:text-4xl text-white tracking-wider dancing-script transform text-center">
                      {person.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================
          FOOTER SECTION
      ========================================= */}
        {/* Comprehensive project info, university links, and complete team directory */}
        <footer className="bg-[#001c2b] pt-24 pb-12 border-t border-sky-900/30 relative overflow-hidden text-slate-300">
          {/* Giant watermark branding in the background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <h1 className="text-[20rem] font-black text-white whitespace-nowrap -translate-y-1/4 font-outfit">
              NxtGraft
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
              {/* Column 1: Brand & Project Information */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0076b6] to-sky-400 flex items-center justify-center mb-6 shadow-lg shadow-[#0076b6]/30">
                  <Leaf className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-white font-black text-4xl tracking-widest font-outfit mb-4">
                  NxtGraft
                </h3>
                <p className={`text-slate-400 mb-8 leading-relaxed font-inter`}>
                  {dataDict.footerAboutDesc}
                </p>

                <div className="space-y-4 w-full">
                  <h4
                    className={`text-white font-bold tracking-wider md-4 sm:mb-2 font-outfit`}
                  >
                    {dataDict.footerContactTitle}
                  </h4>
                  <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start">
                    <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0" />
                    <span className="font-inter">
                      {dataDict.footerUniv} - {dataDict.footerDept}
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Full Team Directory categorized in columns */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {teamCategories.map((category) => (
                  <div key={`footer-${category.id}`}>
                    <h4
                      className={`text-white font-bold tracking-wider uppercase mb-6 pb-2 border-b border-white/10 font-outfit`}
                    >
                      {category.title}
                    </h4>
                    <ul className="space-y-4">
                      {/* Maps over every team member in the category to list their LinkedIn link */}
                      {category.members.map((member) => (
                        <li key={`link-${member.id}`}>
                          <a
                            href={member.linkedIn}
                            className="group flex items-center gap-3 hover:text-white transition-colors"
                          >
                            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-[#0076b6] transition-colors">
                              <LinkedinLogoIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-inter">{member.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Copyright & General Links Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p
                className={`text-slate-500 text-sm tracking-wide font-inter text-center w-full`}
              >
                {dataDict.footerText}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
