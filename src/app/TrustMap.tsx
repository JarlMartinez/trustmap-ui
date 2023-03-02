import { Dispatch, Fragment, SetStateAction } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
} from "reactflow";

import { useTrustMapNodes } from "./hooks";
import { TrustMapNode } from "../types";

import "reactflow/dist/style.css";

interface Props {
  setActiveNode: Dispatch<SetStateAction<TrustMapNode | undefined>>;
}

export const TrustMap = (props: Props): JSX.Element => {
  const { setActiveNode } = props;

  const {
    nodes: initialNodes,
    setNodes: setInitialNodes,
    edges: initialEdges,
  } = useTrustMapNodes();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Fragment>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node: Node<TrustMapNode>) => setActiveNode(node.data)}
        onNodesChange={(data) => {
          setInitialNodes((prev) => {
            const news: Node<TrustMapNode>[] = [];
            let added = false;
            for (let i = 0; i < prev.length; i++) {
              added = false;
              for (let ii = 0; ii < data.length; ii++) {
                // @ts-ignore
                if (data[ii].dragging && data[ii].id === prev[i].data.id) {
                  added = true;
                  news.push({
                    ...prev[i],
                    position: {
                      // @ts-ignore
                      ...data[ii].position,
                    },
                  });
                  break;
                }
              }
              if (!added) {
                news.push({ ...prev[i] });
              }
            }
            return news;
          });
          onNodesChange(data);
        }}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Fragment>
  );
};
