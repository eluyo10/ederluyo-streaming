import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export function ProfileSelectPage() {
  const { profiles, selectProfile, logout } = useAuth();
  const navigate = useNavigate();

  const choose = (profile) => {
    selectProfile(profile);
    navigate('/app');
  };

  return (
    <main className="profiles-page">
      <h1>¿Quién está viendo?</h1>

      <div className="profiles-grid">
        {profiles.map((profile) => (
          <button
            className="profile-card"
            key={`${profile.email}-${profile.type}`}
            onClick={() => choose(profile)}
          >
            <img src={profile.avatar} alt={profile.name} />
            <span>{profile.name}</span>
            <small>{profile.type}</small>
          </button>
        ))}
      </div>

      <button className="ghost-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </main>
  );
}