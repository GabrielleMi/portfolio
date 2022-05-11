import 'highlight.js/styles/github.css';
// eslint-disable-next-line no-unused-vars
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';
import styles from "./CodeSnippet.module.scss";

export default function codeSnippet({ code, language }) {
	return (
		<SyntaxHighlighter className={styles.container} language={language} showLineNumbers style={style}>
			{code}
		</SyntaxHighlighter>
	);
}