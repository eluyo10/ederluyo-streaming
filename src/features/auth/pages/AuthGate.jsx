import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSplash } from '../components/LoadingSplash.jsx';
import { useAuth } from '../hooks/useAuth.js';

export function AuthGate() {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      await login({ username: form.get('username'), password: form.get('password') });
      navigate('/profiles');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const file = form.get('avatar');
    const avatar = file?.size ? await fileToBase64(file) : undefined;
    try {
      await register({
        dni: form.get('dni'),
        fullName: form.get('fullName'),
        email: form.get('email'),
        password: form.get('password'),
        avatar,
      });
      navigate('/profiles');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSplash />;

  return (
    <main className="auth-page">
      <div className="auth-hero">
        <div className="brand-badge">TS</div>
        <h1>Thiago Streaming</h1>
        <p>Perfiles, personajes, mapas y efectos inspirados en Netflix.</p>
      </div>

      <section className="auth-card glass-panel">
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login ADM</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Registro</button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={submitLogin} className="form-grid">
            <label>Usuario<input name="username" defaultValue="admin" required /></label>
            <label>Contraseña<input name="password" type="password" defaultValue="Thiago123" required /></label>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-btn">Ingresar</button>
            <small>ADM: admin / Thiago123</small>
          </form>
        ) : (
          <form onSubmit={submitRegister} className="form-grid">
            <label>Avatar<input name="avatar" type="file" accept="image/*" /></label>
            <label>DNI<input name="dni" minLength="8" maxLength="8" required /></label>
            <label>Nombres y apellidos<input name="fullName" required /></label>
            <label>Correo<input name="email" type="email" required /></label>
            <label>Generar contraseña<input name="password" type="password" minLength="6" required /></label>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-btn">Crear cuenta</button>
          </form>
        )}
      </section>
    </main>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
