import About from "../about/About";
import Btn from "../btn/Btn";
import Header from "../header/Header";
import Projects from "../projects/Projects";
import React from "react";

export default function Home() {
	return (
		<>
			<Header>
				<Btn color="dark" type="button">Projets</Btn>
			</Header>
			<main>
				<About />
				<Projects />
			</main>
		</>
	);
}