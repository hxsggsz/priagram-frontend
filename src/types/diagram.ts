import type { Node } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type PrismaNode = Node<
  Record<keyof Data, Data[keyof Data]>,
  "prisma-table"
>;

export interface Diagram {
  data: PrismaNode[];
  relations?: Relation[];
}

export interface Diagrams {
  id: string;
  type: string;
  position: Position;
  data: Data;
}

export interface Position {
  x: number;
  y: number;
}

export interface Data {
  modelName: string;
  modelContent: ModelContent[];
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
