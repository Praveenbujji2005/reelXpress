'use client';

import { useScrollPosition } from '@/hooks/useScrollPosition';

// Top GPU-accelerated progress bar tracking page scroll depth
export default function ScrollProgress() {
  const progress = useScrollPosition();

  return (
    <div
      id="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
