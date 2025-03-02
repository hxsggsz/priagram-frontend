import {
  ReactFlow,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Edge,
  addEdge,
  Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import css from "./styles/app.module.css";
import { PrismaEditor } from "./components/editor";
import { useDiagramStore } from "./stores/useDiagramStore";
import { useCallback, useEffect } from "react";
import { AppNode } from "./nodes/types";

export default function App() {
  const { diagram } = useDiagramStore();
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffect(() => {
    if (!diagram || !diagram.data) return;
    setNodes(diagram.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram?.data]);

  useEffect(() => {
    if (!diagram || !diagram.relations) return;
    setEdges(diagram.relations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram?.relations]);

  return (
    <div className={css.wrapper}>
      <PrismaEditor />

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
