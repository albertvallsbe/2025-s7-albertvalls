import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { MainItem } from "../../components/MainItem/MainItem";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTrendingMovies } from "../../features/movies/moviesSlice";

export const HomePage = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const items = useAppSelector((state) => state.movies.items);
	const status = useAppSelector((state) => state.movies.status);
	const error = useAppSelector((state) => state.movies.error);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchTrendingMovies());
		}
	}, [dispatch, status]);

	return (
		<Layout>
			{status === "loading" && <p>Loading…</p>}
			{status === "failed" && <p>Error: {error}</p>}
			{status === "succeeded" && (
				<div className="main-items-grid">
					{items?.map((item) => (
						<MainItem key={item.id} data={item} />
					))}
				</div>
			)}
		</Layout>
	);
};
