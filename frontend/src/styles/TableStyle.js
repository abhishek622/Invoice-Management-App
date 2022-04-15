import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Container = styled("div")(({ theme }) => ({
	padding: "0rem 3.1rem",
	[theme.breakpoints.down("md")]: {
		padding: "0rem 1rem",
	},
}));

const StyledDataGrid = styled(DataGrid)(() => ({
	border: 0,
	WebkitFontSmoothing: "auto",
	letterSpacing: ".1rem",
	"& .MuiDataGrid-columnsContainer": {
		backgroundColor: "#1d1d1d",
	},
	"& .MuiDataGrid-iconSeparator": {
		display: "none",
	},
	"& .MuiDataGrid-columnHeaderTitle": {
		textOverflow: "clip",
		whiteSpace: "break-spaces",
		lineHeight: 1.5,
		letterSpacing: "0.04rem",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: "0.8rem",
	},
	"& .MuiDataGrid-cell:hover": {
		color: "#51cfc6",
	},
	"& .MuiDataGrid-columnHeader": {
		height: "2rem",
	},
	"& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
		borderRight: "1px solid rgba(255,255,255,0.1)",
	},
	"& .MuiDataGrid-cell": {
		borderBottom: "1px solid rgba(255,255,255,0.1)",
	},
	"& .MuiDataGrid-row": {
		backgroundColor: "#283d4a",
	},
	"& .MuiDataGrid-footerContainer": {
		paddingTop: 0,
	},
	"& .MuiDataGrid-virtualScroller": {
		"::-webkit-scrollbar": {
			width: "0.5rem",
			height: "0.5rem",
		},

		"::-webkit-scrollbar-track": {
			boxShadow: "inset 0 0 5px rgb(27,43,51)",
		},

		/* Handle */
		"::-webkit-scrollbar-thumb": {
			background: "rgba(255,255,255,0.5)",
		},

		/* Handle on hover */
		"::-webkit-scrollbar-thumb:hover": {
			background: "rgba(255,255,255,0.7)",
			cursor: "pointer",
		},
	},
	"& .aging-bucket-before-due": {
		backgroundColor: "rgba(48,247,14,0.3)",
		color: "#ffffff",
		fontSize: "0.8rem",
	},
	"& .others": {
		backgroundColor: "rgba(22,130,252,0.3)",
		color: "#ffffff",
		fontSize: "0.8rem",
	},
	"& .aging-bucket-greater-than-60": {
		backgroundColor: "rgba(166,30,30,0.56)",
		color: "#ffffff",
		fontSize: "0.8rem",
	},
}));

const StyledGridOverlay = styled("div")(() => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	"& .ant-empty-img-1": {
		fill: "#262626",
	},
	"& .ant-empty-img-2": {
		fill: "#b0bcbf",
	},
	"& .ant-empty-img-3": {
		fill: "#434343",
	},
	"& .ant-empty-img-4": {
		fill: "#283d4a",
	},
	"& .ant-empty-img-5": {
		fillOpacity: "0.08",
		fill: "#fff",
	},
}));

export { Container, StyledDataGrid, StyledGridOverlay };
