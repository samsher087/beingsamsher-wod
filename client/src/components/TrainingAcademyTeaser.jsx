import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  FileText,
  UserCheck,
  CreditCard,
  Unlock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';

export const TrainingAcademyTeaser = () => {
  const { settings } = useSettings();

  const steps = [
    {
      num: '01',
      title: 'Online Application & Waiver',
      desc: 'Submit your riding background, emergency contacts, and accept the comprehensive safety waiver.',
      icon: FileText,
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'Admin Verification & Vetting',
      desc: 'Master Rider Naju Rider reviews your physical aptitude and motivation before approving.',
      icon: UserCheck,
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'Razorpay Secure Payment',
      desc: 'Pay the approved tuition fee via UPI, Cards, or NetBanking with instant GST receipt.',
      icon: CreditCard,
      badge: 'Step 3',
    },
    {
      num: '04',
      title: 'Training Portal Unlocked',
      desc: 'Gain instant access to 8 weeks of theory, custom motorcycle tuning, and arena drill videos.',
      icon: Unlock,
      badge: 'Step 4',
    },
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* SoftDeals ambient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Official Training Program
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Learn the Science & Skill <span className="text-gradient-fire">of Wall Riding</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Well of Death riding isn’t madness — it is disciplined centrifugal physics. Our structured online training academy breaks down the mechanical, physical, and psychological preparation needed before you ever enter the arena.
          </p>
        </div>

        {/* 4 Steps Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative p-6 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 group hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/15 flex flex-col justify-between card-top-line overflow-hidden"
              >
                {/* Background Stunt Image with 50% Opacity */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500 pointer-events-none"
                  style={{ backgroundImage: `url('/images/naju_rider_stunt_rx100.jpg')` }}
                />

                {/* Subtle dark gradient overlay for optimal text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90 pointer-events-none" />

                {/* Block Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      {s.badge}
                    </span>
                    <span className="text-2xl font-black text-slate-400 group-hover:text-cyan-300 transition-colors drop-shadow">
                      {s.num}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all mb-4 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors drop-shadow">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed drop-shadow-sm font-medium">
                    {s.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold">Strict Safety Requirement</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 shadow-2xl card-top-line flex flex-col lg:flex-row items-center justify-between gap-8 transition-colors">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full w-fit mx-auto lg:mx-0">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Limited Intake Per Batch (Max 15 Trainees)
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Enrollment Tuition Fee: <span className="text-cyan-300">₹{(settings.trainingFee || 4999).toLocaleString('en-IN')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Includes full access to 4 modules, 8 high-def masterclass videos, safety protocols, and personalized feedback from Naju Rider.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/training"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-cyan-950/60 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>View Curriculum & Apply</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
