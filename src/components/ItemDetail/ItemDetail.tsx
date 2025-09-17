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
		<article className="item-detail">
			<header className="item-detail__header">
				<h1 className="item-detail__title">{title}</h1>
				{date && <p className="item-detail__date">{date}</p>}
				<p className="item-detail__score">{score100} /100</p>
			</header>

			<figure className="item-detail__media">
				<img
					className="item-detail__image"
					src={img(movie.backdrop_path ?? movie.poster_path, "w780")}
					alt={title}
				/>
			</figure>

			<section className="item-detail__body">
				<h2>Overview</h2>
				<p>{movie.overview}</p>
			</section>
		</article>
	);
};
