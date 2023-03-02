import { useState, Dispatch, useEffect } from "react";
import { Edge, Node } from "reactflow";
import { initialEdges, initialNodes } from "../data/nodes_edges";
import { TrustMapNode } from "../types";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { fixed_positions } from "../data/positions";

interface Returns {
  nodes: Node<TrustMapNode>[];
  setNodes: Dispatch<React.SetStateAction<Node<TrustMapNode>[]>>;
  edges: Edge[];
  setEdges: Dispatch<React.SetStateAction<Edge[]>>;
}

export const useTrustMapNodes = (): Returns => {
  const originals = [
    ...initialNodes.map((n, i) => ({
      id: n.id,
      // type: "trustMapNode",
      data: {
        ...n,
        label: (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {n.title}
            {(function () {
              if (
                !n.detail__imagesig ||
                n.detail__imagesig.toLowerCase() === "none" ||
                n.detail__imagesig.includes("unknown")
              ) {
                return (
                  <ErrorIcon
                    color="error"
                    sx={{ margin: "10px 10px 10px 20px" }}
                  />
                );
              } else if (n.arc__failed > 0.3) {
                return (
                  <WarningIcon
                    color="warning"
                    sx={{ margin: "10px 10px 10px 20px" }}
                  />
                );
              } else {
                return (
                  <CheckCircleIcon
                    color="success"
                    sx={{ margin: "10px 10px 10px 20px" }}
                  />
                );
              }
            })()}
          </Box>
        ),
      },
      position: {
        ...fixed_positions[i],
        // x: i % 2 === 1 ? i * 100 : i * 50,
        // y: i % 2 === 0 ? i * 100 : i * 50,
      },
    })),
  ];

  const originals2 = [
    ...initialEdges.map((e, i) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      hidden: false,
      animated: true,
      type: "smoothstep",
    })),
  ];

  const [nodes, setNodes] = useState<Node<TrustMapNode>[]>(originals);

  const [edges, setEdges] = useState<Edge[]>(originals2);

  useEffect(() => {
    console.log(nodes.map((n) => ({ x: n.position.x, y: n.position.y })));
  }, [nodes]);

  return { nodes: originals, setNodes, edges: originals2, setEdges };
};
