import React from "react";

type PersonCardProps = {
	id: number;
	name: string;
	character?: string | null; // per actors
	job?: string; // per crew
	imageUrl: string | null;
	onClick?: () => void;
};

export const PersonCard: React.FC<PersonCardProps> = ({
	id,
	name,
	character,
	job,
	imageUrl,
	onClick,
}) => {
	return (
		<article className="line-item" onClick={onClick} data-id={id}>
			<figure className="line-item__figure">
				{imageUrl ? (
					<img className="line-item__img" src={imageUrl} alt={name} />
				) : (
					<div className="line-item__placeholder">No image</div>
				)}
			</figure>
			<div className="line-item__body">
				<h3>{name}</h3>
				{character && (
					<p>
						as <em>{character}</em>
					</p>
				)}
				{job && <p>{job}</p>}
			</div>
		</article>
	);
};
