import { create } from "zustand";
import { ChatMessage, GeminiMessage } from "@/types";

interface ChatState {
  messages: ChatMessage[];
  geminiHistory: GeminiMessage[];
  conversationId: string | null;
  isLoading: boolean;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  setConversationId: (id: string) => void;
  clearChat: () => void;
  buildGeminiHistory: () => GeminiMessage[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  geminiHistory: [],
  conversationId: null,
  isLoading: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      geminiHistory: [
        ...state.geminiHistory,
        {
          role: message.role === "user" ? "user" : "model",
          parts: [{ text: message.content }],
        },
      ],
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setConversationId: (conversationId) => set({ conversationId }),

  clearChat: () =>
    set({ messages: [], geminiHistory: [], conversationId: null }),

  buildGeminiHistory: () => get().geminiHistory,
}));