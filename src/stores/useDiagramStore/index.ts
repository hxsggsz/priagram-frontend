import { DiagramService } from "@/services/diagram";
import { Diagram } from "@/types/diagram";
import { create } from "zustand";

interface AuthStoreTypes {
  diagram: Diagram | null;
  fetch: (editorValue: string) => Promise<void>;
}

export const useDiagramStore = create<AuthStoreTypes>()((set) => ({
  diagram: null,

  fetch: async (editorValue: string): Promise<void> => {
    const diagram = await DiagramService.getDiagram(editorValue);
    console.log(`[${new Date().toISOString()}]: index.ts`, diagram);
    set({ diagram });
  },
}));
