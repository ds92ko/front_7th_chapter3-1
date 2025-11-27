import { useCallback, useEffect, useState } from 'react';

type Service<T> = {
  getAll: () => Promise<T[]>;
};

export function useEntityData<T>(service: Service<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await service.getAll();
      setData(result);
    } catch {
      setError('데이터를 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, isLoading, error, loadData };
}

