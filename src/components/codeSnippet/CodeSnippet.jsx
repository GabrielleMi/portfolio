// eslint-disable-next-line no-unused-vars
import Highlight, { defaultProps } from "prism-react-renderer";
import CodeLine from "./codeLine/CodeLine";
import React from "react";
import dracula from 'prism-react-renderer/themes/vsDark';
import styles from "./CodeSnippet.module.scss";

export default function codeSnippet({ code, language }) {
	return (
		<Highlight
			{...defaultProps}
			code={code.trim()}
			language={language}
			theme={dracula}
		>
			{(codeProps) => (
				<pre className={`${codeProps.className} ${styles.container}`} style={{ color: codeProps.style?.color }}>
					<code className={styles.containerInner}>
						{codeProps.tokens.map((line, i) => (
							<CodeLine
								{...codeProps.getLineProps({ line })}
								data={line} getTokenProps={codeProps.getTokenProps}
								key={i}
								maxLines={codeProps.tokens.length}
								nb={i + 1}
							/>
						))}
					</code>
				</pre>
			)}
		</Highlight>
	);
}