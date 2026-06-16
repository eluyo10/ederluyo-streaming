import { X } from 'lucide-react';

export function CharacterModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="character-modal glass-panel" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <img src={character.image} alt={character.name} />

        <div>
          <p className="eyebrow">Detalle del personaje</p>
          <h2>{character.name}</h2>
          <p>
            La API oficial trae imagen y datos del personaje. No entrega videos, por eso aquí se
            muestra un modal estilo streaming con la ficha completa.
          </p>

          <div className="detail-grid">
            <span>Status: <b>{character.status}</b></span>
            <span>Species: <b>{character.species}</b></span>
            <span>Type: <b>{character.type || 'N/A'}</b></span>
            <span>Gender: <b>{character.gender}</b></span>
            <span>Origin: <b>{character.origin?.name}</b></span>
            <span>Location: <b>{character.location?.name}</b></span>
            <span>Episodes: <b>{character.episode?.length || 0}</b></span>
            <span>Created: <b>{new Date(character.created).toLocaleDateString()}</b></span>
          </div>
        </div>
      </article>
    </div>
  );
}
