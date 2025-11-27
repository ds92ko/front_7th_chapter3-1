import { useState } from 'react';

export type ToastItem = {
  id: number;
  message: string;
  variant: 'success' | 'error';
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showSuccess = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant: 'success' }]);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const showError = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, variant: 'error' }]);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    showSuccess,
    showError,
    removeToast,
  };
}

