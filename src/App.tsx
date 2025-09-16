import { Routes, Route, Navigate } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import { HomePage } from "./pages/Home/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
import { ItemDetail } from "./components/ItemDetail/ItemDetail";

export const App = (): JSX.Element => (
	<>
		<Routes>
			<Route path="/" element={<WelcomePage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
		<Navbar />
		<ItemDetail />
	</>
);
