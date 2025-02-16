import { useDebounce } from '@react-hook/debounce';
import useResizeObserver from '@react-hook/resize-observer';
import { useLayoutEffect, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useResize(ref: RefObject<HTMLElement | null>) {
  const [size, setResize] = useDebounce<Size>({ width: 0, height: 0 }, 100);

  const getSize = (e: DOMRectReadOnly) => {
    const { width, height } = e;
    return {
      width,
      height,
    };
  };

  useLayoutEffect(() => {
    if (ref.current) {
      setResize(getSize(ref.current.getBoundingClientRect()));
    }
  }, [ref]);
  useResizeObserver(ref, (entry) => setResize(getSize(entry.contentRect)));

  return {
    size,
  };
}
