import Album from "./album/Album";
import Btn from "../btn/Btn";
import CodeSnippet from "../codeSnippet/CodeSnippet";
import Header from "../header/Header";
import OtherProjects from "./otherProjects/OtherProjects";
import { PROJECTS_LIST } from "../projects/data/projectsData";
import React from "react";
import Tabs from "../tabs/Tabs";
import ZigZag from "../visual/line/ZigZag";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";

export default function Project() {
	const { id } = useParams();
	const theProject = PROJECTS_LIST[id];

	return (
		<>
			<Header subtitle={theProject.resume} title={theProject.title}>
				{theProject.header?.()}
			</Header>
			<main>
				<section className="container main-section">
					<article className="grid centered">
						<div className="cell-6">
							<h2 className="main-section-title">
								Description
								<ZigZag width={120} />
							</h2>
							<p>{theProject.desc}</p>
							{theProject.link && <Btn className={styles.link} color="dark" href={theProject.link.href} rel="noopener noreferrer" tag="a" target="_blank">{theProject.link.text} <i className="fa fa-arrow-up-right-from-square" /></Btn>}
							<section>
								<h3>Langages utilisés</h3>
								<ul>
									{theProject.languages.map((language) => (
										<li key={language}>{language}</li>
									))}
								</ul>
							</section>
							<section>
								<h3>Technologies utilisés</h3>
								<ul>
									{theProject.softwares.map((software) => (
										<li key={software}>{software}</li>
									))}
								</ul>
							</section>
						</div>
						<figure className="cell-6">
							{theProject.codeSnippets ?
								<Tabs
									tabs={theProject.codeSnippets.map((snippet) => ({
										content: <CodeSnippet code={snippet.code} language={snippet.language} />,
										id: `${snippet.fileName}-${snippet.language}`,
										name: snippet.fileName
									}))}
								/>
								:
								<img alt={theProject.title} src={theProject.preview} />
							}
						</figure>
					</article>
					{
						Array.isArray(theProject.album) && theProject.album.length > 0 &&
							<section>
								<h3>Gallerie d&apos;images</h3>
								<Album photos={theProject.album} />
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