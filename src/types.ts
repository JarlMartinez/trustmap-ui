export interface TrustMapNode {
  id: string;
  title: string;
  arc__failed: number;
  arc__passed: number;
  detail__role: "pod" | "service";
  mainStat: string;
  subTitle: string;
}

export interface TrustMapEdge {}
