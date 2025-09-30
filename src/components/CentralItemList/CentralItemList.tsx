import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectMovieCreditsById,
	selectMovieCreditsStatusById,
	selectMovieCreditsErrorById,
} from "../../features/movies/moviesSelectors";
import { fetchMovieCreditsById } from "../../features/movies/moviesSlice";
import { PersonCard } from "../../components/LineItem/LineItem";
import type { TmdbCastMember } from "../../types/movies";

type Props = {
	movieId: number;
};

export const CentralItemList: React.FC<Props> = ({ movieId }) => {
	const dispatch = useAppDispatch();

	const credits = useAppSelector((state) =>
		selectMovieCreditsById(state, movieId)
	);
	const status = useAppSelector((state) =>
		selectMovieCreditsStatusById(state, movieId)
	);
	const error = useAppSelector((state) =>
		selectMovieCreditsErrorById(state, movieId)
	);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchMovieCreditsById(movieId));
		}
	}, [dispatch, movieId, status]);

	if (status === "loading") return <p>Loading cast…</p>;
	if (status === "failed") return <p>Error: {error}</p>;
	if (!credits || credits.cast.length === 0) return <p>No cast available</p>;

	return (
		<section>
			<h3>Cast</h3>
			<div className="cast-list">
				{credits.cast.slice(0, 10).map((actor: TmdbCastMember) => (
					<PersonCard
						key={actor.cast_id}
						id={actor.id}
						name={actor.name}
						character={actor.character}
						imageUrl={
							actor.profile_path
								? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
								: null
						}
					/>
				))}
			</div>
		</section>
	);
};
