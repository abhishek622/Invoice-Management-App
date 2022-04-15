import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { analytics } from "../../services/javaServices";
import Transition from "../general/Transition";
import Plot from "../dialogs/Plot";
import CustomButton from "../general/CustomButton";
import { analytics_initials } from "../../utils/initialStates";
import { StyledTitle } from "../../styles/GlobalStyle";
import CustomTextField from "../general/CustomTextField";

function Analytics(props) {
  const { open, onClose } = props;
  const [graphData, setGraphData] = useState(null);
  const [openPlot, setOpenPlot] = useState(false);
  const [formInput, setFormInput] = useState(analytics_initials);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (formInput.start_clear_date !== "" && formInput.end_clear_date !== "") ||
      (formInput.start_due_date !== "" && formInput.end_due_date !== "") ||
      (formInput.start_baseline_create_date !== "" &&
        formInput.end_baseline_create_date !== "") ||
      formInput.invoice_currency !== ""
    ) {
      const response = await analytics(formInput);
      setGraphData(response);
      setOpenPlot(true);
    }
  };

  const handleClose = () => {
    setFormInput(analytics_initials);
    setOpenPlot(false);
    onClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        TransitionComponent={Transition}
        transitionDuration={500}
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <StyledTitle>Analytics View</StyledTitle>
          <DialogContent
            sx={{
              "& .MuiFormControl-root": {
                m: ".5rem",
                width: "15.5rem",
              },
            }}
          >
            <FormControl>
              <FormLabel id="invoice_currency">Clear Date</FormLabel>
              <CustomTextField
                name="start_clear_date"
                type="date"
                value={formInput.start_clear_date}
                onChange={handleChange}
                required={
                  formInput.start_clear_date !== "" ||
                  formInput.end_clear_date !== ""
                }
              />
              <CustomTextField
                name="end_clear_date"
                type="date"
                value={formInput.end_clear_date}
                onChange={handleChange}
                required={
                  formInput.end_clear_date !== "" ||
                  formInput.start_clear_date !== ""
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel id="invoice_currency">Due Date</FormLabel>
              <CustomTextField
                name="start_due_date"
                type="date"
                value={formInput.start_due_date}
                onChange={handleChange}
                required={
                  formInput.start_due_date !== "" ||
                  formInput.end_due_date !== ""
                }
              />
              <CustomTextField
                name="end_due_date"
                type="date"
                value={formInput.end_due_date}
                onChange={handleChange}
                required={
                  formInput.end_due_date !== "" ||
                  formInput.start_due_date !== ""
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel id="invoice_currency">Baseline Create Date</FormLabel>
              <CustomTextField
                name="start_baseline_create_date"
                type="date"
                value={formInput.start_baseline_create_date}
                onChange={handleChange}
                required={
                  formInput.start_baseline_create_date !== "" ||
                  formInput.end_baseline_create_date !== ""
                }
              />
              <CustomTextField
                name="end_baseline_create_date"
                type="date"
                value={formInput.end_baseline_create_date}
                onChange={handleChange}
                required={
                  formInput.end_baseline_create_date !== "" ||
                  formInput.start_baseline_create_date !== ""
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel id="invoice_currency">Invoice Currency</FormLabel>
              <CustomTextField
                name="invoice_currency"
                value={formInput.invoice_currency}
                onChange={handleChange}
                placeholder="USD"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <CustomButton text="view" type="submit" />
            <CustomButton text="cancel" onClick={handleClose} />
          </DialogActions>
        </form>
      </Dialog>
      {graphData ? (
        <Plot open={openPlot} onClose={handleClose} graphData={graphData} />
      ) : null}
    </Fragment>
  );
}

export default Analytics;
