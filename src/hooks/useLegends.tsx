import { useState } from 'react';

const legendItems = [
  'neighbourhood-layer',
  'neighbourhood-point-id',
  'zipcode-layer',
  'bars-layer',
];
export default function useLegends() {
  const [legends, setLegends] = useState(legendItems);
  const handleLegendToggle = (value: any) => {
    setLegends((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    );
  };

  return {
    legends,
    handleLegendToggle,
  };
}
