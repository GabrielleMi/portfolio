import React, {useContext} from 'react';
import Project from './Project/Project';
import LanguageContext from "../../contexts/LanguageContext";
import './Projects.scss';

const Projects = (props) => {
    const {lang} = useContext(LanguageContext);
    const allProjects = props.allProjects;

    return (
        <div className="project-previews">
            {allProjects.map((project, i) => {
                return(
                     <Project key={i} title={project.name} description={project.description} softwares={project.software} photo={project.photo} theme={project.theme} id={project.id}/>
                );
            })}
        </div>
    );
};

export default Projects;