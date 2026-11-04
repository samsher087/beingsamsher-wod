import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { apiClient } from '../api/client';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Compass,
  GraduationCap,
} from 'lucide-react';

const defaultSlides = [
  {
    imageUrl: '/images/gallery/tandem_wall_orbit.jpg',
    title: 'Twin Bike Tandem Stunt',
    category: 'Live Shows',
    location: 'Carnival Arena',
  },
  {
    imageUrl: '/images/gallery/jagannathpur_mela_wod.jpg',
    title: 'Jagannathpur Mela Stunt',
    category: 'Live Shows',
    location: 'Ranchi, Jharkhand',
  },
  {
    imageUrl: '/images/gallery/mudma_mela_varsha_rider.jpg',
    title: 'Mudma Mela Stunt Team',
    category: 'Events',
    location: 'Mudma, Ranchi',
  },
  {
    imageUrl: '/images/gallery/arena_grounds_portrait.jpg',
    title: 'Maut Ka Kuan Arena Grounds',
    category: 'Behind the Scenes',
    location: 'Ranchi Stunt Grounds, Jharkhand',
  },
  {
    imageUrl: '/images/naju_rider_banner.jpg',
    title: 'Naju Rider Stunt Team',
    category: 'Achievements',
    location: 'National Tour',
  },
];

export const Hero = () => {
  const { settings } = useSettings();
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    apiClient.get('/gallery').then((res) => {
      if (res?.items && res.items.length > 0) {
        setSlides(res.items.slice(0, 6));
      }
    }).catch(console.warn);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide] || slides[0] || defaultSlides[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 select-none">
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide._id || slide.imageUrl || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-55' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title || 'Well of Death Stunt'}
              className={`w-full h-full object-cover filter brightness-95 contrast-110 transition-transform duration-7000 ease-out ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* SoftDeals Slate Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90" />

        {/* Ambient Cyan/Teal Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-teal-500/15 to-emerald-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Slideshow Arrow Left */}
      <button
        type="button"
        onClick={handlePrevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/75 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all flex items-center justify-center shadow-xl hover:scale-105 group cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5 text-cyan-400" />
      </button>

      {/* Slideshow Arrow Right */}
      <button
        type="button"
        onClick={handleNextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/75 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all flex items-center justify-center shadow-xl hover:scale-105 group cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 text-cyan-400" />
      </button>

      {/* Hero Core Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight max-w-5xl mx-auto leading-[1.05] drop-shadow-2xl">
          <span className="text-gradient-fire">
            {settings.heroHeadline && settings.heroHeadline !== 'Experience the Thrill of Well of Death'
              ? settings.heroHeadline
              : 'Well of Death'}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-xl md:text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
          {settings.heroSubheadline || 'Witness the Courage. Learn the Discipline. Respect the Risk.'}
        </p>

        {/* CTA Buttons */}
        <div className="mt-32 sm:mt-44 lg:mt-56 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <Link
            to="/training"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Apply for Training</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/gallery"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 font-bold text-sm sm:text-base tracking-wider uppercase hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Explore Gallery</span>
          </Link>

          <Link
            to="/videos"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800 text-slate-300 font-bold text-sm sm:text-base tracking-wider uppercase hover:text-white hover:bg-slate-850 hover:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-current" />
            <span>Watch Stunts</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
