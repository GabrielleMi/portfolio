import React, {useContext} from 'react';
import LanguageContext from "../../../contexts/LanguageContext";
import './Project.scss';
import {Slide} from "react-reveal";
import {Link} from "react-router-dom";

const Project = ({title, description, softwares, photo, theme, id}) => {
    const {lang} = useContext(LanguageContext);

    return (
        <div className="project-preview">
            <Link to={`/project/${id}`}>
                <Slide left>
                    <img className="project-preview_img" src={process.env.PUBLIC_URL + `/img/${photo}-preview.jpg`} alt={`Preview ${title[lang]}`}/>
                </Slide>
            </Link>
        </div>
    );
};

export default Project;