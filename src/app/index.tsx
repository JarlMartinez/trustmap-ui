import { TrustMap } from "./TrustMap";
import logo from "../logo-venafi.svg";
import { useState } from "react";
import { TrustMapNode } from "../types";
import { TrustMapDrawer } from "./TrustMapDrawer";

export const App = () => {
  const [activeNode, setActiveNode] = useState<TrustMapNode | undefined>();

  return (
    <section style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          boxShadow: "0px -20px 20px 10px black",
          padding: "24px 32px 18px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: "0", fontSize: "25px" }}>Trust-Map Mesh</p>
        <img src={logo} alt="Venafi logo" />
      </div>
      <div style={{ width: "100vw", height: "calc(100vh - 75px)" }}>
        <TrustMap setActiveNode={setActiveNode} />
      </div>
      <TrustMapDrawer setActiveNode={setActiveNode} activeNode={activeNode} />
    </section>
  );
};
