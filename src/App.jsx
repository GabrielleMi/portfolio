import "./styles/globals.scss";
import Footer from './components/footer/Footer';
import { Outlet } from "react-router-dom";
import Prism from "prism-react-renderer/prism";
import React from 'react';
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

(typeof global === "undefined" ? window : global).Prism = Prism;
require("prismjs/components/prism-clike");
require("prismjs/components/prism-csharp");

const logStyles = [
	"color: #fff",
	"background-color: #444",
	"padding: 2px 4px",
	"border-radius: 2px"
].join(";");


function App() {
	// eslint-disable-next-line no-console, no-undef
	console.log('%c> Bienvenue dans mon monde!', logStyles);
	// eslint-disable-next-line no-console, no-undef
	console.log('%c> Fanatique du cosmos and de café,', logStyles);
	// eslint-disable-next-line no-console, no-undef
	console.log('%c> Je souhaite mettre à profit ma passion.', logStyles);
	// eslint-disable-next-line no-console, no-undef
	console.log('%c> Bonne visite!', logStyles);

	return (
		<>
			<ScrollToTop />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
