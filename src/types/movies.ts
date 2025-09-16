export interface TmdbMovie {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date?: string;
	first_air_date?: string;
	vote_average: number;
}

export interface TmdbListResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
