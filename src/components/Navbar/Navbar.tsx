import { NavLink } from "react-router-dom";

export const Navbar = () => {
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`navbar__link${isActive ? " is-active" : ""}`;

	return (
		<nav className="navbar">
			<ul className="navbar__left">
				<li className="navbar__brand">
					<NavLink to="/" className="navbar__brand-link">
						Movieis
					</NavLink>
				</li>
				<li>
					<NavLink to="/home" className={linkClass}>
						All
					</NavLink>
				</li>
			</ul>
			<ul className="navbar__right">
				<li className="navbar__email">titu@platzi.com</li>
				<li>
					<NavLink to="/sign-in" className={linkClass}>
						Sign In
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
