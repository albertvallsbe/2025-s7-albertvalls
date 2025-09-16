import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { MovieContext } from "../../context/movies/MovieContext";

const img = (path: string | null | undefined, size = "w780") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const ItemDetail = () => {
	const context = useContext(MovieContext);

	if (!context.isItemDetailOpen || !context.itemToShow) {
		// opcional: deixa l’aside muntat però ocult si prefereixes
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
					onClick={context.closeItemDetail}
				>
					<XMarkIcon></XMarkIcon>
				</button>
			</div>

			<figure className="product-detail__figure">
				<img
					className="product-detail__image"
					src={img(
						context.itemToShow.backdrop_path ?? context.itemToShow.poster_path,
						"w780"
					)}
					alt={context.itemToShow.title ?? context.itemToShow.name ?? "Movie"}
				/>
			</figure>

			<div className="product-detail__body">
				<span className="product-detail__price">
					{Math.round(context.itemToShow.vote_average ?? 0) * 10} /100
				</span>
				<span className="product-detail__title">
					{context.itemToShow.title ?? context.itemToShow.name}
				</span>
				<p className="product-detail__desc">{context.itemToShow.overview}</p>
			</div>
		</aside>
	);
};
