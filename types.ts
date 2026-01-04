
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  FILE_CLAIM = 'FILE_CLAIM',
  CLIENT_PORTAL = 'CLIENT_PORTAL',
  WEATHER_RADAR = 'WEATHER_RADAR',
  EDUCATION = 'EDUCATION',
  OPERATIONS = 'OPERATIONS',
  DIRECTORY = 'DIRECTORY',
  SETTINGS = 'SETTINGS',
  CLIENT_MANAGEMENT = 'CLIENT_MANAGEMENT',
  XACTIMATE = 'XACTIMATE',
  GPS_TRACKER = 'GPS_TRACKER',
  MARKETING = 'MARKETING',
  STORM_HISTORY = 'STORM_HISTORY',
  LANDING = 'LANDING',
  PUBLIC_INTAKE = 'PUBLIC_INTAKE',
  ADJUSTER_DASHBOARD = 'ADJUSTER_DASHBOARD',
  SAAS_ADMIN = 'SAAS_ADMIN',
  SUBSCRIPTION = 'SUBSCRIPTION',
  REFERRAL = 'REFERRAL',
  XACTIMATE_VERIFY = 'XACTIMATE_VERIFY'
}

export enum SubscriptionTier {
  STARTER = 'STARTER',
  PRO = 'PRO',
  AGENCY = 'AGENCY',
  NONE = 'NONE'
}

export interface AdjusterProfile {
  uid: string;
  email: string;
  referralId: string; // Unique tracking ID
  stripeCustomerId?: string;
  tier: SubscriptionTier;
  subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'none';
  companyName?: string;
  logoUrl?: string;
  customBranding?: boolean;
}

export interface PublicIntakeData {
  damageType: string;
  damageDetails: string;
  lossDate: string;
  address: string;
  hasPolicy: boolean;
  policyFile?: File;
  contactName: string;
  contactPhone: string;
  contactTime: string;
  referralId?: string; // Attribution
  conversionFeePaid?: boolean;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADJUSTER = 'ADJUSTER',
  ADMIN = 'ADMIN'
}

export interface WeatherThresholds {
  windSpeed: number; // in mph
  hailSize: number; // in inches
  rainRate: number; // in inches/hour
  floodRisk: boolean;
}

export interface AlertZone {
  id: string;
  name: string;
  location: string;
  thresholds: WeatherThresholds;
  active: boolean;
}

export interface ClaimData {
  policyNumber: string;
  dateOfLoss: string;
  damageDescription: string;
  photos: string[];
  receipts: string[];
  status: 'Draft' | 'Submitted' | 'Processing' | 'Closed';
}

export interface Message {
  id: string;
  sender: 'Client' | 'Adjuster' | 'AI';
  text: string;
  timestamp: Date;
}

export interface EmployeeLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lastUpdate: string;
}
