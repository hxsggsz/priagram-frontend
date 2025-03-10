import { useDiagramStore } from "@/stores/useDiagramStore";
import { AppNode } from "@/types/diagram";
import {
  useNodesState,
  useEdgesState,
  Edge,
  addEdge,
  OnConnect,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";

export function useNodes() {
  const { diagram } = useDiagramStore();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!diagram || !diagram.data) return;

    const newNodes = diagram.data.map((diagramNode) => {
      const existingNode = nodes.find((node) => node.id === diagramNode.id);

      if (existingNode) {
        // keeps existing node object but uses the new data from diagram node
        return { ...existingNode, data: diagramNode.data };
      }

      return {
        ...diagramNode,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
      };
    });

    setNodes(newNodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram, diagram?.data]);

  useEffect(() => {
    if (!diagram || !diagram.relations) return;
    setEdges(diagram.relations);
  }, [diagram, diagram?.relations, setEdges]);

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
  };
}
