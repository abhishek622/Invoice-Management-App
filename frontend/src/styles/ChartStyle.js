import {DialogContentText, IconButton, styled} from "@mui/material";

const ChartDiv = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
    },
}));

const ChartAction = styled(IconButton)(() => ({
    position: "absolute",
    top: 0,
    right: 0,
    paddingRight: 10,
    paddingTop: 10,
}));

const ChartNoData = styled(DialogContentText)(() => ({
    height: 240,
    width: 360,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

export {ChartDiv, ChartAction, ChartNoData};