import { Header } from '@/components/layout';
import { ManagementPage } from '@/pages/ManagementPage';
import React from 'react';

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Header />
      <main>
        <ManagementPage />
      </main>
    </div>
  );
};
