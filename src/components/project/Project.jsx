import Album from "./album/Album";
import Header from "../header/Header";
import OtherProjects from "./otherProjects/OtherProjects";
import { PROJECTS_LIST } from "../projects/projectsData";
import React from "react";
import { useParams } from "react-router-dom";

export default function Project() {
	const { id } = useParams();
	const selectedProject = PROJECTS_LIST[id];

	return (
		<>
			<Header subtitle={selectedProject.resume} title={selectedProject.title} />
			<main>
				<section className="container main-section">
					<article className="grid centered">
						<div className="cell-6">
							<h2 className="main-section-title">Description</h2>
							<p>{selectedProject.desc}</p>
							{selectedProject.site && <a className="link" href={selectedProject.site} rel="noopener noreferrer" target="_blank">Voir le site <i className="fa fa-arrow-up-right-from-square" /></a>}
							<section>
								<h3>Langages utilisés</h3>
								<ul>
									{selectedProject.languages.map((language) => (
										<li key={language}>{language}</li>
									))}
								</ul>
							</section>
							<section>
								<h3>Technologies utilisés</h3>
								<ul>
									{selectedProject.softwares.map((software) => (
										<li key={software}>{software}</li>
									))}
								</ul>
							</section>
						</div>
						<figure className="cell-6">
							<img alt={selectedProject.title} src={selectedProject.preview} />
						</figure>
					</article>
					{
						Array.isArray(selectedProject.album) && selectedProject.album.length > 0 &&
							<section>
								<h3>Gallerie d&apos;images</h3>
								<Album photos={selectedProject.album} />
							</section>
					}
				</section>
				<OtherProjects
					projects={
						Object.entries(PROJECTS_LIST)
							.reduce((otherProjects, [ key, val ]) => {
								if(key !== id) {
									otherProjects.push({
										id: key,
										...val
									});
								}

								return otherProjects;
							}, [])
					}
				/>
			</main>
		</>
	);
}