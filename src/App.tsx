import { ReactFlow, Background, Panel as FlowPanel } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { edgeTypes } from "./edges";
import css from "./styles/app.module.css";
import { PrismaEditor } from "./components/editor";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { nodeTypes } from "./types/diagram";
import "@/styles/variables.css";
import { Button } from "./components/button";
import { useTheme } from "./hooks/useTheme";
import { Sun, Moon } from "@phosphor-icons/react";
import { DownloadButton } from "./components/download-button";
import { useNodes } from "./hooks/useNodes";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const { nodes, onNodesChange, edges, onEdgesChange, onConnect } = useNodes();

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
