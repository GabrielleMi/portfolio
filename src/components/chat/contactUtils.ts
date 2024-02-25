import { MILLISECONDS_PER_SECOND, SECONDS_PER_MINUTE } from "../../helpers/constants";
import { string } from "yup";

export const generateId = () => Date.now();

export const MESSAGE_ROLE_USER = "user";
export const MESSAGE_ROLE_ASSISTANT = "assistant";

export const EMAIL_STEPS_DATA = {
    data: {
        email: {
            answer: () => "Parfait! Laissez-moi un message et je pourrai vous recontacter.",
            inputProps: {
                placeholder: "Votre courriel",
                type: "email"
            },
            schema: string().email(`Oops! 🫣 L'email ne semble pas valide.\n Veuillez réessayer.`)
        },
        message: {
            answer: () => `Merci, votre message a bien été envoyé!\n Je vous répondrai dès ma deuxième gorgée de café.`,
            inputProps: {
                placeholder: "Votre message"
            },
            schema: string()
        },
        name: {
            answer: (props) => `Enchantée, ${props.input}!\nÀ quel courriel puis-je vous contacter?`,
            inputProps: {
                placeholder: "Votre nom"
            },
            schema: string()
        }
    },
    steps: [ "name", "email", "message" ]
};

export const MODE_CONTACT = "Contact";
export const MODE_DISCUSS = "Discuter";
export const CMD_CANCEL = "annuler";
export const INIT_EMAIL = {
    email: "",
    message: "",
    name: "",
    step: ""
};

export const splitIntoParagraphs = (content: string, avgLength = 200) => {
    return content.split(' ').reduce((split, word) => {
        const lastParagraph = split[split.length - 1];
        if(lastParagraph.length < avgLength || !lastParagraph.endsWith(".")) {
            split[split.length - 1] = `${lastParagraph} ${word}`.trim();
        } else {
            split.push(word);
        }

        return split;
    }, [""]);
};

export const getReadingSimulationTime = (content: string, wpm = 200) => {
    const words = content.split(' ');
    const msPerWord = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE / wpm;

    return words.length * msPerWord;
};