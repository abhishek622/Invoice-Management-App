import React, { useContext, useState } from "react";
import Transition from "../general/Transition";
import { TableContext } from "../../helpers/context";
import { addData } from "../../services/javaServices";
import { Dialog, DialogActions } from "@mui/material";
import CustomTextField from "../general/CustomTextField";
import { AddBox, StyledTitle } from "../../styles/GlobalStyle";
import CustomButton from "../general/CustomButton";
import { add_customer_initials } from "../../utils/initialStates";

function AddCustomer(props) {
  const { open, onClose } = props;
  const [, dispatch] = useContext(TableContext);
  const [formInput, setFormInput] = useState(add_customer_initials);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addData(formInput);
    dispatch({ type: "SET_RESPONSE", payload: res });
    dispatch({ type: "SET_PAGE", payload: 0 });
    dispatch({ type: "SET_SORT_MODEL", payload: [] });
    dispatch({ type: "SET_ALERT", payload: true });
    onClose();
    setFormInput(add_customer_initials);
  };

  const handleCancel = () => {
    setFormInput(add_customer_initials);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="md"
      TransitionComponent={Transition}
      transitionDuration={500}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <StyledTitle>Add</StyledTitle>
        <AddBox>
          <CustomTextField
            required
            name="business_code"
            label="Business Code"
            value={formInput.business_code}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="cust_number"
            label="Customer Number"
            type="number"
            value={formInput.cust_number}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="clear_date"
            label="Clear Date"
            type="date"
            value={formInput.clear_date}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="buisness_year"
            label="Business Year"
            type="number"
            value={formInput.buisness_year}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="doc_id"
            label="Document ID"
            type="number"
            value={formInput.doc_id}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="posting_date"
            label="Posting Date"
            type="date"
            value={formInput.posting_date}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="document_create_date"
            label="Document Create Date"
            type="date"
            value={formInput.document_create_date}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="due_in_date"
            label="Due Date"
            type="date"
            value={formInput.due_in_date}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="invoice_currency"
            label="Invoice Currency"
            value={formInput.invoice_currency}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="document_type"
            label="Document Type"
            value={formInput.document_type}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="posting_id"
            label="Posting ID"
            type="number"
            value={formInput.posting_id}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="total_open_amount"
            label="Total Open Amount"
            type="number"
            value={formInput.total_open_amount}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="baseline_create_date"
            label="Baseline Create Date"
            type="date"
            value={formInput.baseline_create_date}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="cust_payment_terms"
            label="Customer Payment Terms"
            value={formInput.cust_payment_terms}
            onChange={handleChange}
          />
          <CustomTextField
            required
            name="invoice_id"
            label="Invoice ID"
            type="number"
            value={formInput.invoice_id}
            onChange={handleChange}
          />
        </AddBox>
        <DialogActions>
          <CustomButton text="add" type="submit" />
          <CustomButton text="cancel" onClick={handleCancel} />
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddCustomer;
