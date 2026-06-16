export function LoadingSplash({ text = 'Thiago Streaming' }) {
  return (
    <section className="loading-screen">
      <div className="netflix-loader">
        <span />
        <span />
        <span />
      </div>
      <h1>{text}</h1>
      <p>Preparando tu experiencia streaming...</p>
    </section>
  );
}
