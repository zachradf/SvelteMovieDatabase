import { getMovies, getDetails } from '../src/functions/movieApi';
import {describe, expect, it, test} from 'vitest';
import jest from 'jest';

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
  test('getMovies throws an error for an invalid page number', async () => {
    const page = -1;
  
    await expect(getMovies(page)).rejects.toThrow('Failed to fetch movies: 400 Bad Request');
  });
});

// Mock the global fetch function
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ id: 123, title: 'The Matrix' })
}));

describe("getDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch movie details", async () => {
    const movieDetails = {
      id: 123,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      overview: "An epic adventure of good against evil",
    };

    const mockResponse = {
      ok: true,
      status: 200,
      statusText: "OK",
      json: jest.fn().mockResolvedValue(movieDetails),
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const result = await getDetails(123);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/movie/123?api_key=PUBLIC_API_KEY&language=en-US&append_to_response=credits&include_image_language=en,null&vote_count.gte=1000000&sort_by=popularity.desc&cast.profile_path.notnull"
    );
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(result).toEqual(movieDetails);
  });

  it("should throw an error when fetching fails", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getDetails(123)).rejects.toThrow(
      "Failed to fetch movies: 404 Not Found"
    );
  });
});