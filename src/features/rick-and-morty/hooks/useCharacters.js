import { rickAndMortyService } from '../services/rick-and-morty-service.js';
import { useRickAndMortyResource } from './useRickAndMortyResource.js';

export function useCharacters(filters) {
  return useRickAndMortyResource(rickAndMortyService.getCharacters, filters);
}
