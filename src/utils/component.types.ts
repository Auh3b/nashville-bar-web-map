export interface SidePanelQueue {
  id?: any;
  [k: string]: any;
}

export interface BarInfoUIProps {
  preview?: SidePanelQueue;
  explore?: string;
  selectedBar: number | null;
  onExpand: (value: any) => void;
}

export interface NeighborhoodInfoProps {
  preview?: SidePanelQueue;
  started?: boolean;
  id?: any;
  name?: string;
  description?: string;
  explore?: string;
  onExplore?: (id: any) => void;
}

export type SidePanelProps = BarInfoUIProps & NeighborhoodInfoProps;
