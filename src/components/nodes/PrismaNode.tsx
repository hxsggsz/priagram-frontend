import { PrismaNode } from "@/types/diagram";
import {
  Handle,
  Position,
  type NodeProps,
  useNodeConnections,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useEffect } from "react";
import css from "./PrismaNode.module.css";

export function PrismaNodeDiagram({
  id,
  data,
  isConnectable,
}: NodeProps<PrismaNode>) {
  const updateNodeInternals = useUpdateNodeInternals();

  const targetConnections = useNodeConnections({
    handleType: "target",
    handleId: `${id}-target`,
  });

  const sourceConnections = useNodeConnections({
    handleType: "source",
    handleId: `${id}-source`,
  });

  useEffect(() => {
    updateNodeInternals(id);
  }, [
    targetConnections.length,
    sourceConnections.length,
    updateNodeInternals,
    id,
  ]);

  const showTargetHandle = targetConnections.length > 0;
  const showSourceHandle = sourceConnections.length > 0;

  const renderNodeColumns = () =>
    data?.modelContent?.map((mc) => (
      <li key={mc.id} className={css.listItem}>
        <p>{mc.name}</p>
        <p>{mc.type}</p>
      </li>
    ));

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        {data.modelName && <h1>{data.modelName}</h1>}
      </header>

      <ul className={css.listWrapper}>{data && renderNodeColumns()}</ul>

      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          id={`${id}-target`}
          isConnectable={isConnectable}
        />
      )}

      {showSourceHandle && (
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-source`}
          isConnectable={isConnectable}
          content=">"
        />
      )}
    </div>
  );
}
