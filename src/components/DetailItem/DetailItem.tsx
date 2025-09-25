// import { XMarkIcon } from "@heroicons/react/24/solid";
import type { TmdbMovie } from "../../types/movies";

const img = (path: string | null | undefined, size = "w780") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

type ItemDetailProps = {
	movie: TmdbMovie;
};

export const ItemDetail = ({ movie }: ItemDetailProps): JSX.Element => {
	const title = movie.title ?? movie.name ?? "Untitled";
	const score100 = Math.round((movie.vote_average ?? 0) * 10);
	const date = movie.release_date ?? movie.first_air_date ?? "";

	return (
		<article className="detail-item">
			<header className="detail-item__header">
				<h1 className="detail-item__title">{title}</h1>
			</header>

			<figure className="detail-item__media">
				<img
					className="detail-item__image"
					src={img(movie.backdrop_path ?? movie.poster_path, "w780")}
					alt={title}
				/>
			</figure>

			<section className="detail-item__body">
				{date && <p className="detail-item__date">{date}</p>}
				<p className="detail-item__price-label">{score100} / 100</p>

				<p>{movie.overview}</p>
			</section>
		</article>
	);
};
