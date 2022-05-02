import Photo from "../../images/photo-gabrielle-michaud.jpg";
import React from "react";
import styles from "./About.module.scss";

export default function About() {
	return (
		<section className="main-section container grid centered" id="about">
			<figure className="cell-6">
				<img alt="Gabrielle Michaud qui sourit" className={styles.img} src={Photo} />
			</figure>
			<div className="cell-6">
				<header>
					<span className="main-section-subtitle">Café, pieuvres et chats</span>
					<h2 className="main-section-title">À propos</h2>
				</header>
				<p>Je suis une personne très ambitieuse qui souhaite apprendre et me dépasser. Je prime par dessous tout l&apos;organisation et le travail bien fait.</p>
				<p>Dans mes temps libres, j&apos;adore regarder des vidéos sur le cosmos et j&apos;ai une admiration particulière pour les pieuvres et leur capacité d&apos;apprentissage.</p>
				<p>Il m&apos;est quasi impossible de fonctionner sans une tasse de café le matin.</p>
				<p>Le language de programmation que j&apos;ai le plus utilisé est le <strong>javascript</strong>. J&apos;ai également eu la chance de développer en utilisant du <strong>PHP</strong> et ai programmé un jeu en <strong>C#</strong>. J&apos;ai également de l&apos;expérience avec les librairies <strong>ReactJs</strong>, <strong>ThreeJs</strong>, <strong>SCSS</strong> et <strong>Bootstrap</strong>. De plus, j&apos;ai utilisé des outils de versionnage tels que Github et Bitbucket et ai effleuré en surface les containers Docker.</p>
			</div>
		</section>
	);
}