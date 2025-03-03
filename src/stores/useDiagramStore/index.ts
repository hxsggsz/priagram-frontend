import { DiagramService } from "@/services/diagram";
import { Diagram } from "@/types/diagram";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DiagramStoreTypes {
  diagram: Diagram | null;
  fetch: (editorValue: string) => Promise<void>;
}

export const useDiagramStore = create<DiagramStoreTypes>()(
  persist(
    (set) => ({
      diagram: null,

      fetch: async (editorValue: string): Promise<void> => {
        try {
          const diagram = await DiagramService.getDiagram(editorValue);
          set({ diagram });
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "@diagram-storage", // Nome único para identificar o storage no localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
    }
  )
);
