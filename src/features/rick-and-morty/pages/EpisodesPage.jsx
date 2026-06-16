import { CalendarDays, Clapperboard, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { ResourceToolbar } from '../components/ResourceToolbar.jsx';
import { useRickAndMortyResource } from '../hooks/useRickAndMortyResource.js';
import { rickAndMortyService } from '../services/rick-and-morty-service.js';

export function EpisodesPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [episode, setEpisode] = useState('');

  const { data, pages, count, loading, error } = useRickAndMortyResource(
    rickAndMortyService.getEpisodes,
    { page, name, episode }
  );

  return (
    <main className="page fade-in">
      <ResourceToolbar
        search={name}
        setSearch={setName}
        page={page}
        pages={pages}
        setPage={setPage}
        placeholder="Buscar episodio"
      >
        <input
          className="small-filter"
          value={episode}
          onChange={(event) => {
            setPage(1);
            setEpisode(event.target.value);
          }}
          placeholder="Código: S01E01"
        />
      </ResourceToolbar>

      <p className="resource-count">Episodios encontrados: {count}</p>

      {loading && <div className="grid-loader">Cargando episodios...</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && (
        <section className="resource-grid">
          {data.map((item) => (
            <article className="resource-card" key={item.id}>
              <span className="resource-icon"><Clapperboard size={34} /></span>
              <h3>{item.name}</h3>
              <p><Clapperboard size={16} /> Código: <b>{item.episode}</b></p>
              <p><CalendarDays size={16} /> Estreno: <b>{item.air_date}</b></p>
              <p><UsersRound size={16} /> Personajes: <b>{item.characters.length}</b></p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
