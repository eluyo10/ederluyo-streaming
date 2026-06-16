import { useCounterStore } from '../../../store/useCounterStore.js';

export function ZustandPage() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <main className="page fade-in glass-panel page-panel">
      <h1>Zustand Example</h1>
      <p>Estado global simple compartido con Zustand.</p>
      <div className="counter">{count}</div>
      <div className="actions"><button onClick={decrement}>-1</button><button onClick={increment}>+1</button><button onClick={reset}>Reset</button></div>
    </main>
  );
}
