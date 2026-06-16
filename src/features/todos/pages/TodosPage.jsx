import { useMemo, useState } from 'react';

export function TodosPage() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const done = useMemo(() => items.length, [items]);

  const add = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setItems((current) => [text.trim(), ...current]);
    setText('');
  };

  return (
    <main className="page fade-in glass-panel page-panel">
      <h1>Todos</h1>
      <form className="todo-form" onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nueva tarea" />
        <button>Agregar</button>
      </form>
      <p>{done} tareas registradas</p>
      <div className="todo-list">
        {items.map((item) => <label key={item}><input type="checkbox" />{item}</label>)}
      </div>
    </main>
  );
}
