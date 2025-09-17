import type { TmdbMovie } from "../../types/movies";
// import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import { useAppDispatch } from "../../app/hooks";
import { openDetail } from "../../features/ui/uiSlice";

type CardProps = { data: TmdbMovie };

const poster = (path: string | null | undefined, size = "w342") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const ItemCard = ({ data }: CardProps) => {
	const dispatch = useAppDispatch();

	const openDetailForItem = () => {
		dispatch(openDetail(data.id));
	};

	return (
		<div
			className="product-card"
			role="article"
			aria-label="Product card"
			onClick={openDetailForItem}
		>
			<figure className="product-card__figure">
				<img
					className="product-card__image"
					src={poster(data.poster_path)}
					alt={data.title ?? data.name ?? "Movie"}
				/>
			</figure>
			<p className="product-card__meta">
				<span className="product-card__title"> {data.title ?? data.name}</span>
				<span className="product-card__price">
					{" "}
					{Math.round((data.vote_average ?? 0) * 10)} / 100
				</span>
			</p>
		</div>
	);
};
