import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../services/http";
import type { TmdbMovie, TmdbListResponse } from "../../types/movies";

type MoviesState = {
	items: TmdbMovie[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
};

const initialState: MoviesState = {
	items: [],
	status: "idle",
};

export const fetchTrendingMovies = createAsyncThunk<
	TmdbMovie[],
	void,
	{ rejectValue: string }
>("movies/fetchTrending", async (_void, { rejectWithValue }) => {
	try {
		const url = import.meta.env.VITE_TMDB_URL as string; // pot ser absoluta
		const res = await http.get<TmdbListResponse<TmdbMovie>>(url);
		return res.data.results ?? [];
	} catch (err: any) {
		const message =
			err?.response?.data?.status_message ||
			err?.message ||
			"Unknown error fetching movies";
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
	},
});

export default moviesSlice.reducer;
// export const moviesSlice = moviesSlice.reducer;
