import { useCallback, useState } from 'react';

interface SelectedFeature {
  [k: string]: {
    property: string;
    value: unknown;
  };
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
  console.log(selectedFeatureId);
  return {
    getSelectedFeature,
    handleSelectedFeature,
  };
}
