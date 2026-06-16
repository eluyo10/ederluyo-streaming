import { useEffect, useState } from 'react';

export function useRickAndMortyResource(fetcher, filters) {
  const [state, setState] = useState({
    data: [],
    pages: 1,
    count: 0,
    loading: true,
    error: '',
  });

  useEffect(() => {
    let mounted = true;

    setState((current) => ({ ...current, loading: true, error: '' }));

    fetcher(filters)
      .then((response) => {
        if (!mounted) return;

        setState({
          data: response.results || [],
          pages: response.info?.pages || 1,
          count: response.info?.count || 0,
          loading: false,
          error: '',
        });
      })
      .catch((error) => {
        if (!mounted) return;

        setState({
          data: [],
          pages: 1,
          count: 0,
          loading: false,
          error: error.message,
        });
      });

    return () => {
      mounted = false;
    };
  }, [fetcher, JSON.stringify(filters)]);

  return state;
}
