import LineNb from "./lineNb/LineNb";
import PropTypes from "prop-types";
import React from "react";

export default function CodeLine({
	nb, maxLines, data, getTokenProps, ...props
}) {
	return (
		<div {...props}>
			<LineNb maxLines={maxLines}>{nb}</LineNb>
			{data.map((token, key) => (
				<span key={key} {...getTokenProps({ token })} />
			))}
		</div>
	);
}

CodeLine.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
	getTokenProps: PropTypes.func.isRequired,
	maxLines: PropTypes.number,
	nb: PropTypes.number.isRequired
};