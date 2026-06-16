import { Search } from 'lucide-react';

export function ResourceToolbar({
  search,
  setSearch,
  page,
  pages,
  setPage,
  placeholder = 'Buscar',
  children,
}) {
  return (
    <div className="rm-toolbar glass-panel">
      <label>
        <Search size={18} />
        <input
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder={placeholder}
        />
      </label>

      {children}

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
          ‹
        </button>
        <span>
          {page} / {pages}
        </span>
        <button disabled={page >= pages} onClick={() => setPage((value) => value + 1)}>
          ›
        </button>
      </div>
    </div>
  );
}
