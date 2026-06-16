import { Heart, PlayCircle, ShieldQuestion } from 'lucide-react';

export function CharacterCard({ character, onClick }) {
  const isAlive = character.status === 'Alive';

  return (
    <article className="character-card" onClick={() => onClick?.(character)}>
      <div className="poster-wrapper">
        <img src={character.image} alt={character.name} />
        <span className="play-overlay">
          <PlayCircle size={42} />
        </span>
      </div>

      <h3>{character.name}</h3>

      <div className="character-meta">
        <span>
          Gender: <b>{character.gender}</b>
        </span>
        <span>
          Status: {isAlive ? <Heart className="alive" size={16} /> : <ShieldQuestion size={16} />}
        </span>
        <span>
          Species: <b>{character.species}</b>
        </span>
        <span>
          Origin: <b>{character.origin?.name}</b>
        </span>
        <span>
          Location: <b>{character.location?.name}</b>
        </span>
      </div>
    </article>
  );
}
