import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gigApi } from "@/lib/api";
import { GigFilters } from "@/types";

export const GIG_KEYS = {
  all: ["gigs"] as const,
  lists: () => [...GIG_KEYS.all, "list"] as const,
  list: (filters: GigFilters) => [...GIG_KEYS.lists(), filters] as const,
  details: () => [...GIG_KEYS.all, "detail"] as const,
  detail: (id: string) => [...GIG_KEYS.details(), id] as const,
  myGigs: () => [...GIG_KEYS.all, "my-gigs"] as const,
};

export function useGigs(filters: GigFilters = {}) {
  return useQuery({
    queryKey: GIG_KEYS.list(filters),
    queryFn: async () => {
      const res = await gigApi.getGigs(filters as Record<string, unknown>);
      return res.data;
    },
  });
}

export function useGig(id: string) {
  return useQuery({
    queryKey: GIG_KEYS.detail(id),
    queryFn: async () => {
      const res = await gigApi.getGigById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useMyGigs() {
  return useQuery({
    queryKey: GIG_KEYS.myGigs(),
    queryFn: async () => {
      const res = await gigApi.getMyGigs();
      return res.data;
    },
  });
}

export function useCreateGig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => gigApi.createGig(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: GIG_KEYS.all }),
  });
}

export function useDeleteGig() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => gigApi.deleteGig(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: GIG_KEYS.all }),
  });
}