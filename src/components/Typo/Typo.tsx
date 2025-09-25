// src/components/Typo/Typo.tsx
import React from "react";

/* 1) Tags textuals amb children (excloem void tags) */
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

/* 2) Models d’ítem: unió discriminada */
type TextItem<T extends TextualTag = "p"> = {
	kind: "text";
	label: string; // nom de la classe/mostra que es veu a la capçalera de la targeta
	className: string; // classe CSS a provar
	tag: T; // etiqueta semàntica a renderitzar
	content: string; // text de mostra
	props?: React.ComponentPropsWithoutRef<T>;
};

type InputItem = {
	kind: "input";
	label: string;
	className: string;
	tag: "input";
	props?: React.ComponentPropsWithoutRef<"input">;
};

// ✅ Important: passem el genèric explícit perquè no caigui a "p"
type Item = TextItem<TextualTag> | InputItem;

/* 3) Render helpers tipats */
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

function RenderInput({
	className,
	props,
}: {
	className: string;
	props?: React.ComponentPropsWithoutRef<"input">;
}) {
	return <input className={className} {...props} />;
}

export const Typo: React.FC = () => {
	const lorem =
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at dui a arcu tincidunt pulvinar. Curabitur vel justo a urna dictum interdum.";

	// 4) Mostres: marca cada ítem amb kind correcte
	const items: Item[] = [
		{
			kind: "text",
			label: ".heading",
			className: "heading",
			tag: "h2",
			content: "Heading base",
		},
		{
			kind: "text",
			label: ".heading__large",
			className: "heading__large",
			tag: "h1",
			content: "Heading gran",
		},
		{
			kind: "text",
			label: ".heading__medium",
			className: "heading__medium",
			tag: "h2",
			content: "Heading mitjà",
		},

		{
			kind: "text",
			label: ".text",
			className: "text",
			tag: "p",
			content: lorem,
		},
		{
			kind: "text",
			label: ".text__right",
			className: "text__right",
			tag: "p",
			content: "Text alineat a la dreta",
		},
		{
			kind: "text",
			label: ".text__body",
			className: "text__body",
			tag: "p",
			content: lorem,
		},
		{
			kind: "text",
			label: ".text__caption",
			className: "text__caption",
			tag: "small",
			content: "Peu / caption de mostra",
		},
		{
			kind: "text",
			label: ".text__display",
			className: "text__display",
			tag: "h1",
			content: "Display text",
		},

		{
			kind: "input",
			label: ".placeholder (::placeholder)",
			className: "placeholder",
			tag: "input",
			props: { type: "text", placeholder: "Això és un placeholder d’exemple" },
		},

		{
			kind: "text",
			label: ".title",
			className: "title",
			tag: "h1",
			content: "Títol corporatiu",
		},
		{
			kind: "text",
			label: ".subtitle",
			className: "subtitle",
			tag: "h2",
			content: "Subtítol corporatiu",
		},
		{
			kind: "text",
			label: ".secondary",
			className: "secondary",
			tag: "p",
			content: "Text secundari / auxiliar",
		},
		{
			kind: "text",
			label: ".name",
			className: "name",
			tag: "span",
			content: "Nom propi d’exemple",
		},
		{
			kind: "text",
			label: ".content",
			className: "content",
			tag: "p",
			content: "Contingut centrat amb trencament automàtic de paraules",
		},
		{
			kind: "text",
			label: ".company",
			className: "company",
			tag: "span",
			content: "Acme Corp.",
		},
	];

	// Estils locals per a la demo
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
				className="heading__large"
				style={{ textAlign: "center" }}
			>
				Tipografia · Galeria de classes
			</h1>

			<div style={wrapStyle}>
				{items.map((item, idx) => (
					<div key={idx} style={cardStyle}>
						<div style={cardHeaderStyle}>{item.label}</div>
						<div style={cardBodyStyle}>
							{item.kind === "input" ? (
								<RenderInput className={item.className} props={item.props} />
							) : (
								<RenderText
									tag={item.tag}
									className={item.className}
									content={item.content}
									props={item.props}
								/>
							)}
						</div>
					</div>
				))}

				{/* Recordatori: placeholders de Sass no són classes HTML */}
				<div style={cardStyle}>
					<div style={cardHeaderStyle}>%price-label (placeholder Sass)</div>
					<div style={cardBodyStyle}>
						<p className="text__caption">
							Aplica’l amb <code>@extend %price-label</code> dins d’una regla
							existent (p. ex. <code>.preu</code>).
						</p>
					</div>
				</div>

				<div style={cardStyle}>
					<div style={cardHeaderStyle}>%text-label (placeholder Sass)</div>
					<div style={cardBodyStyle}>
						<p className="text__caption">
							Aplica’l amb <code>@extend %text-label</code> (p. ex. a{" "}
							<code>.form__label</code>). No és una classe HTML.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Typo;
