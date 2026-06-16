export function HomePage() {
  return (
    <main className="page fade-in">
      <section className="hero-banner">
        <div>
          <span className="eyebrow">Nuevo sistema</span>
          <h1>Explora tu panel streaming</h1>
          <p>Login, perfiles, API externa, estados globales, tareas y mapa del Perú en una sola aplicación React.</p>
        </div>
      </section>
      <div className="movie-row">
        {['Rick and Morty API', 'Todos', 'Zustand', 'Mapa Perú'].map((title, index) => (
          <article className="movie-tile" key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </main>
  );
}
