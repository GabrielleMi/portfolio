import {
    CMD_CANCEL,
    EMAIL_STEPS_DATA,
    INIT_EMAIL,
    MESSAGE_ROLE_ASSISTANT,
    MESSAGE_ROLE_USER,
    MODE_CONTACT, MODE_DISCUSS,
    generateId,
    getReadingSimulationTime,
    splitIntoParagraphs
} from "./contactUtils";
import { Fragment, useEffect, useRef, useState } from "react";
import { delay, isEqualCi } from "../../helpers/utils";
import { ENTER_KEY } from "../../helpers/constants";
import { fetchMessage } from "../../api/openAi";
import { string } from "yup";

function ChatMessage({ className, isRight, ...props }) {
    return (
        <li
            {...props}
            className={
                (className ? `${className} ` : "")
                + "p-2 rounded-t-xl shadow "
                + (isRight ? "rounded-bl-xl ml-2" : "mr-2 rounded-br-xl")
            }
        />
    );
}

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {MESSAGE_ROLE_ASSISTANT|MESSAGE_ROLE_USER} role
 * @property {string} content
 * @property {boolean} [isError]
 */

export default function ContactForm() {
    const timeout = useRef();
    const [ mode, setMode ] = useState("");
    const [ isTyping, setIsTyping ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ email, setEmail ] = useState(INIT_EMAIL);
    const [ input, setInput ] = useState("");
    const [ isLocked, setIsLocked ] = useState(false);
    const [ hasResetOnce, setHasResetOnce ] = useState(false);

    const stepData = EMAIL_STEPS_DATA.data[email.step] || {};

    const handleOnInput = (e) => {
        setInput(e.target.value);
    };

    const resetChat = () => {
        setHasResetOnce(true);
        setMessages([]);
        setIsLocked(false);
        setEmail(INIT_EMAIL);
        setInput("");
        setMode("");
    };

    /**
     * Schedule a message to simulates typing.
     * @param {Message} message
     * @returns {Promise}
     */
    const scheduleAddMessage = (message) => {
        setIsTyping(true);

        const MS_PER_CHAR = 15;

        return new Promise((resolve) => {
            clearTimeout(timeout.current);
            const typingTime = message.content.length * MS_PER_CHAR;
            timeout.current = setTimeout(() => {
                setMessages((prev) => [ ...prev, message ]);
                setIsTyping(false);
                resolve();
            }, typingTime);
        });
    };

    /**
     * @param {Message} msg
     */
    const addMessage = (msg) => {
        setMessages((prev) => [ ...prev, msg ]);
    };

    const readMessage = (msgContent) => {
        const readingTime = getReadingSimulationTime(msgContent);

        return delay(readingTime);
    };

    /**
     * @param {string} newMode
     * @param {string} msgContent
     * @param {boolean} showCmd
     */
    const toggleMode = (newMode, msgContent, showCmd = false) => {
        setMode(newMode);


        if(newMode && showCmd) {
            addMessage({ content: newMode, id: generateId(), role: MESSAGE_ROLE_USER });
        }

        scheduleAddMessage({
            content: msgContent,
            id: `answer${generateId()}`,
            role: MESSAGE_ROLE_ASSISTANT
        });
    };

    const toggleContact = (showCmd = false) => {
        setEmail((prev) => ({ ...prev, step: EMAIL_STEPS_DATA.steps[0] }));
        toggleMode(
            MODE_CONTACT,
            "Ça me fait plaisir! Pour me contacter, commençons par se présenter. Quel est votre nom?",
            showCmd
        );
    };

    const proceedWithContact = () => {
        (stepData.schema || string())
            .validate(input)
            .then(() => {
                const currentStep = EMAIL_STEPS_DATA.steps.findIndex((step) => step === email.step);

                if(stepData.answer) {
                    scheduleAddMessage({
                        content: stepData.answer({ input }),
                        id: `answer${generateId()}`,
                        role: MESSAGE_ROLE_ASSISTANT
                    });
                }

                setEmail((prev) => ({
                    ...prev,
                    step: EMAIL_STEPS_DATA.steps[currentStep + 1],
                    [email.step]: input
                }));

            })
            .catch((e) => {
                console.error(e);
                scheduleAddMessage({
                    content: e.message,
                    id: generateId(),
                    isError: true,
                    role: MESSAGE_ROLE_ASSISTANT
                });
            })
            .finally(() => {
                setInput("");
            });
    };

    /**
     * @param {Message} msg
     */
    const proceedWithDiscuss = (msg) => {
        // Prevent abuse
        // Offer a refresh option
        setIsTyping(true);
        setInput("");
        fetchMessage({ messages: [{ content: msg, role: MESSAGE_ROLE_USER }] })
            .then(async (res) => {
                const responseMessage = res.choices[0].message;
                const toolCalls = responseMessage.tool_calls || [];
                const toolContact = toolCalls.find((tool) => isEqualCi(tool.function.name, MODE_CONTACT));

                if(toolContact) {
                    toggleContact();

                    return;
                }

                const content = responseMessage.content;
                const paragraphs = splitIntoParagraphs(content || "");

                for(let i = 0; i < paragraphs.length; i++) {
                    const paragraph = paragraphs[i];
                    const fullMessage = {
                        content: paragraph,
                        id: res.id + i,
                        role: MESSAGE_ROLE_ASSISTANT
                    };

                    if(i === 0) {
                        addMessage(fullMessage);
                    } else {
                        await scheduleAddMessage(fullMessage);
                    }
                }
            })
            .catch((e) => {
                console.error(e);
                addMessage({
                    content: "Désolée, une erreur est survenue. Veuillez réessayer plus tard ou me contacter directement: gabrielle.mi@hotmail.com.",
                    id: generateId(),
                    isError: true
                });
                setIsLocked(true);
            })
            .finally(() => {
                setIsTyping(false);
            });
    };

    /**
     * @param {string} msgContent
     */
    const validateMessage = async (msgContent) => {
        addMessage({
            content: msgContent,
            id: generateId(),
            role: MESSAGE_ROLE_USER
        });

        if(mode === MODE_CONTACT) {
            await readMessage(msgContent);

            if(isEqualCi(msgContent, CMD_CANCEL)) {
                toggleMode("", "Pas de problème! De quoi voulez-vous jaser?");
                setEmail(INIT_EMAIL);
            } else {
                proceedWithContact();
            }

            return;
        }

        if(isEqualCi(msgContent, MODE_CONTACT)) {
            toggleContact();
        } else {
            setMode(MODE_DISCUSS);
            proceedWithDiscuss(input);
        }

    };

    const toggleDiscussion = (showCmd = false) => {
        toggleMode(
            MODE_DISCUSS,
            "Très certainement! Je serais ravie de faire votre connaissance. De quoi avez-vous envie de parler?",
            showCmd
        );
    };

    const cancelContact = () => {
        validateMessage(CMD_CANCEL);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        };
    }, []);

    return (
        <form
            className="contact-form shadow-xl rounded-lg bg-primary-800 relative flex flex-col"
        >
            <ul className="p-4 text-sm flex flex-col gap-1">
                <ChatMessage className="bg-gradient-to-tr bg-primary-700">
                    <p>Bonjour!</p>
                    <p>Laissez-moi un message et nous pourrons aller discuter autour d&apos;un délicieux café. ☕</p>
                </ChatMessage>
                {messages.map((message, i) => (
                    <Fragment key={message.id}>
                        <ChatMessage
                            className={
                                message.role === MESSAGE_ROLE_USER ?
                                    "bg-gradient-to-tr from-blue-200 to-blue-300 dark:from-blue-400 dark:to-blue-500"
                                    :
                                    message.isError ?
                                        "bg-gradient-to-tl from-red-200 to-red-300 dark:from-red-400 dark:to-red-500"
                                        :
                                        "bg-gradient-to-tr bg-primary-700"
                            }
                            isRight={message.role === MESSAGE_ROLE_USER}
                        >
                            {message.content}
                        </ChatMessage>
                        {(!hasResetOnce && i === messages.length - 1 && message.isError) &&
                            <button className="opacity-50" onClick={resetChat} type="button">Réinitialiser</button>
                        }
                    </Fragment>
                ))}
                {isTyping ?
                    <ChatMessage className="bg-primary-700">
                        <i className="loading-dots" />
                    </ChatMessage>
                    :
                    !mode &&
                        <div className="flex mt-1 gap-2">
                            <button className="hover:bg-highlight border border-white shadow rounded-lg px-3 py-2" onClick={() => toggleContact(true)} type="button">{MODE_CONTACT}</button>
                            <button className="hover:bg-highlight border border-white shadow rounded-lg px-3 py-2" onClick={() => toggleDiscussion(true)} type="button">{MODE_DISCUSS}</button>
                        </div>
                }
            </ul>
            <div className="m-4 mt-auto">
                <fieldset className="flex">
                    <input
                        autoComplete="new-password"
                        id="message"
                        name="message"
                        onChange={handleOnInput}
                        placeholder={isLocked ? "Une erreur est survenue" : "Écrire..."}
                        type="text"
                        value={input}
                        {...stepData.inputProps}
                        className="w-full shadow px-2 rounded-lg bg-primary-700"
                        disabled={isTyping || isLocked}
                        onKeyDown={(e) => {
                            if(e.code === ENTER_KEY) {
                                e.preventDefault();
                                e.stopPropagation();

                                if(input) {
                                    validateMessage(input);
                                }
                            }
                        }}
                    />
                    <button
                        aria-label="Envoyer"
                        className="fa-solid fa-paper-plane p-2 enabled:cursor-pointer disabled:opacity-50 enabled:hover:text-highlight transition-colors"
                        disabled={!input || isLocked}
                        id="send-message-btn"
                        onClick={() => validateMessage(input)}
                        type="button"
                    />
                </fieldset>
                {mode === MODE_CONTACT &&
                    <small
                        className="border inline-block hover:bg-highlight px-2 mt-2 rounded border-white"
                        onClick={cancelContact}
                    >
                        Annuler
                    </small>
                }
            </div>
            <button
                aria-controls="contact"
                className="fa-solid text-2xl text-slate-950 dark:text-slate-200 fa-circle-xmark absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
                id="contact-close"
                type="button"
            />
        </form>
    );
}