import React from 'react';
import { Zap, Wind, EyeOff, Activity, ArrowUpRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StuntHighlights = () => {
  const stunts = [
    {
      id: 'vertical-orbit',
      title: '88° Vertical Wall Orbit',
      subtitle: 'Pure Centrifugal Equilibrium',
      description:
        'Sustained orbital velocity generating 2.5G of lateral centripetal acceleration, pinning the motorcycle against sheer vertical timber planks.',
      speed: '65 km/h',
      gForce: '2.5G',
      icon: Zap,
      image: '/images/gallery/jagannathpur_mela_wod.jpg',
      difficulty: 'Master Level',
    },
    {
      id: 'hands-free',
      title: 'Mudma Mela Stunt Team',
      subtitle: 'Royal Enfield Wall Formation',
      description:
        'Fearless balance and traditional stunt discipline maneuvering heavyweight Royal Enfield machines along the high-rim wooden barrel.',
      speed: '58 km/h',
      gForce: '2.2G',
      icon: Wind,
      image: '/images/gallery/mudma_mela_varsha_rider.jpg',
      difficulty: 'Elite Specialist',
    },
    {
      id: 'tandem-sync',
      title: 'Twin Bike Tandem Weave',
      subtitle: 'Sub-Foot Precision Separation',
      description:
        'Two customized motorcycles orbiting simultaneously on overlapping planes, weaving inches apart at full engine throttle.',
      speed: '70 km/h',
      gForce: '2.8G',
      icon: Activity,
      image: '/images/gallery/tandem_wall_orbit.jpg',
      difficulty: 'Pro Formation',
    },
    {
      id: 'sensory-ride',
      title: 'Sensory Arena Rim Climb',
      subtitle: 'Acoustic Reverberation Navigation',
      description:
        'Climbing from the bottom bowl to the top perimeter guided exclusively by acoustic reverberations of the exhaust against the wooden staves.',
      speed: '50 km/h',
      gForce: '2.0G',
      icon: EyeOff,
      image: '/images/gallery/arena_grounds_portrait.jpg',
      difficulty: 'Legendary Feat',
    },
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              Signatures & Stunts
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Defying Gravity <span className="text-gradient-fire">On The Wall</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View Full Stunt Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stunts.map((stunt) => {
            const Icon = stunt.icon;
            return (
              <div
                key={stunt.id}
                className="group relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-cyan-500/10 card-top-line flex flex-col justify-between"
              >
                {/* Image Header with Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={stunt.image}
                    alt={stunt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {stunt.difficulty}
                  </span>
                  <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white shadow-lg shadow-cyan-950/50">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Stunt Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {stunt.title}
                    </h3>
                    <p className="text-xs text-cyan-400/90 font-medium mb-3">
                      {stunt.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {stunt.description}
                    </p>
                  </div>

                  {/* Physics Telemetry Stats */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Velocity</span>
                      <span className="font-bold text-slate-200">{stunt.speed}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Lateral Force</span>
                      <span className="font-bold text-cyan-400">{stunt.gForce}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
