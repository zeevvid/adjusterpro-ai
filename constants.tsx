
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
  CreditCard,
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
  roles?: UserRole[];
  isPublic?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  // Admin Views
  { id: AppView.SAAS_ADMIN, label: 'SaaS Command Center', icon: <CreditCard size={20} />, roles: [UserRole.ADMIN] },

  // Adjuster (Partner) Views
  { id: AppView.ADJUSTER_DASHBOARD, label: 'Partner Dashboard', icon: <LayoutDashboard size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.XACTIMATE_VERIFY, label: 'Verify Xactimate', icon: <FileSignature size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.CLIENT_MANAGEMENT, label: 'Claims & Leads', icon: <ClipboardList size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.GPS_TRACKER, label: 'Staff GPS Tracker', icon: <Navigation size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.STORM_HISTORY, label: 'Storm Archive', icon: <History size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.DIRECTORY, label: 'Service Directory', icon: <Phone size={20} />, roles: [UserRole.ADJUSTER, UserRole.ADMIN] },
  { id: AppView.SUBSCRIPTION, label: 'My Subscription', icon: <Settings size={20} />, roles: [UserRole.ADJUSTER] },

  // Public / Homeowner Hub (also seen by Adjuster/Admin if we want, but filtered in Layout)
  { id: AppView.DASHBOARD, label: 'Homeowner Hub', icon: <Home size={20} />, isPublic: true },
  { id: AppView.FILE_CLAIM, label: 'Damage Calculator', icon: <FilePlus size={20} />, isPublic: true },
  { id: AppView.WEATHER_RADAR, label: 'Storm Radar', icon: <CloudLightning size={20} />, isPublic: true },
  { id: AppView.EDUCATION, label: 'Education Hub', icon: <GraduationCap size={20} />, isPublic: true },
  { id: AppView.REFERRAL, label: 'Referral Program', icon: <Share2 size={20} />, isPublic: true },
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
