export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ROLES = {
  FREELANCER: 'freelancer',
  CLIENT: 'client',
  ADMIN: 'admin',
} as const;

export const AI_FEATURES = {
  PITCH_BUILDER: 'pitch_builder',
  CAREER_ANALYZER: 'career_analyzer',
  SMART_RECOMMEND: 'smart_recommend',
  COACH_CHAT: 'coach_chat',
} as const;