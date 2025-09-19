import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeDetail } from "../../features/ui/uiSlice";
import {
	selectIsDetailOpen,
	selectSelectedMovieId,
} from "../../features/ui/uiSelectors";
import { selectMovieById } from "../../features/movies/moviesSelectors";

const img = (path: string | null | undefined, size = "w780") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const ItemPreview = () => {
	const dispatch = useAppDispatch();

	const isDetailOpen = useAppSelector((state) => selectIsDetailOpen(state));
	const selectedMovieId = useAppSelector((state) =>
		selectSelectedMovieId(state)
	);
	const item = useAppSelector((state) =>
		selectMovieById(state, selectedMovieId)
	);

	if (!isDetailOpen || !item) {
		return null;
	}

	return (
		<aside className="aside-right">
			<div className="aside-right__header">
				<h2>Detail</h2>
				<button
					className="aside-right__close"
					type="button"
					aria-label="Close detail"
					onClick={() => dispatch(closeDetail())}
				>
					<XMarkIcon></XMarkIcon>
				</button>
			</div>

			<figure className="aside-right__figure">
				<img
					className="aside-right__image"
					src={img(item.backdrop_path ?? item.poster_path, "w780")}
					alt={item.title ?? item.name ?? "Movie"}
				/>
			</figure>

			<div className="aside-right__body">
				<span className="aside-right__price">
					{Math.round(item.vote_average ?? 0) * 10} /100
				</span>
				<span className="aside-right__title">{item.title ?? item.name}</span>
				<p className="aside-right__desc">{item.overview}</p>
			</div>
			<Link
				to={`/movie/${item.id}`}
				onClick={() => dispatch(closeDetail())}
				className="button__text"
			>
				See more
			</Link>
		</aside>
	);
};
