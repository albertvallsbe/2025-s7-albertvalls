import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	authenticateUser,
	selectAuthState,
	selectIsAuthenticated,
} from "../../features/auth/authSlice";

export const LoginPage = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { authenticationStatus, errorMessage } =
		useAppSelector(selectAuthState);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(authenticateUser({ email: userEmail, password: userPassword }));
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<Layout>
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
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						autoComplete="current-password"
						placeholder="••••••••"
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
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
		</Layout>
	);
};
