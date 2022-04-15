import React, { useContext, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import Transition from "../general/Transition";
import { TableContext } from "../../helpers/context";
import CustomButton from "../general/CustomButton";
import { search_initials } from "../../utils/initialStates";
import { StyledTitle } from "../../styles/GlobalStyle";
import CustomTextField from "../general/CustomTextField";

function AdvSearch(props) {
	const { open, onClose } = props;
	const [, dispatch] = useContext(TableContext);
	const [formInput, setFormInput] = useState(search_initials);

	const handleChange = (e) => {
		setFormInput({ ...formInput, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formInput.doc_id !== "" || formInput.invoice_id !== "" || formInput.cust_number !== "" || formInput.buisness_year !== "") {
			dispatch({ type: "SET_DOC_ID", payload: formInput.doc_id });
			dispatch({type: "SET_INVOICE_ID", payload: formInput.invoice_id});
			dispatch({type: "SET_CUST_NUMBER", payload: formInput.cust_number});
			dispatch({type: "SET_BUSINESS_YEAR", payload: formInput.buisness_year});
			dispatch({type: "SET_PAGE", payload: 0});

			onClose();
			setFormInput(search_initials);
		}

	};

	const handleCancel = () => {
		setFormInput(search_initials);
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			maxWidth="sm"
			TransitionComponent={Transition}
			transitionDuration={500}
		>
			<form onSubmit={handleSubmit} autoComplete="off">
				<StyledTitle>Advance Search</StyledTitle>
				<DialogContent>
					<Box
						sx={{
							"& .MuiTextField-root": { m: 1, width: "29ch" },
						}}
					>
						<CustomTextField
							name="doc_id"
							label="Document ID"
							type="number"
							value={formInput.doc_id}
							onChange={handleChange}
						/>
						<CustomTextField
							name="invoice_id"
							label="Invoice ID"
							type="number"
							value={formInput.invoice_id}
							onChange={handleChange}
						/>
						<CustomTextField
							name="cust_number"
							label="Customer Number"
							type="number"
							value={formInput.cust_number}
							onChange={handleChange}
						/>
						<CustomTextField
							name="buisness_year"
							label="Business Year"
							type="number"
							value={formInput.buisness_year}
							onChange={handleChange}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<CustomButton text="search" type="submit" />
					<CustomButton text="cancel" type="reset" onClick={handleCancel} />
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default AdvSearch;
