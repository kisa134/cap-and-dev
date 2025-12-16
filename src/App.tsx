import React from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { LiquidCursor } from './components/effects/LiquidCursor';
import { HUDElements } from './components/effects/HUDElements';

export const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSmoothScroll();

  return (
    <>
      <LiquidCursor />
      <HUDElements />
      {children}
    </>
  );
};
