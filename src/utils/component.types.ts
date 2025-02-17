export interface SidePanelQueue {
  id?: any;
  [k: string]: any;
}

export interface BarInfoUIProps {
  preview: null | SidePanelQueue;
  explore?: string;
  selectedBar: number | null;
  onExpand: (value: any) => void;
}

export interface NeighborhoodInfoProps {
  preview: SidePanelQueue | null;
  started?: boolean;
  id?: any;
  name?: string;
  description?: string;
  onExplore?: (id: any) => void;
  explore?: string;
}

export type SidePanelProps = BarInfoUIProps & NeighborhoodInfoProps;
