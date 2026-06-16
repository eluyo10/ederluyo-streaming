const regions = ['Tumbes', 'Piura', 'Lambayeque', 'La Libertad', 'Lima', 'Ica', 'Arequipa', 'Cusco', 'Puno', 'Loreto', 'Ucayali'];

export function PeruvianMapPage() {
  return (
    <main className="page fade-in glass-panel page-panel">
      <h1>Peruvian map</h1>
      <p>Mapa decorativo del Perú con regiones principales.</p>
      <div className="map-layout">
        <svg viewBox="0 0 260 420" className="peru-map" role="img" aria-label="Mapa del Perú">
          <path d="M112 8 78 31 82 70 58 91 70 128 50 165 69 198 56 237 76 282 70 324 93 365 123 414 153 381 144 332 170 296 159 249 187 215 172 174 193 132 164 86 150 44Z" />
          <circle cx="104" cy="315" r="8" /><circle cx="138" cy="242" r="8" /><circle cx="117" cy="105" r="8" />
        </svg>
        <div className="region-list">{regions.map((region) => <span key={region}>{region}</span>)}</div>
      </div>
    </main>
  );
}
