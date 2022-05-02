import Cinema1 from "../../images/projects/cinema/album-1.jpg";
import Cinema2 from "../../images/projects/cinema/album-2.jpg";
import Cinema3 from "../../images/projects/cinema/album-3.jpg";
import CinemaPreview from "../../images/projects/cinema/preview.jpg";
import QualiaPreview from "../../images/projects/qualia/preview.jpg";

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
		desc: "Ce projet a été créé afin de mettre en valeur les projets d'une photographe / designer. Puisqu'elle souhaitait mettre de l'avant son background en cinéma, le concept du portfolio a été construit autour de cet aspect.",
		languages: ["Javascript"],
		preview: CinemaPreview,
		resume: "Un projet web",
		site: "https://kathleenmichaud.github.io/Portfolio/",
		softwares: [ "ReactJS", "HTML", "CSS", "Photoshop", "Illustrator" ],
		title: "Cinéma Portfolio"
	},
	"jeu-qualia": {
		desc: "Ce jeu a été créé dans le cadre d'un cours de conception de jeu. Tous les éléments du jeu ont été créés et intégrés dans Unity par moi. La mécanique, quant à elle, se résume à pouvoir clôner le personnage et l'utiliser pour résoudre des puzzles dans l'environnement.",
		languages: ["C#"],
		preview: QualiaPreview,
		resume: "Un jeu Unity",
		softwares: [ "Unity", "3ds Max", "Illustrator" ],
		title: "Jeu Qualia"
	},
	"khimera": {
		desc: "Ce site est en développement. Il est présentement produit dans l'objectif de permettre aux usagers de réserver en ligne tout en mettant de l'avant les produits de l'entreprise. Khimera est une entreprise de divertissements, qui souhaite pousser les limites de la technologie dans des jeux tels que les jeux d'évasion.",
		languages: ["Javascript"],
		preview: "",
		resume: "Un projet web",
		softwares: [ "ThreeJS", "NextJs", "Figma", "Docker", "HTML", "SCSS" ],
		title: "Site Khimera"

	}
};