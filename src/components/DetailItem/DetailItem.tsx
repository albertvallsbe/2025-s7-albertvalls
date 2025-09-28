// import { XMarkIcon } from "@heroicons/react/24/solid";
import type { TmdbMovie } from "../../types/movies";
import { CentralItemList } from "../../components/CentralItemList/CentralItemList";
// features/movies/components/MovieCastList";
// … dins del render, després de mostrar la informació principal:

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
				<h1>{title}</h1>
			</header>
			<figure className="detail-item__figure">
				<img
					className="detail-item__image"
					src={img(movie.backdrop_path ?? movie.poster_path, "w780")}
					alt={title}
				/>
			</figure>
			<section className="detail-item__body">
				<div className="detail-item__total">
					{date && <p>{date}</p>}
					{score100 && <p>{score100} / 100</p>}
				</div>
				<p>{movie.overview}</p>
			</section>
			{movie && <CentralItemList movieId={movie.id} />}
		</article>
	);
};
