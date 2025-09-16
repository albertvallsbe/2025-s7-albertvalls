import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { TmdbMovie } from "../../types/movies.js";

export type MovieContextType = {
	// count: number;
	// setCount: Dispatch<SetStateAction<number>>;

	// cartProducts: Product[];
	// setCartProducts: Dispatch<SetStateAction<Product[]>>;

	// order: Order[];
	// setOrder: Dispatch<SetStateAction<Order[]>>;

	// Checkout Side Menu
	// isCheckoutAsideMenuOpen: boolean;
	// openCheckoutAsideMenu: () => void;
	// closeCheckoutAsideMenu: () => void;

	// Detail Card
	isItemDetailOpen: boolean;
	openItemDetail: () => void;
	closeItemDetail: () => void;

	itemToShow: TmdbMovie | null;
	setItemToShow: Dispatch<SetStateAction<TmdbMovie | null>>;
};

export const MovieContext = createContext<MovieContextType>({
	isItemDetailOpen: false,
	openItemDetail: () => {},
	closeItemDetail: () => {},

	// isCheckoutAsideMenuOpen: false,
	// openCheckoutAsideMenu: () => {},
	// closeCheckoutAsideMenu: () => {},

	itemToShow: null,
	setItemToShow: () => {},
});
