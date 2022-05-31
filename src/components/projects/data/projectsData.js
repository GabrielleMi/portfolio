import Cinema1 from "../../../images/projects/cinema/album-1.jpg";
import Cinema2 from "../../../images/projects/cinema/album-2.jpg";
import Cinema3 from "../../../images/projects/cinema/album-3.jpg";
import CinemaPreview from "../../../images/projects/cinema/preview.jpg";
import KhimeraPreview from "../../../images/projects/khimera/preview.jpg";
import ProjectScene from "../../threeScene/components/ProjectScene";
import QualiaPreview from "../../../images/projects/qualia/preview.jpg";
import { door } from "./qualiaCodeExtract";

export const PROJECTS_LIST = {
	"cinema-portfolio": {
		album: [
			{
				alt: "Site Complet",
				src: Cinema1
			},
			{
				alt: "Site dans Photoshop",
				src: Cinema2
			},
			{
				alt: "Éléments graphiques dans Illustrator",
				src: Cinema3
			}
		],
		date: "2020",
		desc: "Ce projet a été créé afin de mettre en valeur les projets d'une photographe / designer. Puisqu'elle souhaitait mettre de l'avant son background en cinéma, le concept du portfolio a été construit autour de cet aspect.",
		languages: [ "Javascript", "SCSS" ],
		link: {
			href: "https://kathleenmichaud.github.io/Portfolio/",
			text: "Voir le site"
		},
		preview: CinemaPreview,
		resume: "Un projet web",
		shortDesc: "Portfolio développé en React.js.",
		softwares: [ "ReactJS", "HTML", "Photoshop", "Illustrator" ],
		title: "Cinéma Portfolio"
	},
	"jeu-qualia": {
		codeSnippets: [
			{
				code: door,
				fileName: "Door.cs",
				language: "csharp"
			},
			{
				code: door,
				fileName: "Door2.cs",
				language: "csharp"
			}
		],
		date: "2020",
		desc: "Ce jeu a été créé dans le cadre d'un cours de conception de jeu. Tous les éléments du jeu ont été créés et intégrés dans Unity par moi. La mécanique, quant à elle, se résume à pouvoir clôner le personnage et l'utiliser pour résoudre des puzzles générés procéduralement dans l'environnement.",
		header: ProjectScene,
		languages: ["C#"],
		link: {
			href: "https://github.com/GabrielleMi/qualia",
			text: "Voir sur github"
		},
		preview: QualiaPreview,
		resume: "Un jeu Unity",
		shortDesc: "Jeu de plateforme procédural dans Unity.",
		softwares: [ "Unity", "3ds Max", "Illustrator" ],
		title: "Jeu Qualia"
	},
	"khimera": {
		date: "2022",
		desc: "Ce site est en développement. Il est présentement produit dans l'objectif de permettre aux usagers de réserver en ligne tout en mettant de l'avant les produits de l'entreprise. Khimera est une entreprise de divertissements, qui souhaite pousser les limites de la technologie dans des jeux tels que les jeux d'évasion.",
		languages: [ "Javascript", "SCSS" ],
		preview: KhimeraPreview,
		resume: "Un projet web",
		shortDesc: "Site développé avec NextJS pour une entreprise de jeux d'évasion.",
		softwares: [ "NextJs", "Figma", "Docker", "HTML" ],
		title: "Site Khimera"

	}
};