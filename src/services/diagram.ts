import { api } from "@/lib/api";
import { Diagram } from "@/types/diagram";

export class DiagramService {
  static async getDiagram(editorValue: string): Promise<Diagram[]> {
    const { data } = await api.post<Diagram[]>("/api/prisma", {
      source: editorValue,
    });

    return data;
  }
}
