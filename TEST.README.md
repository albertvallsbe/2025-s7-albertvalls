# 🧪 Testing Guidelines

Aquest projecte fa servir **Jest** per als tests.  
Hi ha dos patrons diferents depenent del que volem provar:

---

## 1. Tests de **selectors purs**

- Exemple: `uiSelectors.test.ts`
- Els selectors són funcions pures: agafen `state` i retornen un valor.
- No cal muntar un `store` real.
- 🛠️ Fem servir `makeState`:

```ts
const makeState = (patch?: Partial<UiState>): UiState => ({
  isDetailOpen: false,
  selectedMovieId: null,
  ...patch,
});

test("selectIsDetailOpen returns true when open", () => {
  const state = { ui: makeState({ isDetailOpen: true }) };
  expect(selectIsDetailOpen(state)).toBe(true);
});
```
