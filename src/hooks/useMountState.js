import useIsMounted from "./useIsMounted";
import { useState } from "react";

export default function useMountState(init) {
	const isMounted = useIsMounted();
	const [ state, setState ] = useState(init);

	return [
		state,
		(newVal) => {
			if(isMounted) {
				setState(newVal);
			}
		}
	];
}