import "./styles/globals.scss";
import Footer from './components/footer/Footer';
import { Outlet } from "react-router-dom";
import React from 'react';

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
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
