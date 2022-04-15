import { Zoom } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
	return <Zoom ref={ref} {...props} />;
});

export default Transition;
