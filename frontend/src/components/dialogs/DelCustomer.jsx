import React, { useContext } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import del3 from "../../assets/del3.png";
import Transition from "../general/Transition";
import { delData } from "../../services/javaServices";
import { TableContext } from "../../helpers/context";
import CustomButton from "../general/CustomButton";
import { StyledTitle } from "../../styles/GlobalStyle";

function DelCustomer(props) {
	const { open, onClose, prevRef } = props;
	const [state, dispatch] = useContext(TableContext);

	const del_row = async (data) => {
		const res = await delData(data);
		dispatch({ type: "SET_PAGE", payload: 0 });
		dispatch({ type: "SET_SORT_MODEL", payload: [] });
		dispatch({ type: "SET_ALERT", payload: true });
		dispatch({ type: "SET_RESPONSE", payload: res });
		prevRef.current = [];
	};

	const handleDelete = () => {
		del_row(state.selectionModel.join(",")).then(() => {
			onClose();
		});
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			TransitionComponent={Transition}
			transitionDuration={500}
			sx={{
				"& .MuiDialogTitle-root": { paddingBottom: "2px" },
				"& .MuiDialogContent-root": { paddingBottom: 0, paddingTop: 0 },
			}}
		>
			<StyledTitle align="center">Delete Records</StyledTitle>
			<DialogContent>
				<div style={{ textAlign: "center" }}>
					<img
						src={del3}
						alt="delete"
						style={{ height: "4rem", width: "4rem" }}
					/>
				</div>
				<DialogContentText color="default">
					Are you sure you want to delete this record[s] ?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<CustomButton text="delete" onClick={handleDelete} />
				<CustomButton text="cancel" onClick={onClose} />
			</DialogActions>
		</Dialog>
	);
}

export default DelCustomer;
