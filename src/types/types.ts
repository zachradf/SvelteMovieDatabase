import type MovieCard__SvelteComponent_ from "../components/MovieCard.svelte";

export interface Movie {
    id: number;
    title: string;
    release_date: string;
    genre_ids: number[];
    poster_path: string;
    original_title: string;
    overview: string;
    vote_average: number;
    vote_count: number;
  }

  export interface MovieApiResponse {
    results: MovieCards[];
  }
    export type MovieCardProps = {
      movie: Movie;
      expanded: boolean;
      movieDetails: any;
    };
    
    export type MovieCard = MovieCardProps & {
      component: typeof MovieCard__SvelteComponent_;
      props: MovieCardProps,
    };
    // { component: typeof MovieCard__SvelteComponent_; props: { movie: Movie; expanded: boolean; movieDetails: any; }; }[]
    export type MovieCards = MovieCard[];
