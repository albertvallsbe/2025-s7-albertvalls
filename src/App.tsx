import { Routes, Route, Navigate } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { DetailItemPage } from "./pages/DetailItemPage/DetailItemPage";
import { Navbar } from "./components/Navbar/Navbar";
import { AsideRightItemPreview } from "./components/AsideRightItemPreview/AsideRightItemPreview";

export const App = (): JSX.Element => (
	<>
		<Routes>
			<Route path="/" element={<WelcomePage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/movie/:id" element={<DetailItemPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		<Navbar />
		<AsideRightItemPreview />
	</>
);
