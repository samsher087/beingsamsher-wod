import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  Play,
  ChevronRight,
  Compass,
  GraduationCap,
} from 'lucide-react';

export const Hero = () => {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        {/* SoftDeals Slate Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/80" />
        
        {/* Ambient Cyan/Teal Glow Orbs (SoftDeals Signature) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-teal-500/15 to-emerald-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[1.05]">
          <span className="text-gradient-fire">
            {settings.heroHeadline && settings.heroHeadline !== 'Experience the Thrill of Well of Death'
              ? settings.heroHeadline
              : 'Well of Death'}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
          {settings.heroSubheadline || 'Witness the Courage. Learn the Discipline. Respect the Risk.'}
        </p>

        {/* CTA Buttons */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link
            to="/training"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Apply for Training</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/gallery"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 font-bold text-sm sm:text-base tracking-wider uppercase hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Explore Gallery</span>
          </Link>

          <Link
            to="/videos"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-300 font-bold text-sm sm:text-base tracking-wider uppercase hover:text-white hover:bg-slate-850 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-current" />
            <span>Watch Stunts</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
