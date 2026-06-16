import { useState } from 'react';
import { CharacterCard } from '../components/CharacterCard.jsx';
import { CharacterModal } from '../components/CharacterModal.jsx';
import { ResourceToolbar } from '../components/ResourceToolbar.jsx';
import { useCharacters } from '../hooks/useCharacters.js';

export function RickAndMortyPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { data, pages, count, loading, error } = useCharacters({ page, name, status });

  return (
    <main className="page fade-in">
      <ResourceToolbar
        search={name}
        setSearch={setName}
        page={page}
        pages={pages}
        setPage={setPage}
        placeholder="Buscar personaje"
      >
        <select
          value={status}
          onChange={(event) => {
            setPage(1);
            setStatus(event.target.value);
          }}
        >
          <option value="">Todos</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </ResourceToolbar>

      <p className="resource-count">Personajes encontrados: {count}</p>

      {loading && <div className="grid-loader">Cargando personajes...</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && (
        <section className="characters-grid">
          {data.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={setSelectedCharacter}
            />
          ))}
        </section>
      )}

      <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
    </main>
  );
}
