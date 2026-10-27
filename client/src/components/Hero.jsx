import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  Flame,
  Play,
  Volume2,
  VolumeX,
  ChevronRight,
  Shield,
  Compass,
  GraduationCap,
  Sparkles,
  Zap,
  Activity,
} from 'lucide-react';

export const Hero = () => {
  const { settings } = useSettings();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background Video / Visual Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={settings.heroVideoUrl || '/videos/trailer.mp4'}
          poster={settings.heroImageUrl || '/images/naju_rider_banner.jpg'}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-30 scale-105 filter brightness-90 contrast-110"
        />
        {/* SoftDeals Slate Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/80" />
        
        {/* Ambient Cyan/Teal Glow Orbs (SoftDeals Signature) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-teal-500/15 to-emerald-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Audio Toggle Pill */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all shadow-lg"
        title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-cyan-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        <span className="hidden sm:inline">{isMuted ? 'Enable Sound' : 'Mute Audio'}</span>
      </button>

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        {/* Top SoftDeals Tech Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-200 font-bold uppercase tracking-wider">
            {settings.riderTitle || 'Master Centrifugal Wall Rider & Stunt Specialist'}
          </span>
        </div>

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
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
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

        {/* Telemetry Metric Cards (SoftDeals 4-Grid Card Style) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 text-left card-top-line transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-300 block">
              {settings.statsWallIncline || '88°'}
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mt-1">
              Wall Incline Angle
            </span>
            <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">Vertical timber barrel cylinder</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 text-left card-top-line transition-all hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-teal-300 block">
              {settings.statsYearsExperience || '14'}+
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mt-1">
              Years Stunt Mastery
            </span>
            <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">National arena veteran</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 text-left card-top-line transition-all hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400 block">
              {settings.statsArenaShows || '650'}+
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mt-1">
              Live Arena Shows
            </span>
            <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">Across 20+ Indian states</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 text-left card-top-line transition-all hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 block flex items-center gap-1.5">
              <Shield className="w-6 h-6 text-emerald-400 shrink-0 inline" />
              100%
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block mt-1">
              Zero Severe Injury
            </span>
            <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">Meticulous safety protocol</p>
          </div>
        </div>
      </div>
    </section>
  );
};
