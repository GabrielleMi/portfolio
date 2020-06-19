import React, {useContext, useState} from 'react';
import './Contact.scss';
import LanguageContext from "../../contexts/LanguageContext";

const Contact = (props) => {
    const {lang} = useContext(LanguageContext);
    const [message, setMessage] = useState({ message: '', name: '', email: '' });
    const contactBtn = document.getElementById('contact-btn');

    const onChangeHandler = (e, field) => {
        setMessage(prevState => ({
            ...prevState,
            [field]: e.value
        }));

        if(checkIfValid()) {
            contactBtn.disabled = false;
        }
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const templateId = 'template_CuaCsmEl';

        sendFeedback(templateId,{message_html: message.message, from_name: message.name, reply_to: message.email})
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    function checkIfEmpty(string) {
        return (string === undefined || string === '' || string === null);
    }
    const checkIfValid = () => {
        return (validateEmail(message.email) && !checkIfEmpty(message.message) && !checkIfEmpty(message.name));
    }
    const sendFeedback = (templateId, variables) => {

        if(checkIfValid()) {
            contactBtn.classList.add('sending');
            contactBtn.innerHTML = (lang === 'fr' ? 'Envoi' : 'Sending');

            window.emailjs.send(
                'gmail', templateId,
                variables
            ).then(res => {
                setMessage(prevState => ({
                    ...prevState,
                    message: ''
                }));
                contactBtn.classList.remove('sending');
                contactBtn.innerHTML = (lang === 'fr' ? 'Envoyé &#x2713;' : 'Sent &#x2713;');
            }).catch(err => console.error('Une erreur est survenue :', err))
        }else{
            const openTag = '<aside '
            const openTagAtt = ' class="contact-form_warning" role="warning">';
            const closeTag = '</aside>';

            if(!validateEmail(message.email)){
                const warningId = 'email-warning';
                const warning = document.getElementById(warningId);
                const emailLabel = document.getElementById('email-label');
                const title = '<strong>' + (lang === 'fr' ? 'Adresse courriel invalide' : 'Email address not valid') + '</strong>';

                if(warning === null || warning === undefined){
                    emailLabel.innerHTML += openTag
                        + 'id="'+ warningId +'"'
                        + openTagAtt
                        + title
                        + '<p>'
                        + (lang === 'fr' ? ' Woops ! Il semblerait que l\'adresse courriel saisie n\'est pas valide.' : ' Woops ! An error occurred with the email field.')
                        + '</p>'
                        + closeTag;
                }
            }
            if(checkIfEmpty(message.name)){
                const warningId = 'name-warning';
                const warning = document.getElementById(warningId);
                const nameLabel = document.getElementById('name-label');
                const title = '<strong>' + (lang === 'fr' ? 'Erreur' : 'Error') + '</strong>';

                if(warning === null || warning === undefined){
                    nameLabel.innerHTML += openTag
                        + 'id="'+ warningId +'"'
                        + openTagAtt
                        + title
                        + '<p>'
                        + (lang === 'fr' ? ' Veuillez préciser votre identité.' : ' Please specify your identity.')
                        + '</p>'
                        + closeTag;
                }
            }
            if(checkIfEmpty(message.message)){
                const warningId = 'message-warning';
                const warning = document.getElementById(warningId);
                const messageLabel = document.getElementById('message-label');
                const title = '<strong>' + (lang === 'fr' ? 'Erreur' : 'Error') + '</strong>';

                if(warning === null || warning === undefined){
                    messageLabel.innerHTML += openTag
                        + 'id="'+ warningId +'"'
                        + openTagAtt
                        + title
                        + '<p>'
                        + (lang === 'fr' ? ' Veuillez écrire votre message.' : ' Please write your message.')
                        + '</p>'
                        + closeTag;
                }
            }
        }
    }
    return (
        <div className="light contact-sections">
            <form className="contact-form contact-section_item">
                <div className="contact-form_title">
                    <h2 className="title-darker">CONTACT</h2>
                    <h3>{lang === 'fr' ? 'Et si on prenait un café ?' : 'Want a cup of coffee?'}</h3>
                    <div className="separator-dash light"></div>
                </div>
                <div className="contact-form_group">
                    <input value={message.name} id="name" type="text" onChange={(e) => onChangeHandler(e.target, "name")}/>
                    <label id="name-label" htmlFor="name">{lang === 'fr' ? 'Qui êtes-vous ?' : 'What\'s your name?'}</label>
                </div>
                <div className="contact-form_group">
                    <input value={message.email} id="email" type="email" onChange={(e) => onChangeHandler(e.target, "email")}/>
                    <label id="email-label" htmlFor="email">{lang === 'fr' ? 'Courriel' : 'Email'}</label>
                </div>
                <div className="contact-form_group">
                    <textarea value={message.message} id="message" onChange={(e) => onChangeHandler(e.target, "message")}>

                    </textarea>
                    <label id="message-label" htmlFor="message">Message</label>
                </div>
                <button name='contact-btn_submit' id='contact-btn' onClick={(e) => onSubmitHandler(e)} type="submit" className="btn-square btn-square_light contact-form-btn">{lang === 'fr' ? 'Envoyer' : 'Send'}</button>
            </form>
            <div className="contact-sections_item">

            </div>
        </div>
    );
};

export default Contact;