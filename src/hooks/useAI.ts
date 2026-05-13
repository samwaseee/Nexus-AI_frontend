import { useMutation, useQuery } from "@tanstack/react-query";
import { aiApi } from "@/lib/api";

export function usePitchBuilder() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => aiApi.buildPitch(data),
  });
}

export function useCareerAnalyzer() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => aiApi.analyzeCareer(data),
  });
}

export function useRecommendations() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      aiApi.getRecommendations(data),
  });
}

export function useChat() {
  return useMutation({
    mutationFn: (data: {
      message: string;
      history: unknown[];
      conversationId?: string;
    }) => aiApi.chat(data),
  });
}

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await aiApi.getConversations();
      return res.data;
    },
  });
}

export function useAIUsageStats() {
  return useQuery({
    queryKey: ["ai-usage"],
    queryFn: async () => {
      const res = await aiApi.getUsageStats();
      return res.data;
    },
  });
}