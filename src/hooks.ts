import { Edge, Node } from "reactflow";
import { initialEdges, initialNodes } from "./data";
import { TrustMapNode } from "./types";

interface Returns {
  nodes: Node<TrustMapNode>[];
  edges: Edge[];
}

export const useTrustMapNodes = (): Returns => {
  const nodes: Node<TrustMapNode>[] = initialNodes.map((n, i) => ({
    id: n.id,
    type: "customNode",
    data: {
      ...n,
      label: n.title,
    },
    position: {
      x: i * 100,
      y: i * 100,
    },
  }));

  const edges: Edge[] = initialEdges.map((e, i) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    type: "smoothstep",
  }));

  return { nodes, edges };
};
