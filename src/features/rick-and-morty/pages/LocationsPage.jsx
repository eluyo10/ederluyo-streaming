import { Globe2, MapPin, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { ResourceToolbar } from '../components/ResourceToolbar.jsx';
import { useRickAndMortyResource } from '../hooks/useRickAndMortyResource.js';
import { rickAndMortyService } from '../services/rick-and-morty-service.js';

export function LocationsPage() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [dimension, setDimension] = useState('');

  const { data, pages, count, loading, error } = useRickAndMortyResource(
    rickAndMortyService.getLocations,
    { page, name, dimension }
  );

  return (
    <main className="page fade-in">
      <ResourceToolbar
        search={name}
        setSearch={setName}
        page={page}
        pages={pages}
        setPage={setPage}
        placeholder="Buscar ubicación"
      >
        <input
          className="small-filter"
          value={dimension}
          onChange={(event) => {
            setPage(1);
            setDimension(event.target.value);
          }}
          placeholder="Dimensión"
        />
      </ResourceToolbar>

      <p className="resource-count">Ubicaciones encontradas: {count}</p>

      {loading && <div className="grid-loader">Cargando ubicaciones...</div>}
      {error && <div className="form-error">{error}</div>}

      {!loading && !error && (
        <section className="resource-grid">
          {data.map((item) => (
            <article className="resource-card location-card" key={item.id}>
              <span className="resource-icon"><MapPin size={34} /></span>
              <h3>{item.name}</h3>
              <p><MapPin size={16} /> Tipo: <b>{item.type}</b></p>
              <p><Globe2 size={16} /> Dimensión: <b>{item.dimension}</b></p>
              <p><UsersRound size={16} /> Residentes: <b>{item.residents.length}</b></p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
