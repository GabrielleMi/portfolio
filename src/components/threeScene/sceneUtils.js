export const HEXA_WHITE = 0xffffff;

export function isWebGLSupported() {
	try {
		return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
	} catch (e) {
		return false;
	}
}