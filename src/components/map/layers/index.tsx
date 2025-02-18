import { Fragment } from 'react';
import NeigborhoodPolygonLayer from './NeigborhoodPolygonLayer';
import BarsLayer from './BarsLayer';

export default function MapLayersContainer() {
  return (
    <Fragment>
      <NeigborhoodPolygonLayer />
      <BarsLayer />
    </Fragment>
  );
}
