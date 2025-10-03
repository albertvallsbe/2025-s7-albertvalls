import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";

export const WelcomePage = (): JSX.Element => (
	<>
		<Layout>
			<article className="form">
				<div className="form__header">
					<h1>Benvingut/da!</h1>
				</div>
				<div>
					<Link to="/home" className="aside-right__body">
						<button className="button button--primary">Entrar a la home</button>
					</Link>
				</div>
			</article>
		</Layout>
	</>
);
