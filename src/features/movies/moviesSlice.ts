import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import http from "../../services/http";
import type { TmdbMovie, TmdbListResponse } from "../../types/movies";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type MoviesState = {
	items: TmdbMovie[];
	status: RequestStatus;
	error?: string;

	detailsById: Record<number, TmdbMovie>;
	detailsStatusById: Record<number, RequestStatus>;
	detailsErrorById: Record<number, string | undefined>;
};

const initialState: MoviesState = {
	items: [],
	status: "idle",
	detailsById: {},
	detailsStatusById: {},
	detailsErrorById: {},
};

export const fetchTrendingMovies = createAsyncThunk<
	TmdbMovie[],
	void,
	{ rejectValue: string }
>("movies/fetchTrending", async (_void, { rejectWithValue }) => {
	try {
		const path = import.meta.env.VITE_TMDB_TRENDING_PATH as string;
		const response = await http.get<TmdbListResponse<TmdbMovie>>(path);
		return response.data.results ?? [];
	} catch (error) {
		const axiosError = error as AxiosError<{ status_message?: string }>;
		const message =
			axiosError.response?.data?.status_message ||
			axiosError.message ||
			"Unknown error fetching movies";
		return rejectWithValue(message);
	}
});

/**
 * Demana el detall d’una pel·lícula concreta
 */
export const fetchMovieById = createAsyncThunk<
	TmdbMovie,
	number,
	{ rejectValue: string }
>("movies/fetchById", async (movieId, { rejectWithValue }) => {
	try {
		const language = import.meta.env.VITE_TMDB_LANG ?? "en-EN";
		const path = `/movie/${movieId}?language=${language}`;
		const response = await http.get<TmdbMovie>(path);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<{ status_message?: string }>;
		const message =
			axiosError.response?.data?.status_message ||
			axiosError.message ||
			"Unknown error fetching movie detail";
		return rejectWithValue(message);
	}
});

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTrendingMovies.pending, (state) => {
				state.status = "loading";
				state.error = undefined;
			})
			.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.items = action.payload;
			})
			.addCase(fetchTrendingMovies.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || "Failed to fetch movies";
			});

		builder
			.addCase(fetchMovieById.pending, (state, action) => {
				const movieId = action.meta.arg;
				state.detailsStatusById[movieId] = "loading";
				state.detailsErrorById[movieId] = undefined;
			})
			.addCase(fetchMovieById.fulfilled, (state, action) => {
				const movie = action.payload;
				state.detailsById[movie.id] = movie;
				state.detailsStatusById[movie.id] = "succeeded";
			})
			.addCase(fetchMovieById.rejected, (state, action) => {
				const movieId = action.meta.arg;
				state.detailsStatusById[movieId] = "failed";
				state.detailsErrorById[movieId] =
					action.payload || "Failed to fetch movie detail";
			});
	},
});

export default moviesSlice.reducer;
// export const moviesSlice = moviesSlice.reducer;
