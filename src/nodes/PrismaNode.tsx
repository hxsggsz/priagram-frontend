import { PrismaNode } from "@/types/diagram";
import {
  Handle,
  Position,
  type NodeProps,
  useNodeConnections,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useEffect } from "react";

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

  return (
    <div className="react-flow__node-default">
      {data.modelName && <div>{data.modelName}</div>}

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
