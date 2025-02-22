import { useDebounce } from '@react-hook/debounce';
import useResizeObserver from '@react-hook/resize-observer';
import { useLayoutEffect, useRef } from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useResize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setResize] = useDebounce<Size>({ width: 0, height: 0 }, 300);

  const getSize = (e: DOMRectReadOnly) => {
    const { width, height } = e;
    return {
      width,
      height,
    };
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setResize(getSize(ref?.current?.getBoundingClientRect()));
    }
  }, [ref]);
  useResizeObserver(ref.current, (entry) =>
    setResize(getSize(entry.contentRect)),
  );

  return { ref, size };
}
