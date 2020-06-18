import React, {Component} from 'react';
import './App.scss';
import {Contact, Projects} from './components/index.js';
import {Redirect, Route, Switch} from "react-router-dom";
import {Home, ProjectDetails} from "./components";

class App extends Component {
    constructor(props) {
        super(props);
        this.listLinks = [
            {name: {
                    fr: 'À propos',
                    en: 'About'
                }, url:'#about'},
            {name: {
                    fr: 'Projets',
                    en: 'Projects'
                }, url:'#projects'},
            {name: {
                    fr: 'Contact',
                    en: 'Contact'
                }, url:'#contact'}
        ];
        this.allProjects = [
            {
                id: 'web-design-cinema',
                name: {
                    fr: 'Maquette graphique',
                    en: 'Graphic design : template' },
                date: {
                    fr: 'Mars 2020',
                    en: 'March 2020',
                },
                description: {
                    fr:'Maquette graphique, version bureau, créée pour une jeune femme diplômée en cinéma. Celle-ci souhaitait se monter un portfolio "flyé" qui se démarque par' +
                        ' son côté conceptuel. Il était demandé de créer une maquette avec de multiples références à ses films et réalisateurs' +
                        ' préférés.',
                    en:'Template designed for a young woman who graduated from a cinema program. She asked for a fun and dynamic portfolio that reflects her favorites movies and her favorite filmmakers.' },
                software : ['Adobe Illustrator', 'Adobe Photoshop'],
                skills : {
                    fr : ['Design graphique', 'UI'],
                    en : ['Graphic design', 'UI']
                },
                photo: 'cinema',
                theme: {
                    text: 'light',
                    color: '#b3260f'
                },
            },
            {
                id: 'web-cinq14',
                name: {
                    fr: 'Boutique en ligne',
                    en: 'Online shop' },
                date: {
                    fr: 'Février 2019',
                    en: 'February 2019',
                },
                description: {
                    fr:'Site web développé par moi et deux autres personnes en Wordpress à partir du thème Bridge. Je m\'occupais de l\'aspect graphique et front-end, tandis que mes coéquipiers' +
                        ' s\'occupaient du backend et du SEO.',
                    en:'Website I developed with Bridge, a Wordpress theme, with the help of two other people. I was the designer and front-end developer, while my coworkers were in charge of the SEO and backend of the website.' },
                software : ['Adobe Illustrator', 'Adobe Photoshop', 'Wordpress', 'Woocommerce', 'CSS', 'HTML', 'PHP', 'jQuery'],
                skills : {
                    fr : ['Design graphique', 'UI', 'UX', 'Communication', 'SEO', 'Travail d\'équipe'],
                    en : ['Graphic design', 'UI', 'UX', 'Communication', 'SEO', 'Teamwork']
                },
                photo: 'cinq14',
                theme: {
                    text: 'light',
                    color: '#1e1c1d'
                },
            },
            {
                id: 'qualia',
                name: {
                    fr: 'Qualia',
                    en: 'Qualia' },
                date: {
                    fr: 'Mai-juin 2020',
                    en: 'May-June 2020',
                },
                description: {
                    fr:'Jeu vidéo produit pour un projet synthèse de fin de DEC fait en 1 mois et demi. Il s\'agit d\'un plateformer sidescroller en 3D, dans lequel il est nécessaire de se cloner pour' +
                        ' progresser dans les puzzles. Des sections du jeu sont générées de façon procédurale pour augmenter la rejouabilité. Tous les éléments visuels, mis à part les shaders, ont été produits par mes soins.',
                    en:'Video game made for a synthesis project, made in one and a half month. It\' a 3D sidescroller plateformer, in which the player has to clone the main character to resolve the puzzles. Some sections ' +
                        'of the games are using procedurale generation to increase the replay value. All visuals elements, ' +
                        'except the shaders, were made by me.' },
                software : ['3ds Max', 'Unity', 'C#', 'Photoshop', 'Illustrator', 'After Effects', 'Modifications HLSL'],
                skills : {
                    fr : ['Design graphique', 'Modélisation 3D', 'Conception de jeu', 'UI'],
                    en : ['Graphic design', '3D', 'Game Design', 'UI']
                },
                photo: 'qualia',
                theme: {
                    text: 'light',
                    color: '#162a30'
                },
            },
            {
                id: 'web-design-agrotourism',
                name: {
                    fr: 'Prototype fictif',
                    en: 'Hypothetical prototype' },
                date: {
                    fr: 'Novembre 2019',
                    en: 'November 2019',
                },
                link: 'http://etudiant-tim.cstj.qc.ca/1184188/agrotourisme/',
                description: {
                    fr:'Prototype qui a été créé dans le cadre d\'un cours de design web. Les icônes sont tirées de Flaticon et les photos de Unsplash.com. Les maquettes ont d\'abord été' +
                        ' faites dans Photoshop, puis reconstruites dans le logiciel Axure RP pour faire un prototype de l\'interactivité.',
                    en:'Prototype I had to develop in a web design class. The icons are from Flaticon and the pictures are from Unsplash.com. The templates were made first in Photoshop,' +
                        ' then incorporated into a prototype made with Axure RP for the interactivity.' },
                software : ['Adobe Illustrator', 'Adobe Photoshop', 'Axure RP'],
                skills : {
                    fr : ['Design graphique', 'UI', 'Prototypage'],
                    en : ['Graphic design', 'UI', 'Prototyping']
                },
                photo : 'agrotourism',
                theme: {
                    text: 'light',
                    color:'#1a1a1a'
                },
            }
        ];
    }
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/project/:id" render={(props) => <ProjectDetails {...props} allProjects={this.allProjects} />}/>
                    <Route path="/" render={(props) => <Home {...props} allProjects={this.allProjects} />}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        );
    }

}
export default App;
