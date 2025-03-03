import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Panel as FlowPanel,
  Edge,
  addEdge,
  OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { edgeTypes } from "./edges";
import css from "./styles/app.module.css";
import { PrismaEditor } from "./components/editor";
import { useDiagramStore } from "./stores/useDiagramStore";
import { useCallback, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { AppNode, nodeTypes } from "./types/diagram";
import "@/styles/variables.css";
import { Button } from "./components/button";
import { useTheme } from "./hooks/useTheme";
import { Sun, Moon } from "@phosphor-icons/react";
import { DownloadButton } from "./components/download-button";

export default function App() {
  const { diagram } = useDiagramStore();

  const { theme, toggleTheme } = useTheme();

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
        return existingNode;
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
  }, [diagram, diagram?.data, nodes, setNodes]);

  useEffect(() => {
    if (!diagram || !diagram.relations) return;
    setEdges(diagram.relations);
  }, [diagram, diagram?.relations, setEdges]);

  return (
    <PanelGroup className={css.wrapper} direction="horizontal">
      <Panel collapsible minSize={25} order={1}>
        <PrismaEditor />
      </Panel>
      <PanelResizeHandle style={{ width: "1px", background: "#1e1e1e" }} />

      <Panel collapsible minSize={25} order={2}>
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
          <FlowPanel className={css.menuWrapper} position="top-right">
            <DownloadButton />

            <Button onClick={() => toggleTheme()}>
              {theme === "light" ? (
                <Sun size={20} weight="fill" />
              ) : (
                <Moon size={20} weight="fill" />
              )}
            </Button>
          </FlowPanel>
          <Background />
        </ReactFlow>
      </Panel>
    </PanelGroup>
  );
}
