import { Button } from '@/components/forms/button';
import type { TabProps, TabsContextValue, TabsProps } from '@/components/navigation/tabs.types';
import { cn } from '@/lib/utils';
import { createContext, useContext } from 'react';

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tab must be used within Tabs');
  }

  return context;
}

function Tab({ value, children }: TabProps) {
  const { value: selectedValue, onChange } = useTabsContext();
  const isActive = selectedValue === value;

  return (
    <Button variant={isActive ? 'default' : 'outline'} size="lg" onClick={() => onChange(value)}>
      {children}
    </Button>
  );
}

function Tabs({ value, onChange, children, className }: TabsProps) {
  const contextValue: TabsContextValue = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className="border-border mb-3 border-b pb-3">
        <div className={cn('inline-flex items-center justify-start gap-2', className)}>
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
}

export { Tab, Tabs };
