export interface SidePanelQueue {
  id?: any;
  [k: string]: any;
}

export interface BarInfoUIProps {
  explore?: string;
  selectedBar: number | null;
  onExpand: (value: any) => void;
}

export interface NeighborhoodInfoProps {
  started?: boolean;
  id?: any;
  name?: string;
  description?: string;
  onExplore?: (id: any) => void;
  explore?: string;
}

export type SidePanelProps = BarInfoUIProps & NeighborhoodInfoProps;
