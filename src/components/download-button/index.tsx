import { useReactFlow, getNodesBounds } from "@xyflow/react";
import { toPng } from "html-to-image";
import { Button } from "@/components/button";
import { downloadImage } from "@/utils/download-diagram";

export function DownloadButton() {
  const { getNodes } = useReactFlow();

  const download = () => {
    const nodes = getNodes();

    if (nodes.length === 0) {
      console.warn("No nodes found.");
      return;
    }

    const nodesBounds = getNodesBounds(nodes);
    const padding = 20;

    const width = nodesBounds.width + padding * 2;
    const height = nodesBounds.height + padding * 2;

    const reactFlowElement = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;

    if (!reactFlowElement) {
      console.error("React Flow viewport element not found.");
      return;
    }

    const originalWidth = reactFlowElement.style.width;
    const originalHeight = reactFlowElement.style.height;
    const originalTransform = reactFlowElement.style.transform;

    reactFlowElement.style.width = `${width}px`;
    reactFlowElement.style.height = `${height}px`;
    reactFlowElement.style.transform = `translate(${
      -nodesBounds.x + padding
    }px, ${-nodesBounds.y + padding}px) scale(1)`;

    const reactFlowParentElement =
      reactFlowElement.parentElement as HTMLElement;
    const originalParentWidth = reactFlowParentElement.style.width;
    const originalParentHeight = reactFlowParentElement.style.height;
    reactFlowParentElement.style.width = `${width}px`;
    reactFlowParentElement.style.height = `${height}px`;

    void toPng(reactFlowElement, {
      backgroundColor: "transparent",
      width,
      height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
      },
    })
      .then((dataUrl) => {
        reactFlowElement.style.width = originalWidth;
        reactFlowElement.style.height = originalHeight;
        reactFlowElement.style.transform = originalTransform;

        reactFlowParentElement.style.width = originalParentWidth;
        reactFlowParentElement.style.height = originalParentHeight;

        downloadImage(dataUrl);
      })
      .catch((err) => {
        console.error("Error capturing image:", err);
        reactFlowElement.style.width = originalWidth;
        reactFlowElement.style.height = originalHeight;
        reactFlowElement.style.transform = originalTransform;

        reactFlowParentElement.style.width = originalParentWidth;
        reactFlowParentElement.style.height = originalParentHeight;
      });
  };

  return <Button onClick={download}>Download Image</Button>;
}
