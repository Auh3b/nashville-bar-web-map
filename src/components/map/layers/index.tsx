import { Fragment } from 'react';
import NeigborhoodPolygonLayer from './NeigborhoodPolygonLayer';
import { SelectedFeature } from '../../../utils/layer.types';
import BarsLayer from './BarsLayer';

interface MapLayersContainerProps {
  explore?: string;
  visibleLayers: string[];
  onSelectedFeature: (value: string) => SelectedFeature;
}

export default function MapLayersContainer(props: MapLayersContainerProps) {
  const { visibleLayers, onSelectedFeature, explore } = props;
  return (
    <Fragment>
      <NeigborhoodPolygonLayer
        selectedFeature={onSelectedFeature('neighbourhood-layer')}
        visibleLayers={visibleLayers}
      />
      <BarsLayer
        explore={explore}
        selectedFeature={onSelectedFeature('bars-layer')}
        visibleLayers={visibleLayers}
      />
    </Fragment>
  );
}
