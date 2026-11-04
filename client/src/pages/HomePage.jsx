import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { StuntHighlights } from '../components/StuntHighlights';
import { TrainingAcademyTeaser } from '../components/TrainingAcademyTeaser';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ImageLightbox } from '../components/ImageLightbox';
import { VideoModal } from '../components/VideoModal';
import { ReelCard } from '../components/ReelCard';
import { InstagramIcon, InstagramReelIcon } from '../components/SocialIcons';
import { useSettings } from '../context/SettingsContext';
import { apiClient } from '../api/client';
import {
  Flame,
  Award,
  Play,
  ArrowUpRight,
  ShieldAlert,
  Compass,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HomePage = () => {
  const { settings } = useSettings();
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState([]);

  // Lightbox & Video Modal states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // Fetch featured gallery images
    apiClient.get('/gallery?category=All').then((res) => {
      if (res?.items) {
        setFeaturedPhotos(res.items.slice(0, 6));
      }
    }).catch(console.warn);

    // Fetch featured public stunt videos
    apiClient.get('/videos').then((res) => {
      if (res?.videos) {
        setFeaturedVideos(res.videos.slice(0, 3));
      }
    }).catch(console.warn);
  }, []);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      {/* Hero Section */}
      <Hero />

      {/* Rider Bio Spotlight */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/90 backdrop-blur-xl card-top-line flex flex-col group">
              {/* Image Container */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src="/images/naju_rider_banner.jpg"
                  alt="Naju Rider Maut Ka Kuan Stunt Team"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-md">
                  Official Stunt Team
                </span>
              </div>

              {/* Info / Badge Footer Bar (cleanly aligned below the photo, inside the card) */}
              <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black shrink-0">
                    <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Naju Rider</h4>
                    <p className="text-xs text-cyan-400/90 font-medium">10+ Years Undefeated Safety & Show Record</p>
                  </div>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Certified</span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">


              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                Mastering the 30-Foot <span className="text-gradient-fire">Wooden Cylinder</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                {settings.aboutBio ||
                  'Welcome to the world of Naju Rider — where courage meets passion and every ride is a test of skill, balance, and fearless determination. Since 2016, I have been pursuing my passion for Well of Death (Maut Ka Kuan) riding, a thrilling and traditional Indian stunt performance that demands extraordinary focus, precision, and confidence.'}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-cyan-400 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md group"
                >
                  <span>Explore Rider Journey</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signatures & Physics Stunts */}
      <StuntHighlights />

      {/* Featured Photo Gallery Preview */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5" />
                Arena Snapshots
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Featured <span className="text-gradient-fire">Photo Moments</span>
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore All Photos</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotos.map((photo, index) => (
              <div
                key={photo._id || index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 card-top-line"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 font-bold uppercase border border-cyan-500/30">
                    {photo.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2 line-clamp-1">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instagram Stunt Reels */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
                <InstagramReelIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  Viral Instagram Reels
                </span>
                <span className="text-[10px] text-slate-400 font-normal">@naju_rider_18</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Trending Stunt <span className="text-gradient-fire">Reels</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                Experience high-octane 88° wall climbs and tandem stunts. Click any reel to watch instantly in the full-screen reel player.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={settings.socialLinks?.instagram || 'https://www.instagram.com/naju_rider_18/'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-850 transition-all shadow-sm"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Follow @naju_rider_18</span>
              </a>
              <Link
                to="/videos"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300"
              >
                <span>View All Reels</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <ReelCard
                key={video._id}
                video={video}
                onWatch={(v) => setActiveVideo(v)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Training Journey Teaser */}
      <TrainingAcademyTeaser />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Image Lightbox Modal */}
      <ImageLightbox
        items={featuredPhotos}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % featuredPhotos.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length)}
      />

      {/* Instagram Reels Popup Player Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        video={activeVideo}
        videos={featuredVideos}
        onSelectVideo={setActiveVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};
