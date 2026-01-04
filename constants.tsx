
import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  Users, 
  CloudLightning, 
  GraduationCap, 
  Settings, 
  ShieldCheck, 
  MapPin,
  Phone,
  Briefcase,
  AlertTriangle,
  FileSignature,
  FolderLock,
  ClipboardList,
  Shield,
  Home,
  Calculator,
  Navigation,
  Share2,
  History
} from 'lucide-react';
import { AppView, UserRole } from './types';

export interface NavItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: AppView.DASHBOARD, label: 'My Home & Claim', icon: <Home size={20} />, roles: [UserRole.CLIENT] },
  { id: AppView.DASHBOARD, label: 'Staff Dashboard', icon: <LayoutDashboard size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.FILE_CLAIM, label: 'Submit Damage', icon: <FilePlus size={20} />, roles: [UserRole.CLIENT] },
  { id: AppView.CLIENT_MANAGEMENT, label: 'Claim Records', icon: <ClipboardList size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.XACTIMATE, label: 'Xactimate Scoping', icon: <Calculator size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.GPS_TRACKER, label: 'Staff GPS Tracker', icon: <Navigation size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.MARKETING, label: 'Marketing Hub', icon: <Share2 size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.STORM_HISTORY, label: 'Storm & Hail Archive', icon: <History size={20} />, roles: [UserRole.CLIENT, UserRole.ADJUSTER] },
  { id: AppView.CLIENT_PORTAL, label: 'Document Vault', icon: <FolderLock size={20} />, roles: [UserRole.CLIENT] },
  { id: AppView.OPERATIONS, label: 'Field Operations', icon: <Briefcase size={20} />, roles: [UserRole.ADJUSTER] },
  { id: AppView.WEATHER_RADAR, label: 'Storm Radar', icon: <CloudLightning size={20} />, roles: [UserRole.CLIENT, UserRole.ADJUSTER] },
  { id: AppView.EDUCATION, label: 'Education Hub', icon: <GraduationCap size={20} />, roles: [UserRole.CLIENT, UserRole.ADJUSTER] },
  { id: AppView.DIRECTORY, label: 'Service Directory', icon: <Phone size={20} />, roles: [UserRole.CLIENT, UserRole.ADJUSTER] },
];

export const INSURANCE_COMPANIES = [
  { name: 'State Farm', phone: '1-800-782-8332' },
  { name: 'Allstate', phone: '1-800-255-7828' },
  { name: 'Geico', phone: '1-800-841-3000' },
  { name: 'Progressive', phone: '1-800-776-4737' },
  { name: 'Liberty Mutual', phone: '1-800-290-8720' },
];

export const FAQ_DATA = [
  { q: "What is a Public Adjuster?", a: "A licensed professional who represents the policyholder, not the insurance company, to ensure maximum claim recovery." },
  { q: "When should I hire one?", a: "Immediately after a loss occurs, or if you feel your insurance company's settlement offer is too low." },
  { q: "How much does it cost?", a: "Most PAs work on a contingency fee basis, meaning they only get paid a percentage of the settlement they recover for you." }
];
