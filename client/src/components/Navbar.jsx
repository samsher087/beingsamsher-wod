import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import {
  Flame,
  Menu,
  X,
  User,
  Shield,
  LogOut,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Phone,
  Zap,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Rider', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Stunt Videos', path: '/videos' },
    { name: 'Training Academy', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Glass Navbar */}
      <nav className="bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-cyan-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden p-0.5">
                  <img
                    src={settings.logoUrl || '/images/logo.png'}
                    alt={settings.brandName || 'Well of Death'}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-slate-100 uppercase whitespace-nowrap group-hover:text-cyan-300 transition-colors">
                  {settings.brandName || 'Naju Rider'}
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold whitespace-nowrap hidden sm:block">
                  Well of Death Academy
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 px-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${active
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 font-semibold shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent hover:border-slate-800'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth & Primary Action CTA */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2.5">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Admin Control
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-sm font-medium text-slate-100 transition-all shadow-sm"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>{user.name.split(' ')[0]}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/training"
                    className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2 active:scale-95"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Apply for Training</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {user && (
                <Link
                  to="/dashboard"
                  className="p-2 text-cyan-400 bg-slate-900 rounded-lg border border-slate-800"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none border border-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${isActive(link.path)
                  ? 'text-cyan-300 bg-cyan-500/10 font-semibold border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-slate-100 font-medium border border-slate-800"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    Dashboard ({user.name})
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-500/30 font-medium"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Control Center
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors font-medium text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-slate-900 text-slate-200 font-medium hover:bg-slate-800 border border-slate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/training"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 text-white font-bold shadow-md shadow-cyan-950/50"
                  >
                    Apply Training
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Marquee Banner Strip (Positioned Just Below Menu) */}
      <div className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-[11px] font-medium text-slate-300 overflow-hidden select-none py-1.5 relative shadow-lg">
        <div className="flex items-center">
          {/* Live Badge */}
          <div className="z-10 bg-slate-950 pl-4 pr-3 flex items-center gap-2 shrink-0 border-r border-slate-800/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">Naju Rider Flash</span>
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-marquee flex items-center gap-8 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">⚡ ARENA TOUR 2026:</span> India's Premier Centrifugal Wall of Death Arena
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">88° WALL CLIMB:</span> Pure Gyroscopic Inertia & Physics Mastery
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">BATCH 08 ADMISSIONS:</span> Structured Online & In-Arena Certification Open
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">INSTAGRAM REELS:</span> New Viral Wall Footage Live On @naju_rider_18
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">⚡ ARENA TOUR 2026:</span> India's Premier Centrifugal Wall of Death Arena
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">88° WALL CLIMB:</span> Pure Gyroscopic Inertia & Physics Mastery
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">BATCH 08 ADMISSIONS:</span> Structured Online & In-Arena Certification Open
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-purple-400 font-bold">INSTAGRAM REELS:</span> New Viral Wall Footage Live On @naju_rider_18
              </span>
            </div>
          </div>

          {/* Fast Contact Pill on Right (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-4 z-10 bg-slate-950 shrink-0 border-l border-slate-800/80">
            <a
              href={`tel:${settings.contactPhone || '+917488405975'}`}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{settings.contactPhone || '+91 7488405975'}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
