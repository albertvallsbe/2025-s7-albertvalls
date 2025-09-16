import { useContext } from "react";
import type { TmdbMovie } from "../../types/movies";
import { MovieContext } from "../../context/movies/MovieContext";
// import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

type CardProps = { data: TmdbMovie };

const poster = (path: string | null | undefined, size = "w342") =>
	path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export const ItemCard = ({ data }: CardProps) => {
	const context = useContext(MovieContext);

	const showItem = (itemDetail: TmdbMovie) => {
		context.openItemDetail();
		// context.closeCheckoutAsideMenu();
		context.setItemToShow(itemDetail);
	};

	// const addProductsToCart = (productData: Product, event: React.MouseEvent) => {
	// 	event.stopPropagation();
	// 	context.setCount(context.count + 1);
	// 	context.setCartProducts([...context.cartProducts, productData]);
	// 	context.openCheckoutAsideMenu();
	// 	context.closeProductDetail();
	// };

	// const handleProductDelete = (id: number) => {
	// 	const filteredProducts = context.cartProducts.filter(
	// 		(product) => product.id !== id
	// 	);
	// 	context.setCartProducts(filteredProducts);
	// 	context.setCount(context.count - 1);
	// };

	// const renderIcon = (id: number) => {
	// 	const isInCart =
	// 		context.cartProducts.filter((product) => product.id === id).length > 0;

	// 	if (isInCart) {
	// 		return (
	// 			<button
	// 				className="product-card__add"
	// 				aria-label="Add to cart"
	// 				type="button"
	// 				onClick={() => handleProductDelete(data.id)}
	// 			>
	// 				<MinusIcon></MinusIcon>
	// 			</button>
	// 		);
	// 	} else {
	// 		return (
	// 			<button
	// 				className="product-card__add"
	// 				aria-label="Add to cart"
	// 				type="button"
	// 				onClick={(event) => addProductsToCart(data, event)}
	// 			>
	// 				<PlusIcon></PlusIcon>
	// 			</button>
	// 		);
	// 	}
	// };

	return (
		<div
			className="product-card"
			role="article"
			aria-label="Product card"
			onClick={() => showItem(data)}
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
