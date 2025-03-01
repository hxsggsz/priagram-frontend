export interface Diagram {
  modelName: string;
  diagramType: string;
  modelContent: ModelContent[];
  relations: Relation[] | null;
}

export interface ModelContent {
  id: string;
  name: string;
  type: string;
}

export interface Relation {
  id: string;
  source: string;
  target: string;
}
