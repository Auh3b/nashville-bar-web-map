import { Fragment } from 'react';
import ZipcodeLayer from './ZipcodeLayer';
// import NeigborhoodPolygonLayer from './NeigborhoodPolygonLayer';
// import NeighborhoodPointLayer from './NeighborhoodPointLayer';
import { SelectedFeature } from '../../../utils/layer.types';

interface MapLayersContainerProps {
  visibleLayers: string[];
  onSelectedFeature: (value: string) => SelectedFeature;
}

export default function MapLayersContainer(props: MapLayersContainerProps) {
  const { visibleLayers, onSelectedFeature } = props;
  return (
    <Fragment>
      <ZipcodeLayer
        selectedFeature={onSelectedFeature('zipcode-layer')}
        visibleLayers={visibleLayers}
      />
      {/* <NeigborhoodPolygonLayer
        selectedFeature={onSelectedFeature('neighbourhood-layer')}
        visibleLayers={visibleLayers}
      />
      <NeighborhoodPointLayer
        selectedFeature={onSelectedFeature('neighbourhood-point-id')}
        visibleLayers={visibleLayers}
      /> */}
    </Fragment>
  );
}
