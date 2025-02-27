import useMapStore from '../data/mapStore';

export default function useSidePanel() {
  const { setHood } = useMapStore((state) => state);

  function ResetPreview() {
    setHood(undefined);
  }

  return {
    ResetPreview,
  };
}
