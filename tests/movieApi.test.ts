import { getMovies } from '../src/functions/movieApi';
import {describe, expect, it} from 'vitest';

describe('getMovies', () => {
  it('returns a valid response', async () => {
    const movies = await getMovies(1);

    expect(movies.results).toBeDefined();
    expect(Array.isArray(movies.results)).toBe(true);
    expect(movies.results.length).toBeGreaterThan(0);
  });

  it('throws an error for an invalid API key', async () => {
    const originalKey = process.env.PUBLIC_API_KEY;
    process.env.PUBLIC_API_KEY = 'invalid-api-key';

    await expect(getMovies(1)).rejects.toThrow(`Failed to fetch movies: 401 Unauthorized`);

    process.env.PUBLIC_API_KEY = originalKey;
  });
});