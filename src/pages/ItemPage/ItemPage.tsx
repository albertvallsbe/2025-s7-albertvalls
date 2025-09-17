import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
	selectMovieDetailsById,
	selectMovieDetailsStatusById,
	selectMovieDetailsErrorById,
} from "../../features/movies/moviesSelectors";
import { fetchMovieById } from "../../features/movies/moviesSlice";
import { Layout } from "../../components/Layout/Layout";
import { ItemDetail } from "../../components/ItemDetail/ItemDetail";

export const ItemPage = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const movieId = id ? Number(id) : null;

	const dispatch = useAppDispatch();

	const movie = useAppSelector((state) =>
		selectMovieDetailsById(state, movieId)
	);
	const requestStatus = useAppSelector((state) =>
		selectMovieDetailsStatusById(state, movieId)
	);
	const requestError = useAppSelector((state) =>
		selectMovieDetailsErrorById(state, movieId)
	);

	useEffect(() => {
		if (movieId === null) {
			return;
		}
		if (!movie && requestStatus !== "loading") {
			dispatch(fetchMovieById(movieId));
		}
	}, [dispatch, movieId, movie, requestStatus]);

	return (
		<Layout>
			{movieId == null && <p>Invalid movie id</p>}
			{requestStatus === "loading" && !movie && <p>Loading…</p>}
			{requestStatus === "failed" && <p>Error: {requestError}</p>}
			{!movie && requestStatus !== "loading" && <p>Not found…</p>}

			{movie && <ItemDetail movie={movie} />}
		</Layout>
	);
};
