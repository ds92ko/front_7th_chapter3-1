import type { TabProps, TabsContextValue, TabsProps } from '@/components/navigation/tabs.types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { createContext, useContext } from 'react';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab must be used within Tabs');
  }

  return context;
}

const tabVariants = cva(
  'label-large relative px-4 py-2 transition-colors border-b-2 focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none',
  {
    variants: {
      active: {
        true: 'text-primary border-primary',
        false:
          'text-muted-foreground hover:text-foreground hover:border-muted-foreground border-transparent',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

function Tab({ value, children }: TabProps) {
  const { value: selectedValue, onChange } = useTabsContext();
  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onChange(value)}
      className={cn(tabVariants({ active: isActive }))}
    >
      {children}
    </button>
  );
}

function Tabs({ value, onChange, children, className }: TabsProps) {
  const contextValue: TabsContextValue = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="border-border mb-3 border-b">
        <div className={cn('inline-flex items-center justify-start', className)}>{children}</div>
      </div>
    </TabsContext.Provider>
  );
}

export { Tab, Tabs };
