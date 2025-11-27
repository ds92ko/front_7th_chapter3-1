import type { ReactNode } from 'react';

export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export interface TabProps {
  value: string;
  children: ReactNode;
}
