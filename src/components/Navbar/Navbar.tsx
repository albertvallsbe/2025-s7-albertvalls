import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectAuthState,
	selectIsAuthenticated,
	performLogout,
} from "../../features/auth/authSlice";

export const Navbar = () => {
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`navbar__link${isActive ? " is-active" : ""}`;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const { authenticatedUser } = useAppSelector(selectAuthState);

	// Etiqueta d’usuari a mostrar (ara mateix fem servir l’email; més endavant pot ser username)
	const userLabel: string = authenticatedUser?.email ?? "";

	const handleLogout = (): void => {
		dispatch(performLogout());
		navigate("/", { replace: true });
	};

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
				<li className="navbar__email">{userLabel}</li>
				<li>
					{isAuthenticated ? (
						<button
							type="button"
							className="navbar__link"
							onClick={handleLogout}
						>
							Logout
						</button>
					) : (
						<NavLink to="/login" className={linkClass}>
							Login
						</NavLink>
					)}
				</li>
			</ul>
		</nav>
	);
};
