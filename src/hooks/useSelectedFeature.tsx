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
  const removeSelectedFeature = useCallback(
    (id: string) => {
      const features = { ...selectedFeatureId };
      if (features[id]) delete features[id];
      setSelectedFeatureId(features);
    },
    [selectedFeatureId],
  );
  return {
    getSelectedFeature,
    handleSelectedFeature,
    removeSelectedFeature,
  };
}
