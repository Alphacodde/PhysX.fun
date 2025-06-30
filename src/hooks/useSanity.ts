import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';

export const useSanity = (query: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(query).then(setData);
  }, [query]);

  return data;
};
