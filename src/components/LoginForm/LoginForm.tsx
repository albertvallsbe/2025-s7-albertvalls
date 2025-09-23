import { useEffect, useState } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	authenticateUser,
	selectAuthState,
	selectIsAuthenticated,
} from "../../features/auth/authSlice";

type LoginFormState = {
	email: string;
	password: string;
};

type RedirectState = {
	from?: Location;
};

const initialFormState: LoginFormState = {
	email: "",
	password: "",
};

export const LoginForm = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { authenticationStatus, errorMessage } =
		useAppSelector(selectAuthState);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	const [formData, setFormData] = useState<LoginFormState>(initialFormState);

	// Si venim d'una ruta privada, guardem on tornar
	const fromPath =
		(location.state as RedirectState | null)?.from?.pathname ?? "/home";

	const handleFormChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const { id, value } = event.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		dispatch(
			authenticateUser({ email: formData.email, password: formData.password })
		);
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate(fromPath, { replace: true });
		}
	}, [isAuthenticated, navigate, fromPath]);

	return (
		<section
			style={{ maxWidth: 360, margin: "0 auto", display: "grid", gap: 12 }}
		>
			<h1>Sign in</h1>

			<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					autoComplete="username"
					placeholder="your@email.com"
					value={formData.email}
					onChange={handleFormChange}
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					autoComplete="current-password"
					placeholder="••••••••"
					value={formData.password}
					onChange={handleFormChange}
					required
				/>

				<button type="submit" disabled={authenticationStatus === "loading"}>
					{authenticationStatus === "loading" ? "Entrant…" : "Entrar"}
				</button>
			</form>

			{authenticationStatus === "failed" && (
				<p style={{ color: "crimson" }}>{errorMessage}</p>
			)}
		</section>
	);
};
