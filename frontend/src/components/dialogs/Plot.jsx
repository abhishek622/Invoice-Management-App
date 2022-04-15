import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import CloseIcon from "@mui/icons-material/Close";
import Transition from "../general/Transition";
import { ChartAction, ChartDiv, ChartNoData } from "../../styles/ChartStyle";

function Plot(props) {
  const { open, onClose, graphData } = props;

  return (
    <Dialog maxWidth="lg" open={open} TransitionComponent={Transition}>
      <DialogContent>
        <ChartAction color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </ChartAction>
        {graphData.total_open_amount.length > 0 ? (
          <ChartDiv>
            <BarChart
              labels={graphData.labels}
              total_open_amount={graphData.total_open_amount}
              no_of_customers={graphData.no_of_customers}
            />

            {graphData.invoice_currency[0] === 0 ||
            graphData.invoice_currency[1] === 0 ? null : (
              <PieChart invoice_currency={graphData.invoice_currency} />
            )}
          </ChartDiv>
        ) : (
          <ChartNoData>No data to display</ChartNoData>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Plot;
