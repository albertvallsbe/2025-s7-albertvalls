import { Routes, Route, Navigate } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ItemPage } from "./pages/ItemPage/ItemPage";
import { Navbar } from "./components/Navbar/Navbar";
import { ItemPreview } from "./components/ItemPreview/ItemPreview";

export const App = (): JSX.Element => (
	<>
		<Routes>
			<Route path="/" element={<WelcomePage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/movie/:id" element={<ItemPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		<Navbar />
		<ItemPreview />
	</>
);
