import React, { useContext, useEffect, useState } from "react";
import CustomTextField from "../general/CustomTextField";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import Transition from "../general/Transition";
import { editData } from "../../services/javaServices";
import { TableContext } from "../../helpers/context";
import CustomButton from "../general/CustomButton";
import { StyledTitle } from "../../styles/GlobalStyle";

const defaultValues = {
	sl_no: "",
	invoice_currency: "",
	cust_payment_terms: "",
	total_open_amount: "",
};

function EditCustomer(props) {
	const { open, onClose, prevRef } = props;
	const [state, dispatch] = useContext(TableContext);
	const [newData, setNewData] = useState(defaultValues);
	const [formInput, setFormInput] = useState(defaultValues);

	useEffect(() => {
		const data = state.tableData.filter((item) => state.selectionModel.includes(item.sl_no));
		if (data?.length) {
			const { sl_no, invoice_currency, cust_payment_terms, total_open_amount } = data[0];
			setNewData({ sl_no, invoice_currency, cust_payment_terms, total_open_amount });
			setFormInput({ sl_no, invoice_currency, cust_payment_terms, total_open_amount });
		}
	}, [state.selectionModel, state.tableData]);

	const handleChange = (e) => {
		setFormInput({
			...formInput,
			[e.target.name]: e.target.value.toUpperCase(),
		});
	};

	const edit_customer = async (data) => {
		const res = await editData(data);
		dispatch({ type: "SET_SORT_MODEL", payload: [] });
		dispatch({ type: "SET_PAGE", payload: 0 });
		dispatch({ type: "SET_ALERT", payload: true });
		dispatch({ type: "SET_RESPONSE", payload: res });
		prevRef.current = [];
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (JSON.stringify(newData) !== JSON.stringify(formInput)) {
			if (newData.invoice_currency !== formInput.invoice_currency) {
				if (formInput.invoice_currency === "USD") {
					formInput.total_open_amount = formInput.total_open_amount * 0.7;
				} else {
					formInput.total_open_amount = formInput.total_open_amount / 0.7;
				}
			}
			edit_customer(formInput);
			onClose();
			setFormInput(defaultValues);
		}
	};

	const handleCancel = () => {
		setFormInput(defaultValues);
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
				<StyledTitle>Edit</StyledTitle>
				<DialogContent>
					<Box sx={{ "& .MuiTextField-root": { m: 1, width: "16rem" } }}>
						<CustomTextField
							required
							name="invoice_currency"
							label="Invoice Currency"
							value={formInput.invoice_currency}
							onChange={handleChange}
						/>
						<CustomTextField
							required
							name="cust_payment_terms"
							label="Payment Terms"
							value={formInput.cust_payment_terms}
							onChange={handleChange}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<CustomButton text="edit" type="submit" />
					<CustomButton text="cancel" onClick={handleCancel} />
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default EditCustomer;
