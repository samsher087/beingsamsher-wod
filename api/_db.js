import mongoose from 'mongoose';

const DEFAULT_URI =
  'mongodb+srv://info_db_user:mVZnTk06RiZIiZQe@cluster0.qvxniat.mongodb.net/beingsamsher?retryWrites=true&w=majority';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI || DEFAULT_URI;
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log('[Mongo Atlas Connected]:', mongooseInstance.connection.host);
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    city: { type: String, default: '' },
    emergencyContact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// TrainingApplication Schema
const trainingAppSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    age: { type: Number, default: 22 },
    city: { type: String, default: 'India' },
    state: { type: String, default: 'India' },
    experienceLevel: { type: String, default: 'Intermediate' },
    reason: { type: String, default: 'Passionate about Well of Death stunt riding under Master Naju.' },
    emergencyContactName: { type: String, default: 'Family Contact' },
    emergencyContactPhone: { type: String, default: '' },
    status: { type: String, default: 'Application Submitted' },
    trainingFee: { type: Number, default: 9999 },
    paymentRefNo: { type: String, default: '' },
    paymentAmount: { type: Number, default: 4999 },
    paymentMethod: { type: String, default: 'UPI / QR Transfer' },
    agreedToSafetyWaiver: { type: Boolean, default: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const TrainingApplication =
  mongoose.models.TrainingApplication || mongoose.model('TrainingApplication', trainingAppSchema);

// Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingApplication' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentMethod: { type: String, default: 'UPI / QR Transfer' },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['successful', 'failed', 'pending'], default: 'pending' },
    verifiedByAdmin: { type: Boolean, default: false },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

// Setting Schema
const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Well of Death' },
    trainingFee: { type: Number, default: 9999 },
    upiId: { type: String, default: 'samsher.alam@okaxis' },
    contactPhone: { type: String, default: '+91 98765 43210' },
  },
  { timestamps: true }
);

export const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
