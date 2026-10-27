import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import { VideoModal } from '../components/VideoModal';
import { ReelCard } from '../components/ReelCard';
import { InstagramIcon, InstagramReelIcon } from '../components/SocialIcons';
import { useSettings } from '../context/SettingsContext';
import {
  Play,
  Flame,
  Shield,
  Lock,
  ArrowRight,
  Eye,
  Clock,
  Loader2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const VideosPage = () => {
  const { settings } = useSettings();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const categories = [
    'All',
    'Stunt Highlights',
    'Live Performances',
    'Tandem Stunts',
    'Extreme Stunts',
    'Behind the Scenes',
  ];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/videos');
      if (res?.videos) {
        setVideos(res.videos);
        setFilteredVideos(res.videos);
      }
    } catch (err) {
      console.warn('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter((v) => v.category === cat));
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-36 pb-24 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
              <InstagramReelIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Instagram Reels Showcase
              </span>
              <span className="text-[10px] text-slate-400">@naju_rider_18</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              Stunt Reels & <span className="text-gradient-fire">Videos</span>
            </h1>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Watch official Instagram reels and viral high-speed wall footage by Naju Rider. Click any video to open the interactive reel popup screen with instant autoplay and audio controls.
            </p>
          </div>

          <a
            href={settings.socialLinks?.instagram || 'https://www.instagram.com/naju_rider_18/'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-850 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950/50 transition-all shrink-0 self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-cyan-400" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* Separation Notice between Public Reels & Paid Training */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 card-top-line flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Public Reels & Showcases
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 text-cyan-300 border border-slate-800 font-semibold">
                  Free Access
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Full 8-week structured curriculum videos (physics theory, mechanical carburetor tuning, supervised arena riding) require academy application and approval.
              </p>
            </div>
          </div>
          <Link
            to="/training"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-md shadow-cyan-950/50 flex items-center gap-1.5 shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Apply for Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow-md shadow-cyan-950/50'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <p className="text-xs uppercase tracking-wider">Loading stunt reels...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-slate-900 border border-slate-800 p-8 card-top-line">
            <Play className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Reels in this Category</h3>
            <p className="text-xs text-slate-400 mt-1">Select another filter or check back soon as new reels are published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((vid) => (
              <ReelCard
                key={vid._id}
                video={vid}
                onWatch={(v) => setActiveVideo(v)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Instagram Reels Popup Player Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        video={activeVideo}
        videos={filteredVideos}
        onSelectVideo={setActiveVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};
