import { useCallback, useState } from 'react';

interface SelectedFeature {
  [k: string]: number | null;
}

export default function useSelectedFeature() {
  const [selectedFeatureId, setSelectedFeatureId] = useState<SelectedFeature>(
    {},
  );
  const getSelectedFeature = useCallback(
    (id: string) => selectedFeatureId[id],
    [selectedFeatureId],
  );
  const handleSelectedFeature = (value: null | SelectedFeature) => {
    setSelectedFeatureId((prev) => ({ ...prev, ...value }));
  };
  return {
    getSelectedFeature,
    handleSelectedFeature,
  };
}
