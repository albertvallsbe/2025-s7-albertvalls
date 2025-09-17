import type { RootState } from "../../app/store";
import type { TmdbMovie } from "../../types/movies";

export const selectMoviesState = (state: RootState) => state.movies;
export const selectAllMovies = (state: RootState): TmdbMovie[] =>
	state.movies.items;

export const selectMovieById = (
	state: RootState,
	movieId: number | null
): TmdbMovie | null => {
	if (movieId == null) return null;
	return state.movies.items.find((movie) => movie.id === movieId) ?? null;
};

export const selectMovieDetailsById = (
	state: RootState,
	movieId: number | null
): TmdbMovie | null => {
	if (movieId == null) return null;
	return state.movies.detailsById[movieId] ?? null;
};

export const selectMovieDetailsStatusById = (
	state: RootState,
	movieId: number | null
) =>
	movieId == null ? "idle" : state.movies.detailsStatusById[movieId] ?? "idle";

export const selectMovieDetailsErrorById = (
	state: RootState,
	movieId: number | null
) => (movieId == null ? undefined : state.movies.detailsErrorById[movieId]);
