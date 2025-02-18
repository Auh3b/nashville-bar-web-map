import useMapStore from '../data/mapStore';

export default function useSidePanel() {
  const { setPreview } = useMapStore((state) => state);

  function ResetPreview() {
    setPreview('hood', undefined);
  }

  return {
    ResetPreview,
  };
}
