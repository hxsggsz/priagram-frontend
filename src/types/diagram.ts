import { PrismaNodeDiagram } from "@/components/nodes/PrismaNode";
import type { BuiltInNode, EdgeTypes, Node } from "@xyflow/react";

import type { NodeTypes } from "@xyflow/react";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;

export type PrismaNode = Node<Data>;

export type AppNode = BuiltInNode | PrismaNode;

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

export type Data = {
  modelName: string;
  modelContent: ModelContent[];
};

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

export const nodeTypes = {
  "prisma-table": PrismaNodeDiagram,
} satisfies NodeTypes;
export const edgeTypes = {} satisfies EdgeTypes;
