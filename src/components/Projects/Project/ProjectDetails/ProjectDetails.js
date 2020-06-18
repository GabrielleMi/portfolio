import React, {useContext} from 'react';
import LanguageContext from "../../../../contexts/LanguageContext";
import './ProjectDetails.scss';
import {Link} from "react-router-dom";
import {Slide} from "react-reveal";

const ProjectDetails = (props) => {
    const {lang} = useContext(LanguageContext);
    const allProjects = props.allProjects;
    const projectId = props.match.params.id;
    const project = allProjects.find(project => project.id === projectId);

    const checkIfLink = () => {
        const link = project.link;
        if(link !== null && link !== undefined && link !== '') {
            return(
                <a href={project.link} target='_blank' rel="noopener noreferrer" className="btn-square btn-square_light contact-form-btn">{lang === 'fr' ? 'Visiter' : 'Check'}</a>
            )
        }
    };
    return (
            <div className={`project-details ${project?.theme?.text}`}>
                <div>
                    <Slide left delay={500}>
                        <div className="project-details_info" style={{backgroundColor: project?.theme?.color}}>
                            <Slide left delay={750}>
                                <Link to='/#projects' className="back-btn">
                                    <div className="project-details_back"><div className="back-btn_arrow"></div></div>
                                </Link>
                                <div>
                                    <div className='project-details_date'>{project?.date[lang]}</div>
                                    <h3>{project?.name[lang]}</h3>
                                    <div className="separator-dash light"></div>
                                    <h4>Description</h4>
                                    <p>{project?.description[lang]}</p>
                                    <h4>{lang=== 'fr' ? 'Compétences' : 'Skills'}</h4>
                                    <ul className='project-details_info-list'>
                                        {project?.skills[lang].map((skill, i) => {
                                            return(
                                                <li key={i}>{skill}</li>
                                            );
                                        })}
                                    </ul>
                                    <h4>{lang=== 'fr' ? 'Logiciels et langages' : 'Softwares and languages'}</h4>
                                    <ul className='project-details_info-list'>
                                        {project?.software?.map((software, i) => {
                                            return(
                                                <li key={i}>{software}</li>
                                            );
                                        })}
                                    </ul>
                                    {checkIfLink()}
                                </div>
                            </Slide>
                        </div>
                    </Slide>
                    <Slide left>
                        <div className="project-details_img">
                            <img src={`/img/${project?.photo}-1.jpg`} alt={`${project?.photo} 1`}/>
                            <img src={`/img/${project?.photo}-2.jpg`} alt={`${project?.photo} 2`}/>
                        </div>
                    </Slide>
                </div>
            </div>
    );
};

export default ProjectDetails;