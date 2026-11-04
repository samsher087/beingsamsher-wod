import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  Flame,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from './SocialIcons';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative SoftDeals Cyan Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Critical Safety Notice Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/30 card-top-line flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 shrink-0 border border-amber-400/20">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase flex items-center gap-2">
              Mandatory Safety & Non-Attempt Warning
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Well of Death (Maut Ka Kuan) riding requires extreme centrifugal acceleration, custom reinforced motorcycles, and years of physical training.
              Online instructional videos are strictly for theoretical understanding and certified arena student review. Never attempt wall riding independently.
            </p>
          </div>
          <Link
            to="/safety-disclaimer"
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-colors whitespace-nowrap"
          >
            Read Protocol
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[2px] shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden p-0.5">
                  <img
                    src={settings.logoUrl || '/images/logo.png'}
                    alt={settings.brandName || 'Well of Death'}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              </div>
              <span className="text-base font-black text-white uppercase tracking-wider">
                {settings.brandName || 'Naju Rider'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.tagline || 'Witness the Courage. Learn the Discipline. Respect the Risk.'}
            </p>
            <p className="text-xs text-slate-500">
              India’s pioneer in centrifugal arena wall riding, high-incline motorcycle acrobatics, and professional stunt training.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 border border-slate-800 transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2.5">
              Explore Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  Rider Bio & Physics of Well
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-cyan-400 transition-colors">
                  High-Octane Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-cyan-400 transition-colors">
                  Public Stunt Performance Reels
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-cyan-400 transition-colors text-cyan-400 font-semibold">
                  Training Academy Curriculum
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Event Bookings & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-2.5">
              Safety & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/safety-disclaimer" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  Safety & Risk Waiver
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms of Service & Rules
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy & Data Security
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-cyan-400 transition-colors">
                  Fee & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters & Booking */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Address
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {settings.headquartersAddress || 'Kusaiya, Giridih, Jharkhand'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.contactPhone || '+917488405975'}`} className="hover:text-white transition-colors">
                  {settings.contactPhone || '+91 7488405975'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail || 'contact@samsher-wod.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {settings.brandName || 'Naju Rider'}. All rights reserved. Professional Well of Death Stunts.
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Naju Rider | Fearless Since 2016.
          </p>
        </div>
      </div>
    </footer>
  );
};
