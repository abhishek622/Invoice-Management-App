import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function convert_date_to_string(date) {
  let d = new Date(date);
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function SortedDescendingIcon() {
  return <KeyboardArrowDownIcon fontSize="small" color="warning" />;
}

function SortedAscendingIcon() {
  return <KeyboardArrowUpIcon fontSize="small" color="success" />;
}

export { convert_date_to_string, SortedDescendingIcon, SortedAscendingIcon };
