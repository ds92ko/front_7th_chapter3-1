import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/contexts/theme.provider';
import { ManagementPage } from '@/pages/ManagementPage';

export const App = () => {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen">
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
