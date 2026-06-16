const API_URL = 'https://rickandmortyapi.com/api';

async function request(endpoint, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      query.set(key, String(value).trim());
    }
  });

  const url = `${API_URL}${endpoint}${query.toString() ? `?${query.toString()}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 1, next: null, prev: null }, results: [] };
    }

    throw new Error('No se pudo cargar la información de Rick and Morty API');
  }

  return response.json();
}

export const rickAndMortyService = {
  getCharacters({ page = 1, name = '', status = '', species = '', gender = '' } = {}) {
    return request('/character', { page, name, status, species, gender });
  },

  getCharacterById(id) {
    return request(`/character/${id}`);
  },

  getEpisodes({ page = 1, name = '', episode = '' } = {}) {
    return request('/episode', { page, name, episode });
  },

  getEpisodeById(id) {
    return request(`/episode/${id}`);
  },

  getLocations({ page = 1, name = '', type = '', dimension = '' } = {}) {
    return request('/location', { page, name, type, dimension });
  },

  getLocationById(id) {
    return request(`/location/${id}`);
  },
};

export const getCharacters = rickAndMortyService.getCharacters;
