import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ─── Request interceptor — attach JWT token ────────────────────────────
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Only runs on client side
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.user?.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — normalize errors ──────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string; errors?: unknown[] }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;

// ─── Typed API helpers ─────────────────────────────────────────────────
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh-token", { refreshToken }),
};

export const userApi = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data: Record<string, unknown>) =>
    api.put("/users/profile", data),
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => api.post("/users/change-password", data),
  getPublicProfile: (id: string) => api.get(`/users/${id}`),
};

export const gigApi = {
  getGigs: (params?: Record<string, unknown>) =>
    api.get("/gigs", { params }),
  getGigById: (id: string) => api.get(`/gigs/${id}`),
  getGigBySlug: (slug: string) => api.get(`/gigs/slug/${slug}`),
  getRelatedGigs: (id: string) => api.get(`/gigs/${id}/related`),
  getMyGigs: (params?: Record<string, unknown>) =>
    api.get("/gigs/freelancer/my-gigs", { params }),
  createGig: (data: Record<string, unknown>) => api.post("/gigs", data),
  updateGig: (id: string, data: Record<string, unknown>) =>
    api.put(`/gigs/${id}`, data),
  deleteGig: (id: string) => api.delete(`/gigs/${id}`),
};

export const talentApi = {
  getTalent: (params?: Record<string, unknown>) =>
    api.get("/talent", { params }),
  getTalentProfile: (id: string) => api.get(`/talent/${id}`),
  getTalentGigs: (id: string) => api.get(`/talent/${id}/gigs`),
};

export const reviewApi = {
  getGigReviews: (gigId: string, params?: Record<string, unknown>) =>
    api.get(`/reviews/gig/${gigId}`, { params }),
  createReview: (
    gigId: string,
    data: { rating: number; title: string; comment: string }
  ) => api.post(`/reviews/gig/${gigId}`, data),
  updateReview: (id: string, data: Record<string, unknown>) =>
    api.put(`/reviews/${id}`, data),
  deleteReview: (id: string) => api.delete(`/reviews/${id}`),
  markHelpful: (id: string) => api.post(`/reviews/${id}/helpful`),
};

export const blogApi = {
  getPosts: (params?: Record<string, unknown>) =>
    api.get("/blog", { params }),
  getPostBySlug: (slug: string) => api.get(`/blog/${slug}`),
};

export const aiApi = {
  buildPitch: (data: Record<string, unknown>) =>
    api.post("/ai/pitch", data),
  analyzeCareer: (data: Record<string, unknown>) =>
    api.post("/ai/analyze", data),
  getRecommendations: (data: Record<string, unknown>) =>
    api.post("/ai/recommendations", data),
  chat: (data: {
    message: string;
    history: unknown[];
    conversationId?: string;
  }) => api.post("/ai/chat", data),
  getConversations: () => api.get("/ai/conversations"),
  getConversation: (id: string) => api.get(`/ai/conversations/${id}`),
  deleteConversation: (id: string) => api.delete(`/ai/conversations/${id}`),
  getUsageStats: () => api.get("/ai/usage"),
};

export const adminApi = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params?: Record<string, unknown>) =>
    api.get("/admin/users", { params }),
  toggleUserStatus: (id: string) =>
    api.patch(`/admin/users/${id}/toggle-status`),
  updateUserRole: (id: string, role: string) =>
    api.patch(`/admin/users/${id}/role`, { role }),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  getGigs: (params?: Record<string, unknown>) =>
    api.get("/admin/gigs", { params }),
  updateGigStatus: (id: string, status: string) =>
    api.patch(`/admin/gigs/${id}/status`, { status }),
  getDisputes: (params?: Record<string, unknown>) => 
    api.get("/admin/disputes", { params }),
  resolveDispute: (id: string, resolution: "resolved_client" | "resolved_freelancer") => 
    api.patch(`/admin/disputes/${id}/resolve`, { resolution }),
};