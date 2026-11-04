import {
  initialSettings,
  initialUsers,
  initialCourse,
  initialGallery,
  initialVideos,
  initialApplications,
  initialPayments,
  initialAuditLogs,
} from './mockData';

// Helper to safely read and write to localStorage
const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const saveStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[Storage Warning] Failed to persist ${key}:`, err);
  }
};

// Initialize default storage collections if not present
const getStore = () => {
  const loadedSettings = { ...initialSettings, ...loadStorage('wod_settings', initialSettings) };
  if (loadedSettings.heroSubheadline === 'Witness the Courage. Learn the Discipline. Respect the Risk.') {
    loadedSettings.heroSubheadline = '';
  }
  return {
    settings: loadedSettings,
    users: loadStorage('wod_users', initialUsers),
    course: loadStorage('wod_course', initialCourse),
    gallery: loadStorage('wod_gallery', initialGallery),
    videos: loadStorage('wod_videos', initialVideos),
    applications: loadStorage('wod_applications', initialApplications),
    payments: loadStorage('wod_payments', initialPayments),
    auditLogs: loadStorage('wod_audit_logs', initialAuditLogs),
    progress: loadStorage('wod_progress', {}),
  };
};

// Helper: Convert File or Blob to optimized Data URL
const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Resize large images using canvas to prevent exceeding localStorage quota
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Current authenticated user helper
const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('wod_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// The in-browser Mock Router
const mockRouter = async (method, endpoint, body) => {
  // Normalize endpoint path and extract query params
  const [pathOnly, queryString] = endpoint.split('?');
  const path = pathOnly.replace(/\/$/, '') || '/';
  const query = new URLSearchParams(queryString || '');
  const store = getStore();
  const currentUser = getCurrentUser();

  // Artificial ultra-fast network latency (40ms) for snappy, realistic UX
  await new Promise((r) => setTimeout(r, 40));

  // 1. AUTH ROUTES
  if (path === '/auth/login' && method === 'POST') {
    const { email, password } = body || {};
    const user = store.users.find(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase()
    );

    if (!user || user.password !== password) {
      const err = new Error('Invalid email or password.');
      err.status = 401;
      throw err;
    }

    if (user.status === 'suspended') {
      const err = new Error('Your account is currently suspended. Please contact administrator.');
      err.status = 403;
      throw err;
    }

    const { password: _, ...safeUser } = user;
    const token = `wod_token_${user._id}_${Date.now()}`;
    return { success: true, token, user: safeUser };
  }

  if (path === '/auth/register' && method === 'POST') {
    const { name, email, password, phone, city } = body || {};
    if (!name || !email || !password) {
      const err = new Error('Name, email, and password are required.');
      err.status = 400;
      throw err;
    }

    const exists = store.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      const err = new Error('An account with this email address already exists.');
      err.status = 400;
      throw err;
    }

    const newUser = {
      _id: `user_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      password,
      role: 'user',
      city: city || 'India',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    saveStorage('wod_users', store.users);

    const { password: _, ...safeUser } = newUser;
    const token = `wod_token_${newUser._id}_${Date.now()}`;
    return { success: true, message: 'Account created successfully!', token, user: safeUser };
  }

  if (path === '/auth/me' && method === 'GET') {
    if (!currentUser) {
      const err = new Error('Session not found or expired.');
      err.status = 401;
      throw err;
    }
    const fresh = store.users.find((u) => u._id === currentUser._id) || currentUser;
    const { password: _, ...safeUser } = fresh;
    return { success: true, user: safeUser };
  }

  if (path === '/auth/profile' && method === 'PUT') {
    if (!currentUser) throw new Error('Unauthorized');
    const index = store.users.findIndex((u) => u._id === currentUser._id);
    if (index === -1) throw new Error('User not found');

    store.users[index] = {
      ...store.users[index],
      ...body,
      _id: currentUser._id,
      role: store.users[index].role, // preserve role
    };
    saveStorage('wod_users', store.users);
    const { password: _, ...safeUser } = store.users[index];
    return { success: true, message: 'Profile updated successfully', user: safeUser };
  }

  if (path === '/auth/forgot-password' && method === 'POST') {
    return {
      success: true,
      message: 'Demo Reset Code generated: DEMO-RESET-2026. You may now reset your password.',
      resetToken: 'DEMO-RESET-2026',
    };
  }

  if (path === '/auth/reset-password' && method === 'POST') {
    const { email, newPassword } = body || {};
    const index = store.users.findIndex(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase()
    );
    if (index !== -1) {
      store.users[index].password = newPassword;
      saveStorage('wod_users', store.users);
    }
    return { success: true, message: 'Password has been reset successfully. Please log in.' };
  }

  // 2. SETTINGS ROUTES
  if ((path === '/settings' || path === '/settings/admin') && method === 'GET') {
    return { success: true, settings: store.settings };
  }

  if (path === '/settings/admin' && method === 'PUT') {
    store.settings = { ...store.settings, ...body };
    saveStorage('wod_settings', store.settings);
    return { success: true, message: 'Site CMS configuration saved!', settings: store.settings };
  }

  // 3. FILE UPLOAD ROUTE (Converts file to Base64 Data URL)
  if (path === '/upload' && method === 'POST') {
    let file = null;
    if (body instanceof FormData) {
      file = body.get('image') || body.get('file');
    }
    if (!file && typeof body === 'object') {
      file = body.image || body.file;
    }

    if (!file) {
      return { success: true, url: '/images/gallery/arena_grounds_portrait.jpg' };
    }

    if (file instanceof Blob || file instanceof File) {
      const dataUrl = await fileToDataUrl(file);
      return {
        success: true,
        message: 'Image uploaded successfully (Client Storage)',
        url: dataUrl,
        filename: file.name || 'photo.jpg',
      };
    }

    return {
      success: true,
      url: typeof file === 'string' ? file : '/images/gallery/arena_grounds_portrait.jpg',
    };
  }

  // 4. GALLERY ROUTES
  if (path === '/gallery' && method === 'GET') {
    const category = query.get('category');
    const search = query.get('search');
    let items = [...store.gallery];

    if (category && category !== 'All') {
      items = items.filter((item) => item.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.caption && item.caption.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q))
      );
    }

    return { success: true, count: items.length, items };
  }

  if (path === '/gallery/admin' && method === 'POST') {
    const newItem = {
      _id: `gal_${Date.now()}`,
      title: body.title,
      category: body.category || 'Live Shows',
      imageUrl: body.imageUrl,
      caption: body.caption || '',
      location: body.location || '',
      dateTaken: body.dateTaken || '2026',
      featured: !!body.featured,
      order: store.gallery.length + 1,
      createdAt: new Date().toISOString(),
    };

    store.gallery.unshift(newItem);
    saveStorage('wod_gallery', store.gallery);

    // Audit log
    store.auditLogs.unshift({
      _id: `log_${Date.now()}`,
      admin: { name: currentUser?.name || 'Admin' },
      action: `Added photo "${newItem.title}" to gallery (${newItem.category})`,
      targetType: 'GalleryItem',
      createdAt: new Date().toISOString(),
    });
    saveStorage('wod_audit_logs', store.auditLogs);

    return { success: true, message: 'Photo added to gallery', item: newItem };
  }

  if (path.startsWith('/gallery/admin/') && method === 'DELETE') {
    const id = path.split('/')[3];
    const item = store.gallery.find((g) => g._id === id);
    store.gallery = store.gallery.filter((g) => g._id !== id);
    saveStorage('wod_gallery', store.gallery);

    if (item) {
      store.auditLogs.unshift({
        _id: `log_${Date.now()}`,
        admin: { name: currentUser?.name || 'Admin' },
        action: `Removed photo "${item.title}" from gallery`,
        targetType: 'GalleryItem',
        createdAt: new Date().toISOString(),
      });
      saveStorage('wod_audit_logs', store.auditLogs);
    }

    return { success: true, message: 'Photo deleted from gallery' };
  }

  // 5. VIDEO ROUTES
  if (path === '/videos' && method === 'GET') {
    return { success: true, count: store.videos.length, videos: store.videos };
  }

  if (path === '/videos/admin' && method === 'POST') {
    const newVideo = {
      _id: `vid_${Date.now()}`,
      title: body.title,
      category: body.category || 'Stunt Highlights',
      videoUrl: body.videoUrl,
      thumbnailUrl: body.thumbnailUrl || '/images/gallery/jagannathpur_mela_wod.jpg',
      duration: body.duration || '1:00',
      description: body.description || '',
      views: 1200,
      likes: 350,
      commentsCount: 15,
      isReel: true,
      featured: true,
      createdAt: new Date().toISOString(),
    };

    store.videos.unshift(newVideo);
    saveStorage('wod_videos', store.videos);

    return { success: true, message: 'Video published successfully', video: newVideo };
  }

  if (path.startsWith('/videos/admin/') && method === 'DELETE') {
    const id = path.split('/')[3];
    store.videos = store.videos.filter((v) => v._id !== id);
    saveStorage('wod_videos', store.videos);
    return { success: true, message: 'Video removed successfully' };
  }

  if (path.includes('/like') && method === 'POST') {
    const id = path.split('/')[2];
    const vid = store.videos.find((v) => v._id === id);
    if (vid) {
      vid.likes = (vid.likes || 0) + 1;
      saveStorage('wod_videos', store.videos);
      return { success: true, likes: vid.likes };
    }
    return { success: true, likes: 100 };
  }

  // 6. COURSE & CURRICULUM ROUTES
  if (path === '/courses/public-overview' && method === 'GET') {
    return { success: true, course: store.course };
  }

  if (path === '/courses/student-curriculum' && method === 'GET') {
    const userProgress = (currentUser && store.progress[currentUser._id]) || {};
    return {
      success: true,
      course: store.course,
      progress: {
        completedLessons: Object.keys(userProgress).filter((k) => userProgress[k]),
      },
    };
  }

  if (path === '/courses/admin/details' && method === 'GET') {
    return { success: true, course: store.course };
  }

  if (path === '/courses/progress' && method === 'POST') {
    if (!currentUser) throw new Error('Unauthorized');
    const { lessonId, completed } = body || {};
    if (!store.progress[currentUser._id]) {
      store.progress[currentUser._id] = {};
    }
    store.progress[currentUser._id][lessonId] = completed !== false;
    saveStorage('wod_progress', store.progress);
    return { success: true, message: 'Progress recorded' };
  }

  if (path === '/courses/admin/revoke-access' && method === 'POST') {
    const { userId, reason } = body || {};
    const app = store.applications.find(
      (a) => a.user?._id === userId || a.email === userId
    );
    if (app) {
      app.courseAccessGranted = false;
      app.status = 'rejected';
      saveStorage('wod_applications', store.applications);
    }
    return { success: true, message: `Access revoked: ${reason || 'Admin action'}` };
  }

  // 7. APPLICATIONS ROUTES
  if (path === '/applications/my-application' && method === 'GET') {
    if (!currentUser) return { success: true, application: null };
    const myApp = store.applications.find(
      (a) =>
        (a.user && a.user._id === currentUser._id) ||
        (a.email && a.email.toLowerCase() === currentUser.email?.toLowerCase())
    );
    return { success: true, application: myApp || null };
  }

  if (path === '/applications/apply' && method === 'POST') {
    if (!currentUser) throw new Error('Please log in to submit training application');
    const newApp = {
      _id: `app_${Date.now()}`,
      user: {
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      },
      fullName: body.fullName || currentUser.name,
      email: currentUser.email,
      phone: body.phone || currentUser.phone,
      age: body.age || 21,
      city: body.city || currentUser.city,
      ridingExperienceYears: body.ridingExperienceYears || 2,
      ridingBackground: body.ridingBackground || '',
      motivation: body.motivation || '',
      medicalClearanceDeclared: !!body.medicalClearanceDeclared,
      liabilityWaiverAccepted: !!body.liabilityWaiverAccepted,
      status: 'pending',
      paymentStatus: 'unpaid',
      courseAccessGranted: false,
      appliedAt: new Date().toISOString(),
    };

    store.applications.unshift(newApp);
    saveStorage('wod_applications', store.applications);

    return {
      success: true,
      message: 'Training application submitted for review!',
      application: newApp,
    };
  }

  if (path === '/applications/toggle-test-subscription' && method === 'POST') {
    if (!currentUser) throw new Error('Login required');
    let myApp = store.applications.find(
      (a) =>
        (a.user && a.user._id === currentUser._id) ||
        (a.email && a.email.toLowerCase() === currentUser.email?.toLowerCase())
    );

    if (!myApp) {
      myApp = {
        _id: `app_${Date.now()}`,
        user: { _id: currentUser._id, name: currentUser.name, email: currentUser.email },
        fullName: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '+91 99999 88888',
        age: 22,
        city: currentUser.city || 'Delhi',
        status: 'approved',
        paymentStatus: 'paid',
        courseAccessGranted: true,
        appliedAt: new Date().toISOString(),
      };
      store.applications.unshift(myApp);
    } else {
      myApp.status = 'approved';
      myApp.paymentStatus = 'paid';
      myApp.courseAccessGranted = true;
    }

    saveStorage('wod_applications', store.applications);
    return {
      success: true,
      message: 'Demo training access unlocked successfully!',
      application: myApp,
    };
  }

  if (path === '/applications/submit-payment-ref' && method === 'POST') {
    const { applicationId, paymentReference, paymentMethod, amount } = body || {};
    const app = store.applications.find((a) => a._id === applicationId);
    if (app) {
      app.paymentStatus = 'paid';
      app.status = 'approved';
      app.courseAccessGranted = true;
      saveStorage('wod_applications', store.applications);
    }

    const newPayment = {
      _id: `pay_${Date.now()}`,
      user: app?.user || { name: currentUser?.name || 'Trainee' },
      application: applicationId,
      amount: amount || 9999,
      currency: 'INR',
      method: paymentMethod || 'UPI QR',
      transactionId: paymentReference || `TXN_${Date.now()}`,
      status: 'successful',
      paidAt: new Date().toISOString(),
    };

    store.payments.unshift(newPayment);
    saveStorage('wod_payments', store.payments);

    return { success: true, message: 'Payment recorded and verified!', payment: newPayment };
  }

  if (path === '/applications/admin/all' && method === 'GET') {
    return { success: true, applications: store.applications };
  }

  if (path.startsWith('/applications/admin/') && path.endsWith('/status') && method === 'PUT') {
    const id = path.split('/')[3];
    const app = store.applications.find((a) => a._id === id);
    if (app) {
      app.status = body.status;
      if (body.status === 'approved') {
        app.courseAccessGranted = true;
      } else if (body.status === 'rejected') {
        app.courseAccessGranted = false;
      }
      saveStorage('wod_applications', store.applications);
      return { success: true, message: `Application status updated to ${body.status}`, application: app };
    }
    throw new Error('Application not found');
  }

  // 8. PAYMENTS ROUTES
  if (path === '/payments/my-payments' && method === 'GET') {
    if (!currentUser) return { success: true, payments: [] };
    const myPays = store.payments.filter(
      (p) =>
        p.user?._id === currentUser._id ||
        p.user?.email?.toLowerCase() === currentUser.email?.toLowerCase()
    );
    return { success: true, payments: myPays };
  }

  if (path === '/payments/admin/all' && method === 'GET') {
    return { success: true, payments: store.payments };
  }

  // 9. ADMIN OVERVIEW & USER MANAGEMENT
  if (path === '/admin/overview' && method === 'GET') {
    const totalRevenue = store.payments
      .filter((p) => p.status === 'successful')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return {
      success: true,
      stats: {
        totalUsers: store.users.length,
        totalApplications: store.applications.length,
        approvedApplications: store.applications.filter((a) => a.status === 'approved').length,
        pendingApplications: store.applications.filter((a) => a.status === 'pending').length,
        totalRevenue,
        activeEnrolledTrainees: store.applications.filter((a) => a.courseAccessGranted).length,
        galleryItemsCount: store.gallery.length,
        publicVideosCount: store.videos.length,
      },
      recentApplications: store.applications.slice(0, 5),
      recentPayments: store.payments.slice(0, 5),
      recentAuditLogs: store.auditLogs.slice(0, 10),
    };
  }

  if (path === '/admin/users' && method === 'GET') {
    const safeUsers = store.users.map(({ password: _, ...u }) => u);
    return { success: true, users: safeUsers };
  }

  if (path.startsWith('/admin/users/') && path.endsWith('/status') && method === 'PUT') {
    const id = path.split('/')[3];
    const user = store.users.find((u) => u._id === id);
    if (user) {
      user.status = user.status === 'active' ? 'suspended' : 'active';
      saveStorage('wod_users', store.users);
      const { password: _, ...safeUser } = user;
      return { success: true, message: `User status changed to ${user.status}`, user: safeUser };
    }
    throw new Error('User not found');
  }

  if (path === '/admin/audit-logs' && method === 'GET') {
    return { success: true, logs: store.auditLogs };
  }

  // Fallback for unhandled endpoints
  return { success: true, message: 'OK', data: {} };
};

// Exported apiClient object matching exact existing interface
export const apiClient = {
  async request(endpoint, options = {}) {
    const method = (options.method || 'GET').toUpperCase();
    return mockRouter(method, endpoint, options.body);
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  },

  upload(endpoint, formData, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: formData });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};
