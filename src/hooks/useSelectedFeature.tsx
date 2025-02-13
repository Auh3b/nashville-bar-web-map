import { useCallback, useState } from 'react';
import { SelectedFeatures } from '../utils/layer.types';

export default function useSelectedFeature() {
  const [selectedFeatureId, setSelectedFeatureId] = useState<SelectedFeatures>(
    {},
  );
  const getSelectedFeature = useCallback(
    (id: string) => selectedFeatureId[id],
    [selectedFeatureId],
  );
  const handleSelectedFeature = (value: null | SelectedFeatures) => {
    setSelectedFeatureId((prev) => ({ ...prev, ...value }));
  };
  return {
    getSelectedFeature,
    handleSelectedFeature,
  };
}
