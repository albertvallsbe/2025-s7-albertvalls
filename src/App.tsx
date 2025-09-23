import { Routes, Route, Navigate } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { DetailItemPage } from "./pages/DetailItemPage/DetailItemPage";
import { Navbar } from "./components/Navbar/Navbar";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AsideRightItemPreview } from "./components/AsideRightItemPreview/AsideRightItemPreview";
import { RequireAuth } from "./components/ReqireAuth/RequireAuth";

export const App = (): JSX.Element => (
	<>
		<Routes>
			<Route path="/" element={<WelcomePage />} />
			<Route path="/login" element={<LoginPage />} />

			<Route element={<RequireAuth />}>
				<Route path="/home" element={<HomePage />} />
				<Route path="/movie/:id" element={<DetailItemPage />} />
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		<Navbar />
		<AsideRightItemPreview />
	</>
);
