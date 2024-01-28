import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
	const routeLocation = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [routeLocation]);

	return null;
}