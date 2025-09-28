// src/components/Typo/Typo.tsx
import React from "react";

/* Tags textuals amb children (excloem void tags) */
type TextualTag =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "p"
	| "small"
	| "span"
	| "label"
	| "div";

/* Models d’ítem */
type TextItem<T extends TextualTag = "p"> = {
	kind: "text";
	label: string; // etiqueta que mostrem a la capçalera de la targeta
	className: string; // classe CSS a provar
	tag: T; // etiqueta semàntica a renderitzar
	content: string; // text de mostra
	props?: React.ComponentPropsWithoutRef<T>;
};

type Item = TextItem<TextualTag>;

/* Render helper */
function RenderText<T extends TextualTag>({
	tag,
	className,
	content,
	props,
}: {
	tag: T;
	className: string;
	content: string;
	props?: React.ComponentPropsWithoutRef<T>;
}) {
	return React.createElement(tag, { className, ...props }, content);
}

export const Typo: React.FC = () => {
	// Text curt amb ascendents/descendents per comprovar alçades de línia
	const sample = "Patajapa — The quick brown fox jumps over 123";

	// Mostres finals (una per mida)
	const items: Item[] = [
		{
			kind: "text",
			label: ".text-extra-small (14px)",
			className: "text-extra-small",
			tag: "p",
			content: sample,
		},
		{
			kind: "text",
			label: ".text-small (16px)",
			className: "text-small",
			tag: "p",
			content: sample,
		},
		{
			kind: "text",
			label: ".text-medium (18px)",
			className: "text-medium",
			tag: "p",
			content: sample,
		},
		{
			kind: "text",
			label: ".text-large (20px)",
			className: "text-large",
			tag: "p",
			content: sample,
		},
		{
			kind: "text",
			label: ".heading-extra-large (24px)",
			className: "heading-extra-large",
			tag: "h2",
			content: "Heading XL — Patajapa",
		},
		{
			kind: "text",
			label: ".heading-doble-extra-large (28px)",
			className: "heading-doble-extra-large",
			tag: "h2",
			content: "Heading 2XL — Patajapa",
		},
		{
			kind: "text",
			label: ".heading-triple-extra-large (32px)",
			className: "heading-triple-extra-large",
			tag: "h1",
			content: "Heading 3XL — Patajapa",
		},
	];

	// Estils locals mínims per la demo
	const wrapStyle: React.CSSProperties = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
		gap: 16,
		width: "min(1200px, 100%)",
		margin: "1.5rem auto",
	};
	const cardStyle: React.CSSProperties = {
		display: "grid",
		gap: 8,
		padding: 12,
		border: "1px solid rgba(0,0,0,0.1)",
		borderRadius: 8,
		background: "#fff",
		boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
	};
	const cardHeaderStyle: React.CSSProperties = {
		fontSize: 12,
		fontWeight: 600,
		letterSpacing: 0.3,
		color: "#666",
		borderBottom: "1px dashed rgba(0,0,0,0.15)",
		paddingBottom: 6,
	};
	const cardBodyStyle: React.CSSProperties = {
		display: "grid",
		alignItems: "center",
		minHeight: 80,
	};

	return (
		<section aria-labelledby="typo-title" style={{ padding: "1rem 0" }}>
			<h1
				id="typo-title"
				className="heading-triple-extra-large"
				style={{ textAlign: "center" }}
			>
				Tipografia · Escala final
			</h1>

			<div style={wrapStyle}>
				{items.map((item, idx) => (
					<div key={idx} style={cardStyle}>
						<div style={cardHeaderStyle}>{item.label}</div>
						<div style={cardBodyStyle}>
							<RenderText
								tag={item.tag}
								className={item.className}
								content={item.content}
								props={item.props}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Typo;
