import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemDetail } from "../../components/ItemDetail/ItemDetail";
import type { TmdbListResponse, TmdbMovie } from "../../types/movies.js";

export const HomePage = (): JSX.Element => {
	const [items, setItems] = useState<TmdbMovie[]>([]);

	useEffect(() => {
		const controller = new AbortController();
		fetch(import.meta.env.VITE_TMDB_URL, {
			signal: controller.signal,
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) =>
				response.ok ? response.json() : Promise.reject(response)
			)
			.then((data: TmdbListResponse<TmdbMovie>) => setItems(data.results ?? []))
			.catch((e) => {
				if (e.name !== "AbortError") console.error(e);
				setItems([]);
			});
		return () => controller.abort();
	}, []);

	return (
		<Layout>
			<div className="products-grid">
				{items?.map((item) => (
					<ItemCard key={item.id} data={item} />
				))}
			</div>
			<ItemDetail />
		</Layout>
	);
};
