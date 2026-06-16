import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Film,
  Globe2,
  Home,
  Info,
  ListTodo,
  Map,
  Menu,
  Pickaxe,
  Search,
  Tv,
  UserRound,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth.js';

const navItems = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/about', label: 'About Me', icon: Info },
  { to: '/app/todos', label: 'Todos', icon: ListTodo },
  { to: '/app/zustand', label: 'Zustand Example', icon: Pickaxe },
  { to: '/app/rick-and-morty', label: 'Personajes', icon: Tv, end: true },
  { to: '/app/rick-and-morty/episodes', label: 'Episodios', icon: Video },
  { to: '/app/rick-and-morty/locations', label: 'Ubicaciones', icon: Globe2 },
  { to: '/app/peruvian-map', label: 'Peruvian map', icon: Map },
];

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { profile, clearProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleChangeProfile = () => {
    clearProfile();
    navigate('/profiles');
  };

  return (
    <div className="dashboard">
      <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
        <button
          className="menu-btn"
          type="button"
          onClick={() => setCollapsed((value) => !value)}
        >
          <Menu size={20} />
        </button>

        <div className="user-panel">
          <img src={profile.avatar} alt={profile.name} />

          {!collapsed && (
            <div>
              <strong>{profile.name}</strong>
              <small>{profile.type}</small>
            </div>
          )}
        </div>

        <nav>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-actions">
          <button type="button" onClick={handleChangeProfile}>
            <UserRound size={16} />
            <span>Cambiar perfil</span>
          </button>

          <button type="button" onClick={logout}>
            <Film size={16} />
            <span>Salir</span>
          </button>
        </div>
      </aside>

      <section className="content-shell">
        <header className="topbar">
          <div>
            <h2>Thiago Streaming</h2>
            <p>Dashboard estilo Netflix</p>
          </div>

          <div className="fake-search">
            <Search size={16} />
            Buscar dentro del sistema
          </div>
        </header>

        <Outlet />
      </section>
    </div>
  );
}