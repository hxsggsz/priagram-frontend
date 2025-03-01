import { DiagramService } from "@/services/diagram";
import { Diagram } from "@/types/diagram";
import { create } from "zustand";

interface AuthStoreTypes {
  diagram: Diagram[];
  fetch: (editorValue: string) => Promise<void>;
}

export const useAuthStore = create<AuthStoreTypes>()((set) => ({
  diagram: [],

  fetch: async (editorValue: string): Promise<void> => {
    const diagram = await DiagramService.getDiagram(editorValue);
    set({ diagram });
  },
}));
