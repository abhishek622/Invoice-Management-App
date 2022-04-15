import React, { useContext, useReducer } from "react";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import ReplayIcon from "@mui/icons-material/Replay";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PatternIcon from "@mui/icons-material/Pattern";

import { initialState, reducer } from "../../helpers/reducers/dialogsReducer";
import { TableContext } from "../../helpers/context";
import SearchBar from "../general/SearchBar";
import {
  AddCustomer,
  Analytics,
  DelCustomer,
  EditCustomer,
  AdvSearch,
} from "../dialogs";
import { StyledGrid } from "../../styles/GlobalStyle";
import { getPrediction, newPrediction } from "../../services/mlServices";
import { addAgingBucket } from "../../services/javaServices";

function ActionBar({ fetchData, prevRef }) {
  const [tblHandler, tblHandlerDispatch] = useContext(TableContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleReload = () => {
    tblHandlerDispatch({ type: "SET_PAGE", payload: 0 });
    tblHandlerDispatch({ type: "SET_SORT_MODEL", payload: [] });
    tblHandlerDispatch({ type: "SET_DOC_ID", payload: null });
    tblHandlerDispatch({ type: "SET_INVOICE_ID", payload: null });
    tblHandlerDispatch({ type: "SET_CUST_NUMBER", payload: null });
    tblHandlerDispatch({ type: "SET_BUSINESS_YEAR", payload: null });
    tblHandlerDispatch({ type: "SET_SELECTION_MODEL", payload: [] });
    prevRef.current = [];
  };

  const handlePredict = async () => {
    let data_to_add = { aging_buckets: [], doc_ids: [] };
    const filter_data = tblHandler.tableData.filter((item) =>
      tblHandler.selectionModel.includes(item.sl_no)
    );
    const doc_ids = filter_data.map((item) => parseInt(item.doc_id));
    const get_prediction = await getPrediction(doc_ids);

    if (get_prediction?.length) {
      for (let i = 0; i < get_prediction.length; i++) {
        console.log(get_prediction[i]);
        let ab =
          get_prediction[i].aging_bucket === "nan"
            ? "Before Due"
            : get_prediction[i].aging_bucket;
        data_to_add.aging_buckets.push(ab);
        data_to_add.doc_ids.push(parseInt(get_prediction[i].doc_id));
      }
    }

    const not_predicted_row = filter_data.filter(
      (row) => !data_to_add.doc_ids.includes(parseInt(row.doc_id))
    );
    if (not_predicted_row.length > 0) {
      for (let row of not_predicted_row) {
        if (row.invoice_currency === "CAD") {
          row.total_open_amount = row.total_open_amount * 0.7;
        }
        let prediction = await newPrediction(row);
        const ab =
          prediction[0].aging_bucket === "nan"
            ? "Before Due"
            : prediction[0].aging_bucket;
        data_to_add.aging_buckets.push(ab);
        data_to_add.doc_ids.push(prediction[0].doc_id);
      }
    }

    // console.log(data_to_add);
    const res = await addAgingBucket(data_to_add);
    tblHandlerDispatch({ type: "SET_ALERT", payload: true });
    tblHandlerDispatch({ type: "SET_RESPONSE", payload: res });
    fetchData({
      filed: tblHandler.sortModel?.length
        ? tblHandler.sortModel[0].field
        : null,
      sort: tblHandler.sortModel?.length ? tblHandler.sortModel[0].sort : null,
      page_size: tblHandler.pageSize,
      page: tblHandler.page,
      doc_id: tblHandler.doc_id,
      invoice_id: tblHandler.invoice_id,
      cust_number: tblHandler.cust_number,
      business_year: tblHandler.business_year,
    });
    prevRef.current = [];
  };

  const handleAnalytics = () => {
    dispatch({ type: "SET_ANALYTICS", payload: !state.analytics });
  };

  const handleSearchCustomer = () => {
    dispatch({ type: "SET_SEARCH_CUSTOMER", payload: !state.searchCustomer });
  };

  const handleAddCustomer = () => {
    dispatch({ type: "SET_ADD_CUSTOMER", payload: !state.addCustomer });
  };

  const handleEditCustomer = () => {
    dispatch({ type: "SET_EDIT_CUSTOMER", payload: !state.editCustomer });
  };

  const handleDelCustomer = () => {
    dispatch({ type: "SET_DEL_CUSTOMER", payload: !state.delCustomer });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Invoice List
      </Typography>
      <StyledGrid container spacing={2}>
        <Grid item xs={12} sm={12} md={5}>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="ADV action"
            sx={{ borderRadius: "8px" }}
          >
            <Button
              startIcon={<PatternIcon />}
              color="secondary"
              disabled={tblHandler.selectionModel.length === 0}
              onClick={handlePredict}
            >
              Predict
            </Button>
            <Button
              startIcon={<AssessmentOutlinedIcon />}
              onClick={handleAnalytics}
            >
              Analytics
            </Button>
            <Button
              startIcon={<PolicyOutlinedIcon />}
              color="secondary"
              onClick={handleSearchCustomer}
            >
              Advanced
            </Button>
            <Button
              aria-label="reload"
              variant="outlined"
              sx={{ maxWidth: "10px", borderRadius: "8px" }}
              onClick={handleReload}
            >
              <ReplayIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="CURD action"
            sx={{ borderRadius: "8px" }}
          >
            <Button
              startIcon={<AddBoxOutlinedIcon />}
              color="secondary"
              onClick={handleAddCustomer}
            >
              Add
            </Button>
            <Button
              startIcon={<EditOutlinedIcon />}
              disabled={tblHandler.selectionModel.length !== 1}
              onClick={handleEditCustomer}
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteOutlinedIcon />}
              color="secondary"
              disabled={tblHandler.selectionModel.length === 0}
              onClick={handleDelCustomer}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
      </StyledGrid>

      <Analytics open={state.analytics} onClose={handleAnalytics} />
      <AdvSearch open={state.searchCustomer} onClose={handleSearchCustomer} />
      <AddCustomer open={state.addCustomer} onClose={handleAddCustomer} />
      <EditCustomer
        open={state.editCustomer}
        onClose={handleEditCustomer}
        prevRef={prevRef}
      />
      <DelCustomer
        open={state.delCustomer}
        onClose={handleDelCustomer}
        prevRef={prevRef}
      />
    </div>
  );
}

export default ActionBar;
