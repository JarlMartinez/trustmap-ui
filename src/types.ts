export interface TrustMapNode {
  id: string;
  title: string;
  arc__failed: number;
  arc__passed: number;
  detail__role: "pod" | "service";
  detail__certcount?: number;
  detail__imagesig?: string;
  mainStat: string;
  subTitle: string;
}

export interface TrustMapEdge {}
