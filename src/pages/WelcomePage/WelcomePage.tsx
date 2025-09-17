import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";

export const WelcomePage = (): JSX.Element => (
	<>
		<Layout>
			<article className="card welcome-card">
				<div className="card__item">
					<h1 className="heading">Benvingut/da!</h1>
				</div>
			</article>
			<Link to="/home">
				<button className="button__text">Entrar a la home</button>
			</Link>
		</Layout>
	</>
);
