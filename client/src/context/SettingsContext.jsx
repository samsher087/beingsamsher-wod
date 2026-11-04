import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/client';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    brandName: 'Naju Rider',
    tagline: 'Well of Death',
    heroHeadline: 'Well of Death',
    heroSubheadline: '',
    riderTitle: 'Master Centrifugal Wall Stunt Specialist',
    heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    heroImageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1920&q=80',
    aboutBio:
      'With over 14 years of daredevil riding experience across India’s grandest cultural melas and stunt arenas, Naju Rider has mastered the perilous physics of the wooden cylindrical Well of Death (Maut Ka Kuan). Performing at dizzying 88-degree vertical inclines purely powered by centrifugal force and surgical balance, he has elevated traditional Indian stunt artistry to an internationally admired discipline.',
    statsYearsExperience: 14,
    statsArenaShows: 650,
    statsWallIncline: '88°',
    statsSafetyRecord: '100% Zero Severe Injury',
    trainingFee: 9999,
    contactEmail: 'contact@najurider.com',
    contactPhone: '+91 7488405975',
    contactWhatsApp: '+917488405975',
    headquartersAddress: 'Kusaiya, Giridih, Jharkhand',
    socialLinks: {
      instagram: 'https://www.instagram.com/naju_rider_18/',
      youtube: 'https://youtube.com/@najurider',
      facebook: 'https://www.facebook.com/najurider18',
    },
    razorpayKeyId: 'rzp_test_WODLiveDemoKey',
    isRazorpayLive: false,
    testimonials: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await apiClient.get('/settings');
      if (res?.settings) {
        setSettings(res.settings);
      }
    } catch (err) {
      console.warn('Could not fetch settings, using defaults:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
