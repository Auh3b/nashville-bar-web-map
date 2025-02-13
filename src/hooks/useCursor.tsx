import { useState } from 'react';

export default function useCursor() {
  const [cursor, setCursor] = useState<string>('');
  const handleMouseEnter = () => {
    setCursor('pointer');
  };

  const handleMouseLeave = () => {
    setCursor('');
  };

  return {
    cursor,
    handleMouseEnter,
    handleMouseLeave,
  };
}
