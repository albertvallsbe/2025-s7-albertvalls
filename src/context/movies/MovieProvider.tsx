import { useState } from "react";
import type { ReactNode } from "react";
import { MovieContext } from "./MovieContext";
import type { TmdbMovie } from "../../types/movies.js";

export const MovieProvider = ({ children }: { children: ReactNode }) => {
	// Product Detail · Open/Close
	const [isItemDetailOpen, setIsItemDetailOpen] = useState(false);
	const openItemDetail = () => setIsItemDetailOpen(true);
	const closeItemDetail = () => setIsItemDetailOpen(false);

	// Product Detail · Show product
	const [itemToShow, setItemToShow] = useState<TmdbMovie | null>(null);

	return (
		<MovieContext.Provider
			value={{
				itemToShow,
				setItemToShow,

				openItemDetail,
				closeItemDetail,
				isItemDetailOpen,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};
