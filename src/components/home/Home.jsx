import About from "../about/About";
import Header from "../header/Header";
import Projects from "../projects/Projects";
import React from "react";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<About />
				<Projects />
			</main>
		</>
	);
}