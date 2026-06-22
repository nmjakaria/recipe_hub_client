"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,        // Scroll intensity (lower = smoother/more momentum)
        duration: 1.2,    // Scroll speed duration in seconds
        syncTouch: true   // Mimics smooth scrolling mechanics on touch/mobile devices
      }}
    >
      {children}
    </ReactLenis>
  );
}