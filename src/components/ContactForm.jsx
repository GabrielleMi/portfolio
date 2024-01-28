import { useState, useRef, useEffect } from "react";
import { string } from "yup";

const INIT_MSG = {
    id: 'init',
    isUser: false,
    isError: false,
    content: (
        <>
            <p>Bonjour!</p>
            <p>Laissez-moi un message et nous pourrons aller discuter autour d'un délicieux café. ☕</p>
            <p>Quel est votre nom?</p>
        </>
    )
};

const EMAIL_STEPS_DATA = {
    steps: [ "name", "email", "message" ],
    data: {
        email: {
            inputProps: {
                placeholder: "Votre courriel",
                type: "email"
            },
            schema: string().email(
                <>
                    <p>Oops! 🫣 L'email ne semble pas valide.</p>
                    <p>Veuillez réessayer.</p>
                </>
            ),
            answer: () => (
                <>
                    <p>Parfait! Laissez-moi un message et je pourrai vous recontacter.</p>
                </>
            )
        },
        name: {
            inputProps: {
                placeholder: "Votre nom"
            },
            schema: string(),
            answer: (props) => (
                <>
                    <p>Enchantée, {props.input}!</p>
                    <p>À quel courriel puis-je vous contacter ?</p>
                </>
            )
        },
        message: {
            inputProps: {
                placeholder: "Votre message"
            },
            schema: string(),
            answer: (props) => (
                <>
                    <p>Merci, votre message a bien été envoyé!</p>
                    <p>Je vous répondrai dès ma deuxième gorgée de café.</p>
                </>
            )
        }
    }
}

const generateId = () => Date.now();

const ContactForm = () => {
    const timeout = useRef();
    const [ isTyping, setIsTyping ] = useState(false);
    const [ messages, setMessages ] = useState([ INIT_MSG ]);

    const [ email, setEmail ] = useState({
        step: EMAIL_STEPS_DATA.steps[0],
        email: "",
        name: "",
        message: "",
    });
    const [ input, setInput ] = useState("");
    const stepData = EMAIL_STEPS_DATA.data[email.step] || {};

    const handleOnInput = (e) => {
        setInput(e.target.value);
    }

    const scheduleMessage = (message) => {
        setIsTyping(true);
        timeout.current = setTimeout(() => {
            setMessages((prev) => [ ...prev, message ]);
            setIsTyping(false);
        }, 1000);
    }

    const validateMessage = async () => {
        setMessages((prev) => (
            [
                ...prev,
                {
                    id: generateId(),
                    isUser: true,
                    content: input
                }
            ]
        ));

        (stepData.schema || string()).validate(input)
            .then(() => {
                const Answer = stepData.answer;
                const currentStep = EMAIL_STEPS_DATA.steps.findIndex((step) => step === email.step);

                if(Answer) {
                    scheduleMessage({
                        id: 'answer' + generateId(),
                        isUser: false,
                        content: <Answer input={input} />
                    });
                
                }
                
                setEmail((prev) => ({
                    ...prev,
                    step: EMAIL_STEPS_DATA.steps[currentStep + 1],
                    [email.step]: input
                }));

                setInput("");
            })
            .catch((e) => {
                scheduleMessage({
                    id: generateId(),
                    isUser: false,
                    isError: true,
                    content: e.message,
                });
                setInput("");
            })
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        }
    }, [])

    return (
        <form
            className="contact-form shadow-xl rounded-lg bg-primary-800 relative flex flex-col"
            
        >
            <ul className="p-4 text-sm flex flex-col gap-1">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        isRight={message.isUser}
                        className={
                            message.isUser ?
                                "bg-gradient-to-tr from-blue-200 to-blue-300 dark:from-blue-400 dark:to-blue-500"
                                :
                                message.isError ?
                                    "bg-gradient-to-tl from-red-200 to-red-300 dark:from-red-400 dark:to-red-500"
                                    :
                                    "bg-gradient-to-tr bg-primary-700"
                        }
                    >
                        {message.content}
                    </ChatMessage>
                ))}
                {isTyping &&
                    <ChatMessage className="bg-primary-700">
                        <i className="loading-dots" />
                    </ChatMessage>
                }
            </ul>
            <fieldset className="m-4 flex mt-auto">
                <input
                    name="message"
                    id="message"
                    autoComplete="new-password"
                    onChange={handleOnInput}
                    value={input}
                    type="text"
                    {...stepData.inputProps}
                    onKeyDown={(e) => {
                        if(e.code == "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            if(input) {
                                validateMessage();
                            }
                        }
                    }}
                    className="w-full shadow px-2 rounded-lg bg-primary-700"
                />
                <button
                    id="send-message-btn"
                    type="button"
                    aria-label="Envoyer"
                    disabled={!input}
                    className="fa-solid fa-paper-plane p-2 enabled:cursor-pointer disabled:opacity-50 enabled:hover:text-highlight transition-colors"
                    onClick={validateMessage}
                />
            </fieldset>
            <button
                type="button"
                aria-controls="contact"
                id="contact-close"
                className="fa-solid text-2xl text-slate-950 dark:text-slate-200 fa-circle-xmark absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
            />
        </form>
    )
}

const ChatMessage = ({ isRight, className, ...props}) => {
    return (
        <li
            {...props}
            className={
                (className ? `${className} ` : "") +
                "p-2 rounded-t-xl shadow" +
                (isRight ? " rounded-bl-xl ml-2" : " mr-2 rounded-br-xl")
            }
        />
    )
}

export default ContactForm;