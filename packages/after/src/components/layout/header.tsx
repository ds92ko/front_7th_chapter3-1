'use client';

import { Button } from '@/components/forms/button';
import { useTheme } from '@/contexts/theme.context';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-border bg-card sticky top-0 z-[1000] border-b shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-xl text-3xl font-bold">
            L
          </div>
          <div>
            <h1 className="heading-2 text-card-foreground">Hanghae Company</h1>
            <p className="caption text-muted-foreground mt-0.5">Design System Migration Project</p>
          </div>
        </div>

        {/* User Info & Theme Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="label-large text-card-foreground">Demo User</div>
              <div className="body-small text-muted-foreground">demo@example.com</div>
            </div>
            <div className="heading-3 bg-accent text-accent-foreground flex h-10 w-10 items-center justify-center rounded-full">
              DU
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
