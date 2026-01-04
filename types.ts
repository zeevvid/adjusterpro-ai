
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
  STORM_HISTORY = 'STORM_HISTORY'
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADJUSTER = 'ADJUSTER'
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
