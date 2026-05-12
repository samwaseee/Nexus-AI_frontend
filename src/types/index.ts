export type Role = 'freelancer' | 'client' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  skills?: string[];
  bio?: string;
  hourlyRate?: number;
  createdAt: string;
}

export interface Gig {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  requiredSkills: string[];
  status: 'open' | 'in_progress' | 'completed';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}