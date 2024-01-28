import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useMountState from "../../../hooks/useMountState";

export default function SkeletonImg({ imgProps = {} }) {
	const [ loadedImg, setLoadedImg ] = useMountState(null);
	const { src, ...imageProps } = imgProps;

	useEffect(() => {
		const newImg = new Image();

		newImg.onload = function() {
			setLoadedImg(this.src);
		};

		newImg.src = src;
	}, []);

	return (
		loadedImg ?
			<img {...imageProps} src={loadedImg} />
			:
			<span style={{ backgroundColor: "red" }} />
	);
}

SkeletonImg.propTypes = {
	imgProps: PropTypes.object
};