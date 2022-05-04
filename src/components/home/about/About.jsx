import Photo from "../../../images/photo-gabrielle-michaud.jpg";
import React from "react";
import ScrollFade from "../../visual/scrollFade/ScrollFade";
import ZigZag from "../../visual/line/ZigZag";
import styles from "./About.module.scss";

export default function About() {
	return (
		<section className="main-section container grid centered" id="about" tag="section">
			<ScrollFade className="cell-6" tag="figure">
				<img alt="Gabrielle Michaud qui sourit" className={styles.img} src={Photo} />
			</ScrollFade>
			<ScrollFade className="cell-6" slide="left">
				<header>
					<span className="main-section-subtitle">Café, pieuvres et chats</span>
					<h2 className="main-section-title">
						À propos
						<ZigZag width={120} />
					</h2>
				</header>
				<p>Je suis une personne très ambitieuse qui souhaite apprendre et me dépasser. Je prime par dessous tout l&apos;organisation et le travail bien fait.</p>
				<p>Dans mes temps libres, j&apos;adore regarder des vidéos sur le cosmos et j&apos;ai une admiration particulière pour les pieuvres et leur capacité d&apos;apprentissage.</p>
				{/* <p>Le language de programmation que j&apos;ai le plus utilisé est le <code>javascript</code>. J&apos;ai également eu la chance de développer en utilisant du <code>PHP</code> et ai programmé Unity un jeu en <code>C#</code>. J&apos;ai également de l&apos;expérience avec les librairies <code>ReactJs</code>, <code>ThreeJs</code>, <code>SCSS</code> et <code>Bootstrap</code>. De plus, j&apos;ai utilisé des outils de versionnage tels que Github et Bitbucket et ai effleuré en surface les containers Docker.</p> */}
			</ScrollFade>
		</section>
	);
}