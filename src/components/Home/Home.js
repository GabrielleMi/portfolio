import React, {Component} from 'react';
import '../../App.scss';
import {ThreeScene, Header, ScrollLine, Contact, Projects, Showreel} from '../index.js';
import { HashLink as Link } from 'react-router-hash-link';
import Fade from 'react-reveal/Fade.js';
import LanguageContext from "../../contexts/LanguageContext";
import {Slide} from "react-reveal";
import Wave from "../Icons/Wave";

class Home extends Component {
    static contextType = LanguageContext;

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
        this.allProjects = props.allProjects;
    }
    componentDidMount() {
        const cover = document.getElementById("contact-cover");
        const svgWater = document.getElementById("svg-water");
        const mutationObserver = new MutationObserver(function(mutations) {
            addWaterAnim();
            mutationObserver.disconnect();
        });
        const addWaterAnim = () => {
            svgWater.classList.add("wave-svg-animate");
        }
        mutationObserver.observe(cover, {
            attributes: true,
            attributeFilter: ["style"]
        });
        this.getPercentPos = this.getPercentPos.bind(this);
        this.scrolling = this.scrolling.bind(this);
        // Pour la scrollbar custom
        window.addEventListener('scroll', this.scrolling);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrolling);
    }
    getPercentPos(elm){
        let p = elm.parentNode,
            result = (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
        return result
    }
    scrolling() {
        const section = document.querySelectorAll(".section");
        const previews = document.querySelectorAll('.project-preview_img');
        let sections = {};
        let i = 0;
        const scrollLine = document.getElementById('scroll');
        const sectionContact = document.getElementById('contact');
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        let percentPos = this.getPercentPos(document.body);
        Array.prototype.forEach.call(section, function(e) {sections[e.id] = e.offsetTop;});

        scrollLine.style.top = percentPos + '%';

        for (i in sections) {
            if (sections[i] <= scrollPosition + 30) {
                document.querySelector('.active').setAttribute('class', ' ');
                document.querySelector('.main-nav a[href*=' + i + ']').setAttribute('class', 'active');
            }
        }

        if(scrollPosition >= sectionContact.offsetTop - 30) {
            // mettre header en light
            document.getElementById('main-nav').classList.add('light');
            document.getElementById('scroll-bar').classList.add('light');
        }else {
            document.getElementById('main-nav').classList.remove('light');
            document.getElementById('scroll-bar').classList.remove('light');
        }
    }
    render() {
        const {lang} = this.context;

        return (
            <div className="App">
                <Header links={this.listLinks}/>
                <ScrollLine/>
                <header>
                    <section className="block section" id="home">
                        <div className="block-inner">
                            <Slide left delay={1000} duration={2000}>
                                <div className="block-inner_bg"></div>
                            </Slide>
                            <div className="block-inner_content">

                            </div>
                        </div>
                    </section>
                </header>
                <main>
                    <ThreeScene/>
                    <section className="block section" id="about">
                        <div className="block-inner">
                            <div className="block-inner_content">
                                <div className="block-inner_content-right">
                                    <Slide left delay={200} duration={1000}>
                                        <div className="photo-about">
                                            <img className='photo-about_original' src={process.env.PUBLIC_URL + "/img/photo-gabrielle-michaud.jpg"} alt='Gabrielle Michaud'/>
                                            <img className='photo-about_hover' src={process.env.PUBLIC_URL + "/img/dessins-gabrielle-michaud.jpg"} alt='Gabrielle Michaud Doodles'/>
                                            <span className="photo-about_text"><span>hover me</span></span>
                                        </div>
                                    </Slide>
                                </div>
                                <div className="block-inner_content-left">
                                    <h2>
                                        <Fade bottom>
                                            <span className="title-light multi">MULTI</span>
                                        </Fade>
                                        <Fade bottom delay={200}>
                                            <br/>
                                            <span>M{lang === 'fr' ? 'É' : 'E'}DIA</span>
                                        </Fade>
                                    </h2>
                                    <Fade left delay={500}>
                                        <div className="separator-dash"></div>
                                    </Fade>
                                    <Fade left delay={800}>
                                        <h4> { lang === 'fr' ? "À propos" : "About" }</h4>
                                        { lang === 'fr' ?
                                            <p>Passionnée par la technologie, je suis une finissante en techniques d'Intégration Multimédia qui été charmée par les différentes facettes du multimédia.
                                                Le <strong>graphisme</strong>, la <strong>3D</strong> et le <strong>développement web</strong> sont les trois aspects dans lesquels j’ai décidé de pousser plus loin.
                                                Mon objectif est d’apprendre et de m’améliorer constamment. Dans mes temps libres, j'aime pratiquer la photographie, faire des randonnées, et suivre des cours de MMA.
                                                Et j'adore le café.</p>
                                            :
                                            <p>I was charmed by the many facets of multimedia. <strong>Graphic Design</strong>, <strong>3D modelling</strong> and <strong>web development</strong> are the three aspects I've fallen in love with.
                                                My objective is to always become a better version of myself, to learn and to improve. In my spare time, I like to photograph my surroundings, go hiking and
                                                learn MMA techniques. But most of all, I'm a coffee lover.</p>
                                        }
                                        <h4> { lang === 'fr' ? "Ce que je connais" : "What I learned so far" }</h4>
                                        <p>Photoshop, Illustrator, InDesign, After Effects, Unity, 3ds Max, Javascript/jQuery, C#, React, CSS/SASS.</p>
                                        <br/>
                                    </Fade>
                                    <Fade left delay={1500}>
                                        <Link className="btn-square" smooth to="#projects">{lang==='fr' ? 'PROJETS' : 'PROJECTS'}</Link>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="block-fluid section" id="projects">
                        <div className="block-inner">
                            <h2>
                                Projets
                            </h2>
                            <Fade left>
                                <div className="separator-dash"></div>
                            </Fade>
                            <Showreel />
                            <Projects allProjects={this.allProjects} />
                        </div>
                    </section>
                    <section className="block section" id="contact">
                        <Slide bottom duration={2000} delay={1000}>
                            <div className="contact-cover water-fill" id="contact-cover">
                                <Wave />
                            </div>
                        </Slide>
                        <div className="block-inner">
                            <div className="block-inner_content">
                                <Fade delay={2000}>
                                    <Contact/>
                                </Fade>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }

}
export default Home;
