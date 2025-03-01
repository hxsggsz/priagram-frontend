import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import css from "./styles/app.module.css";
import { PrismaEditor } from "./components/editor";

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div className={css.wrapper}>
      <PrismaEditor />

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
