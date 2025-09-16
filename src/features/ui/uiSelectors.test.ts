import type { RootState } from "../../app/store";
import { selectIsDetailOpen, selectSelectedMovieId } from "./uiSelectors";

const createState = (ui: RootState["ui"]): RootState =>
	({
		ui,
		movies: undefined,
	} as unknown as RootState);

describe("ui selectors", () => {
	/** Selectors de la UI */

	describe("basic selectors", () => {
		/** Selectors bàsics */

		test("return the detail open flag", () => {
			const stateOpen = createState({ isDetailOpen: true, selectedId: 7 });
			expect(selectIsDetailOpen(stateOpen)).toBe(true);

			const stateClosed = createState({
				isDetailOpen: false,
				selectedId: null,
			});
			expect(selectIsDetailOpen(stateClosed)).toBe(false);
		});

		test("return the selected movie id or null", () => {
			const stateWithId = createState({ isDetailOpen: true, selectedId: 99 });
			expect(selectSelectedMovieId(stateWithId)).toBe(99);

			const stateWithoutId = createState({
				isDetailOpen: false,
				selectedId: null,
			});
			expect(selectSelectedMovieId(stateWithoutId)).toBeNull();
		});
	});
});
