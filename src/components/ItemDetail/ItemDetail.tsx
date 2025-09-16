import { XMarkIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeDetail } from "../../features/ui/uiSlice";
import {
	selectIsDetailOpen,
	selectSelectedMovieId,
} from "../../features/ui/uiSelectors";
import { selectMovieById } from "../../features/movies/moviesSelectors";

const img = (path: string | null | undefined, size = "w780") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const ItemDetail = () => {
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
		<aside className="product-detail">
			<div className="product-detail__header">
				<h2>Detail</h2>
				<button
					className="product-detail__close"
					type="button"
					aria-label="Close detail"
					onClick={() => dispatch(closeDetail())}
				>
					<XMarkIcon></XMarkIcon>
				</button>
			</div>

			<figure className="product-detail__figure">
				<img
					className="product-detail__image"
					src={img(item.backdrop_path ?? item.poster_path, "w780")}
					alt={item.title ?? item.name ?? "Movie"}
				/>
			</figure>

			<div className="product-detail__body">
				<span className="product-detail__price">
					{Math.round(item.vote_average ?? 0) * 10} /100
				</span>
				<span className="product-detail__title">{item.title ?? item.name}</span>
				<p className="product-detail__desc">{item.overview}</p>
			</div>
		</aside>
	);
};
